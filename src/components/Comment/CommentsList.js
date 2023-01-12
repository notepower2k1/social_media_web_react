import React ,{useState ,useEffect,useRef,useContext} from 'react'
import CommentService from '../../services/CommentService'
import ReplyList from '../Reply/ReplyLists';
import AddReplyComponent from '../Reply/AddReplyComponent';
import TextareaAutosize from 'react-textarea-autosize';
import Comment from './Comment';
import AuthService from '../../services/auth.service'
import NotificationService from '../../services/notify.service';
import { SocketContext } from '../../utils/SocketContext';


function CommentsList({post}) {

  const socket = useContext(SocketContext);

  const [listComments,setListComments] = useState([]);

  //Dữ liệu để save
  const [inputComment,setInputComment] = useState("");


  const [renderValue,setRenderValue] = useState(0);
  
  const user = AuthService.getCurrentUser();



  const formRef = useRef([]);
 
  const increaseRenderValue = ()=>{
    setRenderValue(c=>c+1)
  }
 
  useEffect(() => { 
    getAllComments();
  },[renderValue])

  const getAllComments =()=>{
    CommentService.getComments(post.id).then((response) => {
      setListComments(response.data);    
      
    });
  }

  const saveComment = (e)=>{
    e.preventDefault();
    var content = inputComment;
  
    const temp = {content,user,post}

    CommentService.createComment(temp).then((res)=>{
      increaseRenderValue();
    }).catch((err)=>{
        console.log(err)
    });
    
    if(user.id !== post.user.id){
      NotificationService.createNotification(user.id,post.user.id,`/detail/post/${post.id}`,3).then(noty => {
        socket.emit("sendNotification",noty.data)
      })
    }
   

    setInputComment('');
  }

  const handleKeyDown = async  (event) => {
    if (event.key === 'Enter') {
        if(!inputComment){
            alert("please fill in field!!")
        }
        else{
          saveComment(event)
        }
      }
}
 

  return (






    
            <div className="">
               <form className="border border-dark mb-2">
               <div className="form-group  ">
                 <TextareaAutosize
                 autoFocus
                 id="TextAreaResizeable"
                 name="inputComment" 
                 placeholder="Viết bình luận công khai..."      
                 value = {inputComment}
                 onChange= {(e)=> setInputComment(e.target.value)}
                 onKeyDown ={(e) => handleKeyDown(e)}
                 >
                </TextareaAutosize>                
               </div>
             </form>
            

            <ul className="we-comet">

            {listComments.map(     
                (comment,index) =>
                <li key={comment.id}>         
            

                    <Comment index={index} formRef={formRef} increaseRenderValue={increaseRenderValue} data ={comment}/>

                      <ul>
                      <ReplyList renderValue={renderValue} increaseRenderValue={increaseRenderValue} comment={comment} />
                      </ul>
                  


                      <ul>


                      <div id="reply-form" ref={el => formRef.current[index] = el}>
                      <AddReplyComponent  increaseRenderValue={increaseRenderValue} comment={comment}/>

                      </div>
                      </ul>
            
              </li>

            )
            }
            </ul>
            

            </div>
    

  )
}

export default CommentsList;