import React ,{useState ,useEffect,useRef} from 'react'
import AuthService from '../../services/auth.service'
import conversationService from '../../services/conversationService'

function ConversationReply({renderValue,currentConversation}) {

  const user = AuthService.getCurrentUser();

  const [listConversationReplies,setListReplyReplies] = useState([]);
 
  const [isShown, setIsShown] = useState(false);

  const iconRef = useRef([]);

  const getConversationReplies = async () =>{
    conversationService.getConversationBetweenUser(currentConversation.id).then(res=>{
      setListReplyReplies(res.data);
  
  })
  }
  const deleteReply = async (id)=>{
    conversationService.deleteConversationReply(id).then((res)=>{
      getConversationReplies();
      alert("Delete Sucess!")

  }).catch((err)=>{
      console.log(err)
  })

  }
  useEffect(() =>{
    getConversationReplies();
},[renderValue])


  const convertTime = (date) =>{
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const dateValue  = new Date(date);
    
    let time = date.match(/\d\d:\d\d/);

    return  time + " / " + dateValue.toLocaleDateString("en-US", options);
  }

  return (
    <div>

      {
       listConversationReplies && listConversationReplies.map(
        (conversationReply,index) =>
           <div key={conversationReply.id} >

                  {
                    
                    user.id === conversationReply.user.id
                    ?
                    <div className="outgoing_msg">
                        <div className="sent_msg" >
                          <div className="d-flex"
                          onMouseEnter={() => setIsShown(true)}
                          onMouseLeave={() => setIsShown(false)}
                          >
                          
                        <p 
                        >{conversationReply.reply}</p>
                        
                        { isShown &&  <span className='icon delete-icon mr-2' ref={el => iconRef.current[index] = el}  onClick={()=> {if(window.confirm('Delete the item?')){deleteReply(conversationReply.id,index)}}}> 
                      <i className="fa fa-trash"></i>
                        </span>
                        }
                       
                          </div>
                       
                        <span className="time_date">{convertTime(conversationReply.conversationReplyTime)}</span> </div>
                      </div>
                    : 
                      <div className="incoming_msg">
                      <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                      <div className="received_msg">
                        <div className="received_withd_msg">
                        <p>{conversationReply.reply}</p>
                        <span className="time_date">{convertTime(conversationReply.conversationReplyTime)}</span></div>
                      </div>
                    </div>
                  }
                
                 
            </div>
       )
      }
        
                  
                 
                  
    </div>
  )
}

export default ConversationReply;

