import React ,{useState ,useEffect,useRef} from 'react'
import AuthService from '../../services/auth.service'
import conversationService from '../../services/conversationService'
import ProfileService from '../../services/ProfileService';
import FirebaseSerive from '../../services/firebaseService';

function ConversationReply({increaseRenderValue,socket,renderValue,currentConversation}) {

  const user = AuthService.getCurrentUser();

  const [messages,setMessages] = useState([]);

  const [arrivalMessage,setArrivalMessage] = useState("")

  const conversationReplyTime = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString();



  const iconRef = useRef([]);

  const [avatar,setAvatar] = useState(null)

  const [lastID,setLastID] = useState(0);

  const scrollRef = useRef();
 
  const getLastID = async ()=>{
    conversationService.getLastConversationReplyID().then((res)=>{
      setLastID(res.data + 1 )
    })
  }

  const getConversationReplies = async () =>{
    conversationService.getConversationBetweenUser(currentConversation.id).then(res=>{
      setMessages(res.data);
      getOtherUsersID(res.data);

  })
  }
  const deleteReply = async (id)=>{
    conversationService.deleteConversationReply(id).then((res)=>{
      increaseRenderValue();
      alert("Delete Sucess!")

  }).catch((err)=>{
      console.log(err)
  })

  }

   



 

  
  
  useEffect(()=>{
    getConversationReplies();
    getLastID();

  },[renderValue])

    useEffect(()=>{

      socket.current.on("getMessage",data=>{
        setArrivalMessage({
          id :lastID ,
          reply:data.text,
          conversationReplyTime:conversationReplyTime,
          status :0,
          deleleStatus:0,
          user:data.senderID,
          conversation:currentConversation,
        })
      })

    },[])


    useEffect(()=>{
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    },[arrivalMessage,currentConversation])


  const getOtherUsersID = async (data) =>{  
    data.forEach((c) =>{
        if (user.id !== c.user.id){
            getAvatar(c.user.id);
        }
    })
  }

  const getAvatar = async (id) =>{
    ProfileService.getProfile(id).then((response) => {
      FirebaseSerive.getAvatarFromFirebase(response.data.avatar).then((response) => {
          setAvatar(response);
      })  
  })
  }

  const convertTime = (date) =>{
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const dateValue  = new Date(date);
    
    let time = date.match(/\d\d:\d\d/);

    return  time + " / " + dateValue.toLocaleDateString("en-US", options);
  }

  const setShow = (index)=>{
    const current = iconRef.current[index];
    if (current) {

     
      if (current.style.display === "none" || current.style.display === "") {
        current.style.display = "block";
      }
    }
  }

  const setHide = (index)=>{
    const current = iconRef.current[index];
    if (current) {

      if (current.style.display === "block" || current.style.display === "") {
        current.style.display = "none";
      }
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div>

      {
       messages && messages.map(
        (conversationReply,index) =>
           <div key={conversationReply.id} ref={scrollRef}>

                  {                    
                    user.id === conversationReply.user.id
                    ?
                    <div className="outgoing_msg">
                        <div className="sent_msg" >
                          <div className="d-flex"
                          onMouseEnter={() => setShow(index)}
                          onMouseLeave={() => setHide(index)}
                          >
                          
                        {
                          conversationReply.deleleStatus === 0
                          ?<p>{conversationReply.reply}</p>
                          :<p>Bạn đã thu hồi tin nhắn</p>
                        }                       

                        {
                        conversationReply.deleleStatus === 0?
                        <span className='icon delete-icon mr-2' ref={el => iconRef.current[index] = el}  onClick={()=> {if(window.confirm('Delete the item?')){deleteReply(conversationReply.id)}}}> 
                      <i className="fa fa-trash"></i>
                        </span>
                        :<div></div>

                        }
                          </div>
                       
                        <span className="time_date">{convertTime(conversationReply.conversationReplyTime)}</span> 
                        </div>
                      </div>
                    :  
                      <div className="incoming_msg">
                      <div className="incoming_msg_img"> <img src={avatar} className="rounded-circle"  alt="sunil"/> </div>
                      <div className="received_msg">
                        <div className="received_withd_msg">
                        {
                          conversationReply.deleleStatus === 0
                          ?<p>{conversationReply.reply}</p>
                          :<p>Tin nhắn đã bị thu hồi</p>
                        }    
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

