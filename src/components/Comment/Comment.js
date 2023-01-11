import React ,{useState ,useEffect,useRef} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import AuthService from '../../services/auth.service'
import CommentService from '../../services/CommentService'
import FirebaseSerive from '../../services/firebase.service';
import { getPassedTime } from "../../utils/spUtils";

function Comment({index,formRef,increaseRenderValue,data}) {


    const [isReadonly, setIsReadonly] = useState(true);
    const currentuser = AuthService.getCurrentUser();
    const inputRef = useRef();

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [avatar,setAvatar] = useState(null);

    useEffect(()=>{

       
            setFirstName(data.user.profile.firstName);
            setLastName(data.user.profile.lastName);
            FirebaseSerive.getAvatarFromFirebase(data.user.profile.avatar).then((response) => {
                setAvatar(response)
            })
            
        

    },[])

    const UpdateHandler = (e,commentID) =>{
            const currentInput = inputRef.current;

            if (currentInput) {
  
                currentInput.focus()
            setIsReadonly(prevState => !prevState);
      
        
            
              if (isReadonly){
                e.target.style.backgroundColor = 'lightblue'
              }
              else{
                e.target.style.backgroundColor = 'transparent';
                if(window.confirm("Update item ?")){

                  const inputUpdateComment = currentInput.value ;

                  updateComment(inputUpdateComment,commentID);
                }
                else{
                }
              }
          }}
          
           
          
        
      
      
      const updateComment = (inputUpdateComment,commentID)=>{
        var content = inputUpdateComment;
        var post = data.post
        var user = data.user
        const temp = {content,user,post}
    
        
        CommentService.updateComments(commentID,temp).then((res)=>{
          alert("Update Sucess!")
          increaseRenderValue();
        
      }).catch((err)=>{
          console.log(err)
      });
      
      console.log(temp)
       
      }
    
      const deleteComment = ((id) =>{

        if(window.confirm("Delete item ?")){
          CommentService.deleteComments(id).then((res)=>{
            alert("Delete Sucess!")
            increaseRenderValue();
      
        }).catch((err)=>{
            console.log(err)
        })
        }
        else{

        }
      });
    
    
    
      
    
      const handlerCreateReply = () => {

          
          const currentForm = formRef.current[index];
          if (currentForm) {
      
           
            if (currentForm.style.display === "none" || currentForm.style.display === "") {
              currentForm.style.display = "block";
            } else {
              currentForm.style.display = "none";
            }
          }
        }
    
      
      
      
      
  return (
    <>

    <div className="comet-avatar">
    <img src={avatar} className="rounded-circle avatar shadow-4" alt="Avatar"/>
  </div>

  <div className="we-comment">
														<div className="coment-head">
															<h5>{firstName} {lastName}</h5>
															<span>{getPassedTime(new Date(data.commentDate))}</span>
                            
                             
														</div>
                            <TextareaAutosize
                              id="TextAreaResizeable"
                              cacheMeasurements
                              defaultValue = {data.content}
                              readOnly ={isReadonly}
                              ref={inputRef} 
                              >         
                            </TextareaAutosize> 
                            <div className="d-flex we-reply">
                              <div className="feature" >
                              <span className='icon feedback-icon mr-2' onClick={(e) => handlerCreateReply()}> 
                              <i className="fa fa-reply"></i>
                            </span>
                          {
                              currentuser.id === data.user.id
                              ? 
                              <>
                              <span className='icon delete-icon mr-2' onClick={()=> {if(window.confirm('Delete the item?')){deleteComment(data.id)}}}> 
                                    <i className="fa fa-trash"></i>
                                </span>
                                <span className='icon edit-icon mr-2' onClick={(e) => UpdateHandler(e,data.id)}> 
                                <i className="fa fa-edit"></i>
                                </span>    
                                </>
                              :<></>
                          }
                          
                                </div>
                            </div>  
		</div>
  </>
  )
}


export default Comment;