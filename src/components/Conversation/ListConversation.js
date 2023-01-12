/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useContext } from 'react'

import AuthService from '../../services/auth.service';
import Conversation from './Conversation';
import ConversationReply from './ConversationReply';
import SendMessage from './SendMessage';
import { getImageUrlFromFirebase } from '../../utils/firebasePort';
import ConversationService from '../../services/conver.service';
import ConversationDetail from './ConversationDetail';
import { SocketContext } from '../../utils/SocketContext';
import "./Conversation.css";

function ListConversation() {
	const socket = useContext(SocketContext);
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
	const [otherMembers, setOtherMembers] = useState([]);
	
    const increaseRenderValue = ()=> {
      	setRenderValue(c => c + 1)
    }

    useEffect(() => {
      	getAllConversation();
		socket.on("getUsers", users => {
			setOnlineUsers(users);
		})

  	}, [chatOn])

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
		
		setConvRoom("Room " + conversation.id)
		joinConvRoom("Room " + conversation.id);
		getOtherMembers(conversation.id, user.id);

        var elements = chatItemRef.current;
        elements.forEach(element =>{
            if (element.classList.contains("active_chat") || element.classList.contains === ""){
                element.classList.remove("active_chat");
            }
        })
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

	const getOtherMembers = async (convID, userID) =>{
        await ConversationService.readOtherMembers(convID, userID)
			.then(res => {
				let userData = res.data;
				setOtherMembers(userData);

				if (userData.length === 1) {
					setFirstName(userData[0].profile.firstName);
					setLastName(userData[0].profile.lastName);
					setAvatar(userData[0].profile.avatar);
					setOtherUserProfID(userData[0].profile.userProfileID);
					setOtherUserID(userData[0].id);
				}

			});
    }

  	return (
		<section>
		<div className="gap gray-bg">
		
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
											otherMembers={otherMembers}
											onSetOtherMembers={setOtherMembers}
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
									otherMembers={otherMembers}
								/>
							}
						</div>
						<div className="type_msg">
							{
								chatOn && currConver && 
								<SendMessage 
								chatOn = {chatOn}
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
		</section>

  	);
}

export default ListConversation;