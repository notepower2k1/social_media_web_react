import React ,{useState,useEffect,useRef} from 'react';
import AuthService from '../../services/auth.service'
import ReplyService from '../../services/ReplyService'
import TextareaAutosize from 'react-textarea-autosize';

import { getPassedTime } from "../../utils/spUtils";





function Reply({increaseRenderValue,data}) {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');


    const [isReadonly, setIsReadonly] = useState(true);
   
    const currentuser = AuthService.getCurrentUser();

    const inputRef = useRef([]);

   

    useEffect(()=>{
          setFirstName(data.user.profile.firstName);
          setLastName(data.user.profile.lastName);
  },[])

 

  const updateReply = (inputUpdateReply,id)=>{
  
    var reply = inputUpdateReply;
    var comment = data.comment
    var user = data.user
    const temp = {reply,user,comment}

    
    ReplyService.updateReply(id,temp).then((res)=>{
      alert("Update Sucess!")
      increaseRenderValue();
    
  }).catch((err)=>{
      console.log(err)
  });
    
   

   
  }
  const deleteReply = ((id) =>{
    ReplyService.deleteReply(id).then((res)=>{
      alert("Delete Sucess!")
      increaseRenderValue();


  }).catch((err)=>{
      console.log(err)
  })
  });




  
  

  
    const handlerUpdate = (e,commentReplyID) => {
      const currentInput = inputRef.current;

      if (currentInput) {
        currentInput.focus()
        setIsReadonly(prevState => !prevState);
      
        if (isReadonly){
          e.target.style.backgroundColor = 'lightblue'
        }
        else{
          e.target.style.backgroundColor = 'transparent';
          
          if(window.confirm('Delete the item?')){
            const inputUpdateReply = currentInput.value ;
            
            updateReply(inputUpdateReply,commentReplyID);
          }
          else{
          }
        
    }
      }
    };  
  



  return (
    <>
    <div className="comet-avatar">
    <img src={data.user.profile.avatar} className="rounded-circle avatar shadow-4" alt="Avatar"/>
  </div>
  <div className="we-comment">
    <div className="coment-head">
      <h5>{firstName} {lastName}</h5>
      <span>{getPassedTime(new Date(data.dateReply))}</span>
     
    </div>
    <TextareaAutosize
       id="TextAreaResizeable"
       cacheMeasurements
       defaultValue = {data.reply}
       readOnly ={isReadonly}
       ref={inputRef} 

       >         
       </TextareaAutosize>  
       <div className="d-flex we-reply">
         <div className="feature">

          { currentuser.id === data.user.id 
            ?<>
                  <span className='icon delete-icon mr-2 ' onClick={()=> {if(window.confirm('Delete the item?')){deleteReply(data.id)}}}> 
                    <i className="fa fa-trash"></i>
                      </span>
                <span className='icon edit-icon mr-2' onClick={(e) => handlerUpdate(e,data.id)}> 
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

export default Reply;