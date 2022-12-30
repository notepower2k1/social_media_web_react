import React ,{useState ,useEffect,useRef} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import AuthService from '../../services/auth.service'
import CommentService from '../../services/CommentService'
import ProfileService from '../../services/ProfileService';
import FirebaseSerive from '../../services/firebaseService';

function Comment({index,formRef,increaseRenderValue,data}) {

    const [isReadonly, setIsReadonly] = useState(true);
    const user = AuthService.getCurrentUser();
    const inputRef = useRef();
    const commentDate = new Date().toISOString().slice(0, 10);;

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [avatar,setAvatar] = useState(null);


    useEffect(()=>{

        ProfileService.getProfile(data.user.id).then((response) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            FirebaseSerive.getAvatarFromFirebase(response.data.avatar).then((response) => {
                setAvatar(response)
            })
            
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
        const temp = {content,commentDate,user,post}
    
        
        CommentService.updateComments(commentID,temp).then((res)=>{
          alert("Update Sucess!")
        
      }).catch((err)=>{
          console.log(err)
      });
      
    
       
      }
    
      const deleteComment = ((id) =>{
        CommentService.deleteComments(id).then((res)=>{
          alert("Delete Sucess!")
          increaseRenderValue();
    
      }).catch((err)=>{
          console.log(err)
      })
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

    <div class="comet-avatar">
    <img src={avatar} className="rounded-circle avatar shadow-4" alt="Avatar"/>
  </div>

  <div class="we-comment">
														<div class="coment-head">
															<h5>{firstName} {lastName}</h5>
															<span>{data.commentDate}</span>
                            
                             
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
                              <span className='icon delete-icon mr-2' onClick={()=> {if(window.confirm('Delete the item?')){deleteComment(data.id)}}}> 
                              <i className="fa fa-trash"></i>
                          </span>
                          <span className='icon edit-icon mr-2' onClick={(e) => UpdateHandler(e,data.id)}> 
                          <i className="fa fa-edit"></i>
                          </span>     
                                </div>
                            </div>  
		</div>
  </>
  )
}


export default Comment;