import React ,{useState ,useEffect,useRef} from 'react'
import "./Conversation.css";
import conversationService from '../../services/conversationService'
import ProfileService from '../../services/ProfileService';
import FirebaseSerive from '../../services/firebaseService';

function Conversation({chatOn,renderValue,data,sender}) {


    const [reply,setReply] = useState("")
    const [conversationReplyTime,setConversationReplyTime] = useState("")
    const [lastUserReply,setLastUserReply] = useState("")

    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')

    const [avatar,setAvatar] = useState(null)
    
    const [NumberOfNewMessages,setNumberOfNewMessages] = useState(0)
    
    
    useEffect(() =>{
        conversationService.getLastConversationReply(data.id).then(res=>{
            setReply(res.data.reply);
            convertTime(res.data.conversationReplyTime);
            setLastUserReply(res.data.user)
        })

        if(chatOn){
            conversationService.getCountNewMessage(data.id,sender.id).then(res=>{
                setNumberOfNewMessages(res.data)
            })
        }
      

       
          
    },[renderValue])


    useEffect(()=>{
        ProfileService.getProfile(sender.id).then((response) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            FirebaseSerive.getAvatarFromFirebase(response.data.avatar).then((response) => {
                setAvatar(response)
            })
            
        })

    },[])
    

    
    const convertTime = (date) =>{

        const dateValue  = new Date(date);
        
        setConversationReplyTime(dateValue.toLocaleDateString("en-GB"))
    }

   
  return (
    <div className="">
    
       
                            <div className="chat_people">
                                <div className="chat_img"> <img src={avatar} className="rounded-circle" alt="sunil"/> </div>
                                <div className="chat_ib">
                                    <h5>{firstName} {lastName}<span className="chat_date">{conversationReplyTime}</span></h5>     
                                    
                                    {sender.id === lastUserReply.id
                                    ?   <div className="d-flex justify-content-between"> 
                                        <p>{reply}</p>
                                        {
                                            NumberOfNewMessages===0
                                            ?<span></span>
                                            :<span className="badge badge-pill badge-danger align-self-center">{NumberOfNewMessages}</span>   
                                        }
                                                                        
                                        </div>    
                                    : <div className="d-flex justify-content-between"> 
                                        <p> You: {reply}</p>
                                        {
                                            NumberOfNewMessages===0
                                            ?<span></span>
                                            :<span className="badge badge-pill badge-danger align-self-center">{NumberOfNewMessages}</span>   
                                        }                            
                                        </div>     
                                    }
                                                
                                </div>
        </div>   
             
             
             
           
               
                   
     </div>
  )
}

export default Conversation;