import React ,{ useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';
import ConversationService from '../../services/conver.service';

function SendMessage({chatOn,socket, increaseRenderValue, currentConversation, room}) {

	const user = AuthService.getCurrentUser();

	const [messageInput,setMessageInput] = useState("");

	const sendMessage = (event) => {
		
		if (event.key === 'Enter') {
			event.preventDefault();
			if(!messageInput){
				alert("please fill in field!!")
			} else {
				var reply = messageInput;
				var conversation = currentConversation;

				var status = 0
				
			
				
				
				var ConversationReply = {reply, status, user, conversation}

				UserService.getByUserID(user.id)
					.then(res => {
						socket.emit("sendMessage",{
							sender: res.data,
							text: messageInput,
							room: room
						})
					});
				ConversationService.createConversationReply(ConversationReply)
					.then(res => {
						increaseRenderValue();
					})
					.catch((err)=>{
						console.log(err)
					});
				ConversationService.readOthersUserID(currentConversation.id, user.id)
					.then(res => {

						/* socket.emit("sendMessNotification",{		
							otherUserList:res.data
						}); */

					});
		
				ConversationService.getOtherMemIDs(currentConversation.id, user.id)
					.then(result => {
						socket.emit("sendMessNotification",{		
							otherUserList:result.data
						})
					});
				
				setMessageInput('');
			}
		}
	}

	return (
		<div className="input_msg_write">
			<TextareaAutosize

				className="write_msg" 
				placeholder="Type a message" 
				autoFocus
				id="TextAreaResizeable"
				name="inputComment" 
				value = {messageInput}
				onChange= {(e)=> setMessageInput(e.target.value)}  
				onKeyDown = {(e) => sendMessage(e)} 
			/>
		
		</div>
	);
}

export default SendMessage
