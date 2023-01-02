<<<<<<< HEAD
import React ,{useState ,useEffect,useRef} from 'react'
import conversationService from '../../services/conversationService'
import AuthService from '../../services/auth.service'
import Conversation from './Conversation'
import ConversationReply from './ConversationReply'
import SendMessage from './SendMessage'
import ProfileService from '../../services/ProfileService';
import FirebaseSerive from '../../services/firebaseService';
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";


function ListConversation() {
    const { socket } = useSelector(state => state.socket);
    
    const user = AuthService.getCurrentUser();


    const [listConversations,setListConversations] = useState([]);
    const chatItemRef = useRef([]);
    const [renderValue,setRenderValue] = useState(0);
    
    const [chatOn,setChatOn] = useState(false)
    
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [avatar,setAvatar] = useState(null)
    const [userName,setUserName] = useState("")
    const [otherUserID,setOtherUserID] = useState(0)

    const currentConversation = useRef();

    const [onlineUsers, setOnlineUsers] = useState([]);

    const increaseRenderValue = ()=>{
      setRenderValue(c=>c+1)
    }

    useEffect(() =>{
      getAllConversation();   

  },[])


  

    const getAllConversation = async () =>{
        conversationService.getAllConversation(user.id).then(res=>{
            setListConversations(res.data);
        })
    }

    
    const getCurrentUserChattingInfo = async (currentChattingUserID) =>{

      ProfileService.getProfile(currentChattingUserID).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        FirebaseSerive.getAvatarFromFirebase(response.data.avatar).then((response) => {
            setAvatar(response)
        })
        setUserName(response.data.user.username);
        setOtherUserID(response.data.user.id)
    })
    }

    const updateStatusMessage = async (conversationID,senderID) =>{
      conversationService.updateStatus(conversationID,senderID);
    }

  

    useEffect(() =>{
     
        socket.emit("addUser",user.id);
        socket.on("getUsers",users=>{
  
          setOnlineUsers(users);
        })
      
    
    },[])

    const handleClick = (index,conversation)=>{

        var elements = chatItemRef.current;

     
=======
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react'
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

import AuthService from '../../services/auth.service';
import Conversation from './Conversation';
import ConversationReply from './ConversationReply';
import SendMessage from './SendMessage';
import { getImageUrlFromFirebase } from '../../utils/firebasePort';
import ConversationService from '../../services/conver.service';
import ConversationDetail from './ConversationDetail';
import "./Conversation.css";

function ListConversation() {
	const { socket } = useSelector(state => state.socket);
    const user = AuthService.getCurrentUser();

    const chatItemRef = useRef([]);

    const [listConversations, setListConversations] = useState([]);
    const [renderValue, setRenderValue] = useState(0);
    
    const [chatOn, setChatOn] = useState(false);
    const [currConver, setCurrConver] = useState();
    const [onlineUsers, setOnlineUsers] = useState([]);
	const [convRoom, setConvRoom] = useState(0);

	const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [otherUserID, setOtherUserID] = useState(0);
    const [otherUserProfID, setOtherUserProfID] = useState(0);
	const [otherMemProfiles, setOtherMemProfiles] = useState([]);

    const increaseRenderValue = ()=> {
      	setRenderValue(c => c + 1)
    }

    useEffect(() => {
      	getAllConversation();

		socket.emit("addUser", user.id);
		socket.on("getUsers", users => {
			setOnlineUsers(users);
		})

		return () => {
			socket.close();
		}

  	}, [chatOn])

	const getOtherMembers = async (convID, userID) =>{
		await ConversationService.readMemberProfiles(convID, userID)
			.then(res => {
				let profileData = res.data;
				setOtherMemProfiles(profileData);
				if (profileData.length === 1) {
					setFirstName(profileData[0]["firstName"]);
					setLastName(profileData[0]["lastName"]);
					getImageUrlFromFirebase("avatarImages", profileData[0]["avatar"])
						.then(url => {
							setAvatar(url);
						});
					setOtherUserProfID(profileData[0]["userProfileID"]);
					setOtherUserID(profileData[0]["user"]["id"]);
				}
			})
			.catch(err => {
				console.log(err);
			});
    }

    const getAllConversation = async () =>{
        await ConversationService.getAllConversation(user.id)
			.then(res=>{
				setListConversations(res.data);
			});
    }

    const updateStatusMessage = async (conversationID, senderID) =>{
		await ConversationService.updateStatus(conversationID, senderID);
    }

    const handleClick = (index, conversation)=>{
		
		setConvRoom(conversation.name)
		joinConvRoom(conversation.name);
		getOtherMembers(conversation.id, user.id);

        var elements = chatItemRef.current;
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
        elements.forEach(element =>{
            if (element.classList.contains("active_chat") || element.classList.contains === ""){
                element.classList.remove("active_chat");
            }
        })
<<<<<<< HEAD
        
        chatItemRef.current[index].classList.add("active_chat");

        currentConversation.current = conversation;


        user.id === conversation.userOne.id
        ?getCurrentUserChattingInfo(conversation.userTwo.id)
        :getCurrentUserChattingInfo(conversation.userOne.id)

        
        toggleChat()

       
        //update status messenge
        user.id === conversation.userOne.id 
        ? updateStatusMessage(conversation.id,conversation.userTwo.id)
        : updateStatusMessage(conversation.id,conversation.userOne.id)


    }
    
    const toggleChat= () =>{
      
      setChatOn(prev => !prev);

    }
  return (
    <div className="">
        <div className="messaging">
        <div className="inbox_msg">
        <div className="inbox_people">
          <div className="headind_srch">
            <div className="recent_heading">
              <h4>Recent</h4>
            </div>
            <div className="srch_bar">
              <div className="stylish-input-group">
                <input type="text" className="search-bar"  placeholder="Search" />
                <span className="input-group-addon">
                <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                </span> </div>
            </div>
          </div>
          <div className="inbox_chat">  

            {!chatOn ?
            listConversations && listConversations.map(
                 (conversation,index)  =>
                    <div key={conversation.id} >
                                <div className="chat_list" ref={el => chatItemRef.current[index] = el} onClick={() => handleClick(index,conversation)}>

                            {
                                    user.id === conversation.userOne.id 
                                    ?<Conversation onlineUsers={onlineUsers} increaseRenderValue={increaseRenderValue} renderValue={renderValue} conversation={conversation} sender={conversation.userTwo}/>
                                    :<Conversation onlineUsers={onlineUsers} increaseRenderValue={increaseRenderValue}  renderValue={renderValue} conversation={conversation} sender={conversation.userOne}/>
                
                                }
                                                </div>

                    </div>
                
            )
            :
            <div>


        <div className="card">
          <div className="card-body">
          <button type="button" className="btn btn-primary btn-rounded btn-lg" onClick={()=> toggleChat()}>
          <i className="fa fa-arrow-left"></i>
            </button>
            <div className="mt-3 text-center">
              <Link to={"/profile/" + user.id}>
              <img src={avatar}
                className="current-chat-avatar rounded-circle img-fluid" alt="avatar" />
                </Link>
            </div>
            <div className="text-center">
            <h4 className="mb-2">{firstName} {lastName}</h4>
            <p className="text-muted">@{userName}</p>
            { onlineUsers && onlineUsers.map(
                (u) =>
            
            u.userID===otherUserID?
            <div key={u.userID}>
                  <p  className="text-success">Người dùng đang hoạt động
            <i className="ml-2 fa fa-globe text-success"></i>
            </p>
            </div>
        
            :<div  key={u.userID}></div>
            )}
            </div>
           
          
       
          </div>
      
    </div>
            </div>
            }
            </div>

       
         
            </div>
            <div className="mesgs">
                 <div className="msg_history">
                    {chatOn && <ConversationReply socket ={socket} increaseRenderValue={increaseRenderValue} renderValue={renderValue} currentConversation={currentConversation.current}/>}

                 </div>
                 <div className="type_msg">
                    {chatOn && <SendMessage socket ={socket} increaseRenderValue={increaseRenderValue} currentConversation={currentConversation.current}/>}
                 </div>
               </div>
            </div>
            </div>

          </div>
     
  )
=======
        chatItemRef.current[index].classList.add("active_chat");

        setCurrConver(conversation);

		updateStatusMessage(conversation.id, user.id);
		
        toggleChat();

    }

    const toggleChat = () =>{
      	setChatOn(prev => !prev);
    }

	const joinConvRoom = (convRoom) =>{
		if (convRoom !== 0) {
			socket.emit("joinConvRoom", convRoom);
		}
	}

	

  	return (
		<div className="">
			<div className="messaging">
				<div className="inbox_msg">
					<div className="inbox_people">
						<div className="headind_srch">
							<div className="recent_heading"> <h4>Recent</h4> </div>
							<div className="srch_bar">
								<div className="stylish-input-group">
									<input type="text" className="search-bar"  placeholder="Search" />
									<span className="input-group-addon">
										<button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
									</span> 
								</div>
							</div>
						</div>
						<div className="inbox_chat">  
							{
								!chatOn ?
									listConversations && listConversations.map(
										(conversation,index)  =>
											<div key={conversation.id} >
												<div 
													className="chat_list" 
													ref={el => chatItemRef.current[index] = el} 
													onClick={() => handleClick(index, conversation)}
												>
													<Conversation 
														onlineUsers={onlineUsers} 
														increaseRenderValue={increaseRenderValue} 
														renderValue={renderValue} 
														conversation={conversation} 
														sender={user}
													/>
												</div>
											</div>
										)
									:	<ConversationDetail 
											conver={ currConver }
											toggleChat={ toggleChat }
											onlineUsers={ onlineUsers } 
											otherUser={{
												firstName,
												lastName,
												avatar,
												otherUserID,
												otherUserProfID
											}}
											otherProfiles={otherMemProfiles}
											onSetOtherMemProfiles={setOtherMemProfiles}
										/>
								}
						</div>
					</div>
					<div className="mesgs">
						<div className="msg_history">
							{
								chatOn && currConver && 
								<ConversationReply 
									socket ={socket} 
									increaseRenderValue={increaseRenderValue} 
									renderValue={renderValue} 
									currentConversation={currConver}
									otherProfiles={otherMemProfiles}
								/>
							}
						</div>
						<div className="type_msg">
							{
								chatOn && currConver && 
								<SendMessage 
									socket ={socket} 
									increaseRenderValue={increaseRenderValue} 
									currentConversation={currConver}
									room = { convRoom }
								/>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
  	);
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
}

export default ListConversation;