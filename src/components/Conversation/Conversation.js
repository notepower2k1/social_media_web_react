import React ,{useState ,useEffect,useRef} from 'react'
import "./Conversation.css";
import conversationService from '../../services/conversationService'

function Conversation({data,userID}) {

    const [reply,setReply] = useState("")
    const [conversationReplyTime,setConversationReplyTime] = useState("")

    useEffect(() =>{
        conversationService.getLastConversationReply(data.id).then(res=>{
            setReply(res.data.reply);
            convertTime(res.data.conversationReplyTime);
        })

    },[])

    
    const convertTime = (date) =>{
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const dateValue  = new Date(date);
        
        setConversationReplyTime(dateValue.toLocaleDateString("en-US", options))
    }

   
  return (
    <div className="">
    
       
                            <div className="chat_people">
                                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                                <div className="chat_ib">
                                    <h5>{userID}<span className="chat_date">{conversationReplyTime}</span></h5>     
                                    <p>{reply}</p>                    
                                </div>
        </div>   
             
             
             
           
               
                   
     </div>
  )
}

export default Conversation;