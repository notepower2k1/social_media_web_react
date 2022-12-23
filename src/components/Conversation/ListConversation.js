import React ,{useState ,useEffect,useRef} from 'react'
import conversationService from '../../services/conversationService'
import AuthService from '../../services/auth.service'
import Conversation from './Conversation'
import ConversationReply from './ConversationReply'
import SendMessage from './SendMessage'
import {io} from "socket.io-client";



function ListConversation() {
    

    const user = AuthService.getCurrentUser();

    const socket = useRef();

    const [listConversations,setListConversations] = useState([]);
    const chatItemRef = useRef([]);
    const [renderValue,setRenderValue] = useState(0);
    const [chatOn,setChatOn] = useState(false)
    const currentConversation = useRef();


    const increaseRenderValue = ()=>{
      setRenderValue(c=>c+1)
    }

   
 

   

 
 
   

    useEffect(() =>{
      getAllConversation();   

  },[])


    const toggleChat= () =>{
      setChatOn(prevState => !prevState);
    }

    const getAllConversation = async () =>{
        conversationService.getAllConversation(user.id).then(res=>{
            setListConversations(res.data);
        })
    }

 

    const updateStatusMessage = async (conversationID,senderID) =>{
      conversationService.updateStatus(conversationID,senderID);
    }

    const handleClick = (index,conversation)=>{
        
        var elements = chatItemRef.current;

     
        elements.forEach(element =>{
            if (element.classList.contains("active_chat") || element.classList.contains === ""){
                element.classList.remove("active_chat");
            }
        })
        
        chatItemRef.current[index].classList.add("active_chat");

        currentConversation.current = conversation;

        toggleChat();
        //update status messenge
        user.id === conversation.userOne.id 
        ? updateStatusMessage(conversation.id,conversation.userTwo.id)
        : updateStatusMessage(conversation.id,conversation.userOne.id)

        increaseRenderValue();

    }

    
 
   
  return (
    <div className="">
        <h3 className=" text-center">Messaging</h3>
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

            {
            listConversations && listConversations.map(
                 (conversation,index)  =>
                    <div key={conversation.id} >
                                <div className="chat_list" ref={el => chatItemRef.current[index] = el} onClick={() => handleClick(index,conversation)}>

                            {
                                    user.id === conversation.userOne.id ?
                                    <Conversation chatOn={chatOn} increaseRenderValue={increaseRenderValue} renderValue={renderValue} data={conversation} sender={conversation.userTwo}/>
                                    :<Conversation chatOn={chatOn} increaseRenderValue={increaseRenderValue}  renderValue={renderValue} data={conversation} sender={conversation.userOne}/>
                
                                }
                                                </div>

                    </div>
                
            )
            }
            </div>

       
         
            </div>
            <div className="mesgs">
                 <div className="msg_history">
                    {chatOn && <ConversationReply chatOn={chatOn} socket ={socket} increaseRenderValue={increaseRenderValue} renderValue={renderValue} currentConversation={currentConversation.current}/>}
                 </div>
                 <div className="type_msg">
                    {chatOn && <SendMessage socket ={socket} increaseRenderValue={increaseRenderValue} currentConversation={currentConversation.current}/>}
                 </div>
               </div>
            </div>
            </div>

          </div>
     
  )
}

export default ListConversation;