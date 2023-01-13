import React ,{useState,useRef,useEffect,useContext} from 'react';

// import Button from '@atlaskit/button';
import ReplyService from '../../services/ReplyService'
import TextareaAutosize from 'react-textarea-autosize';
import AuthService from '../../services/auth.service'
import { SocketContext } from '../../utils/SocketContext';
import NotificationService from '../../services/notify.service';
import ProfileService from '../../services/profile.service';



function AddReplyComponent({increaseRenderValue,comment}) {
    const socket = useContext(SocketContext);

    const [inputReply,setInputReply] = useState("");
    const user = AuthService.getCurrentUser();
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [avatar,setAvatar] = useState('');

    useEffect(()=>{
      ProfileService.getProfile(user.id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setAvatar(response.data.avatar);
      })
         
          

  },[])
    const saveReply = (e)=>{
        e.preventDefault();
        var reply = inputReply;

        const temp = {reply,user,comment}
        ReplyService.createReply(temp).then((res)=>{
        
            increaseRenderValue();  

            

        }).catch((err)=>{
            console.log(err)
        });
        
        
        if(user.id !== comment.user.id){
        NotificationService.createNotification(user.id,comment.user.id,`/detail/post/${comment.post.id}`,3).then(noty => {
          socket.emit("sendNotification",noty.data)
        })
        }
        setInputReply("") 
      

      }

      const handleKeyDown = async  (event) => {
        if (event.key === 'Enter') {
            if(!inputReply){
                alert("please fill in field!!")
            }
            else{
              saveReply(event)
            }
          }
    }
  return (
    <div>

             <div className="comet-avatar">
              <img src={avatar} className="rounded-circle avatar shadow-4" alt="Avatar" />
              </div>
              <div className="we-comment">
              <h5>{firstName} {lastName}</h5>
              <TextareaAutosize     
                      id="TextAreaResizeable"     
                      name="inputComment" 
                      placeholder="Viết phản hồi công khai..."     
                      value = {inputReply}
                      onChange= {(e)=> setInputReply(e.target.value)}
                      onKeyDown = {(e)=> handleKeyDown(e)
                      
                      } 
              >
              </TextareaAutosize>  

              </div>
                 
    </div>
  )
}


export default AddReplyComponent;