
import React ,{useState ,useEffect,useRef} from 'react'
import CommentService from '../../services/CommentService'
import ReplyLists from '../Reply/ReplyLists';
import AddReplyComponent from '../Reply/AddReplyComponent';
import TextareaAutosize from 'react-textarea-autosize';
import Comment from './Comment';
import AuthService from '../../services/auth.service'



function CommentsList({post}) {

  const [listComments,setListComments] = useState([]);

  //Dữ liệu để save
  const [inputComment,setInputComment] = useState("");
  

  const [renderValue,setRenderValue] = useState(0);
  
  const user = AuthService.getCurrentUser();

  const commentDate = new Date().toISOString().slice(0, 10);;


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
    
    const temp = {content,commentDate,user,post}

    CommentService.createComment(temp).then((res)=>{
      increaseRenderValue();
    }).catch((err)=>{
        console.log(err)
    });
    
    setInputComment('');
  }

  
 

  return (
    <div >
            <div className="comment-box card">
               <form className="border border-dark">
               <div className="form-group mb-2 ">
                 <TextareaAutosize
                 autoFocus
                 cacheMeasurements
                 id="TextAreaResizeable"
                 name="inputComment" 
                 placeholder="Viết bình luận công khai..."      
                 value = {inputComment}
                 onChange= {(e)=> setInputComment(e.target.value)}
                 >
                </TextareaAutosize>                
               </div>
                 <button disabled={!inputComment} className="btn btn-primary float-end" onClick={(e) => saveComment(e)}>Bình luận</button>
             </form>
             {
            listComments.map(     
                (comment,index) =>
                <div key={comment.id}>         
               
            <Comment index={index} formRef={formRef} increaseRenderValue={increaseRenderValue} data ={comment}/>

            <ReplyLists comment={comment} />

          
            <div id="reply-form" ref={el => formRef.current[index] = el}>
            <AddReplyComponent  increaseRenderValue={increaseRenderValue} comment={comment}/>

            </div>

            
            </div>

            )
              
            }

            </div>
    </div>
  )
}

export default CommentsList;