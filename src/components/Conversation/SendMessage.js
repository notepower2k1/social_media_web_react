import React ,{useState ,useEffect,useRef} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import AuthService from '../../services/auth.service';
import conversationService from '../../services/conversationService';


function SendMessage({socket,increaseRenderValue,currentConversation}) {

  const user = AuthService.getCurrentUser();

  const [messageInput,setMessageInput] = useState("");



  const sendMessage = () => {
    
    var reply = messageInput;

    
    var conversationReplyTime = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString();

    var conversation = currentConversation;

    const status = 0

    var ConversationReply = {reply,conversationReplyTime,status,user,conversation}

    
    conversationService.createConversationReply(ConversationReply).then(res => {
        increaseRenderValue();
    }).catch((err)=>{
        console.log(err)
    });
    

    if (currentConversation.userOne.id === user.id){
      socket.current.emit("sendMessage",{
        senderID:user.id,
        receiverID:currentConversation.userTwo.id,
        text:messageInput
      })

    }
    else{
      socket.current.emit("sendMessage",{
        senderID:user.id,
        receiverID:currentConversation.userOne.id,
        text:messageInput
      })


    }
   
    
   

    setMessageInput('');
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
                     />

                     <button disabled={!messageInput} className="msg_send_btn" type="button" onClick={()=> sendMessage()}>
                        <i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
    </div>
  )
}

export default SendMessage
