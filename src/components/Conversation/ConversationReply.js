import React ,{useState ,useEffect,useRef} from 'react'
import AuthService from '../../services/auth.service'
import conversationService from '../../services/conversationService'
import ProfileService from '../../services/ProfileService';
import FirebaseSerive from '../../services/firebaseService';
import {io} from "socket.io-client";

function ConversationReply({chatOn,increaseRenderValue,socket,renderValue,currentConversation}) {

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
      getConversationReplies();
      increaseRenderValue();
      alert("Delete Sucess!")

  }).catch((err)=>{
      console.log(err)
  })

  }

   
  useEffect(() => {
    
    if(chatOn){
      socket.current =io.connect("ws://localhost:8900");

    }


     return () => {
      socket.current.close();
    }

  },[chatOn]);

  useEffect(() =>{
    if(chatOn){
      socket.current.emit("addUser",user.id);
      socket.current.on("getUsers",users=>{
      })
    }
  
  },[])

  
  
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
                          
                        <p>{conversationReply.reply}</p>
                        
                        <span className='icon delete-icon mr-2' ref={el => iconRef.current[index] = el}  onClick={()=> {if(window.confirm('Delete the item?')){deleteReply(conversationReply.id,index)}}}> 
                      <i className="fa fa-trash"></i>
                        </span>
                        
                       
                          </div>
                       
                        <span className="time_date">{convertTime(conversationReply.conversationReplyTime)}</span> </div>
                      </div>
                    :  
                      <div className="incoming_msg">
                      <div className="incoming_msg_img"> <img src={avatar} className="rounded-circle"  alt="sunil"/> </div>
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

