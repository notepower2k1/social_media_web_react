import React ,{useState ,useEffect,useRef} from 'react'
import AuthService from '../../services/auth.service'
import Conversation from './Conversation'
import ConversationReply from './ConversationReply'
import SendMessage from './SendMessage'
import ProfileService from '../../services/ProfileService';
import {Link} from "react-router-dom";
import {io} from "socket.io-client";
import { getImageUrlFromFirebase } from '../../utils/firebasePort'
import ConversationService from '../../services/conver.service'


function ListConversation() {
    

    const user = AuthService.getCurrentUser();

    const socket = useRef();

    const [listConversations,setListConversations] = useState([]);
    const chatItemRef = useRef([]);
    const [renderValue,setRenderValue] = useState(0);
    
    const [chatOn,setChatOn] = useState(false)
    
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [avatar,setAvatar] = useState(null)
    const [userName,setUserName] = useState("")
    const [otherUserID,setOtherUserID] = useState(0)
    const [currConver,setCurrConver] = useState()

    const currentConversation = useRef();

    const [onlineUsers, setOnlineUsers] = useState([]);

    const increaseRenderValue = ()=>{
      setRenderValue(c=>c+1)
    }

    useEffect(() =>{
      getAllConversation();   

  },[])


  

    const getAllConversation = async () =>{
        ConversationService.getAllConversation(user.id).then(res=>{
            setListConversations(res.data);
        })
    }

    
    const getCurrentUserChattingInfo = async (currentChattingUserID) =>{

      ProfileService.getProfile(currentChattingUserID).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        getImageUrlFromFirebase("avatarImages", response.data.avatar).then((response) => {
            setAvatar(response)
        })
        setUserName(response.data.user.username);
        setOtherUserID(response.data.user.id)
    })
    }

    const updateStatusMessage = async (conversationID,senderID) =>{
      ConversationService.updateStatus(conversationID,senderID);
    }

    useEffect(() => {
      
        socket.current =io.connect("ws://localhost:8900");
      
       return () => {
        socket.current.close();
      }
  
    },[]);

    useEffect(() =>{
     
        socket.current.emit("addUser",user.id);
        socket.current.on("getUsers",users=>{
  
          setOnlineUsers(users);
        })
      
    
    },[])

    const handleClick = (index,conversation)=>{
        console.log(conversation);
        var elements = chatItemRef.current;

     
        elements.forEach(element =>{
            if (element.classList.contains("active_chat") || element.classList.contains === ""){
                element.classList.remove("active_chat");
            }
        })
        
        chatItemRef.current[index].classList.add("active_chat");

        setCurrConver(conversation);

        user.id === conversation.userOne.id
          ? getCurrentUserChattingInfo(conversation.userTwo.id)
          : getCurrentUserChattingInfo(conversation.userOne.id)

        
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
                        <div className="chat_list" ref={el => chatItemRef.current[index] = el} 
                        onClick={() => handleClick(index,conversation)}>

                    {
                            user.id === conversation.userOne.id 
                            ?<Conversation 
                              onlineUsers={onlineUsers} 
                              increaseRenderValue={increaseRenderValue} 
                              renderValue={renderValue} 
                              conversation={conversation} 
                              sender={conversation.userTwo}/>
                            :<Conversation 
                              onlineUsers={onlineUsers} 
                              increaseRenderValue={increaseRenderValue}  
                              renderValue={renderValue} 
                              conversation={conversation} 
                              sender={conversation.userOne}
                            />
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
            <p className="text-success">Người dùng đang hoạt động
            <i className="ml-2 fa fa-globe text-success"></i>
            </p>
            :<div></div>
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
                    {chatOn && currConver && <ConversationReply 
                      socket ={socket} 
                      increaseRenderValue={increaseRenderValue} 
                      renderValue={renderValue} 
                      currentConversation={currConver}
                    />}

                 </div>
                 <div className="type_msg">
                    {chatOn && currConver && <SendMessage 
                      socket ={socket} 
                      increaseRenderValue={increaseRenderValue} 
                      currentConversation={currConver}
                    />}
                 </div>
               </div>
            </div>
            </div>

          </div>
     
  )
}

export default ListConversation;