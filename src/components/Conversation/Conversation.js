import React ,{useState ,useEffect,useRef} from 'react'
import "./Conversation.css";
import conversationService from '../../services/conversationService'
import ProfileService from '../../services/ProfileService';
import FirebaseSerive from '../../services/firebaseService';

function Conversation({onlineUsers,renderValue,conversation,sender}) {


    const [reply,setReply] = useState("")
    const [conversationReplyTime,setConversationReplyTime] = useState("")
    const [lastUserReply,setLastUserReply] = useState("")

    const [deleteStatus,setDeleteStatus] = useState(0);
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')

    const [avatar,setAvatar] = useState(null)
    
    const [NumberOfNewMessages,setNumberOfNewMessages] = useState(0)
    
    
   useEffect(() =>{

            conversationService.getLastConversationReply(conversation.id).then(res=>{
                setReply(res.data.reply);
                convertTime(res.data.conversationReplyTime);
                setLastUserReply(res.data.user)
                setDeleteStatus(res.data.deleleStatus);
            })

          
                conversationService.getCountNewMessage(conversation.id,sender.id).then(res=>{
                    setNumberOfNewMessages(res.data)
                })
        
     

       
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
           
            if (date){
                const dateValue  = new Date(date);      
                setConversationReplyTime(dateValue.toLocaleDateString("en-GB"))
            }
            else{
                setConversationReplyTime("");
            }

       
    }
  return (
    <div className="">
    
                            {
                                
                                conversation !== null ?
                                <div className="chat_people">
                                <div className="chat_img"> 
                                <img src={avatar} className="rounded-circle img-fluid" alt="sunil"/>    {
                                    onlineUsers && onlineUsers.map(
                                        (u) =>
                                        u.userID===sender.id
                                        ?        <img className="online" src="http://www.clker.com/cliparts/e/E/F/G/p/g/alex-green-circle-md.png" alt="online"/>
                                        :<div></div>
                                    )

                                    } </div>
                                <div className="chat_ib">
                                    <h5>{firstName} {lastName}

                                
                                    
                                    <span className="chat_date">{conversationReplyTime}</span></h5>     
                                    
                                    {lastUserReply ? sender.id === lastUserReply.id
                                    ?   <div className="d-flex justify-content-between"> 
                                        {
                                             deleteStatus === 0
                                             ?<p>{reply}</p>
                                             :<p>Tin nhắn đã bị thu hồi</p>
                                        }
                                        
                                        {
                                            NumberOfNewMessages===0
                                            ?<span></span>
                                            :<span className="badge badge-pill badge-danger align-self-center">{NumberOfNewMessages}</span>   
                                        }
                                                                        
                                        </div>    
                                    : <div className="d-flex justify-content-between"> 
                                         {
                                             deleteStatus === 0
                                             ?<p>You:{reply}</p>
                                             :<p>Bạn đã thu hồi tin nhắn</p>
                                        }
                                        {
                                            NumberOfNewMessages===0
                                            ?<span></span>
                                            :<span className="badge badge-pill badge-danger align-self-center">{NumberOfNewMessages}</span>   
                                        }                            
                                        </div>     
                                        :<div></div>
                                    }
                                                
                                </div>
                                </div>   
                                :<div></div>
                            }
                        
             
             
             
           
               
                   
     </div>
  )
}

export default Conversation;