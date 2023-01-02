<<<<<<< HEAD
import React ,{useState,useRef,useEffect} from 'react';

// import Button from '@atlaskit/button';
import ReplyService from '../../services/ReplyService'
import TextareaAutosize from 'react-textarea-autosize';
import AuthService from '../../services/auth.service'
import ProfileService from '../../services/ProfileService';
import FirebaseSerive from '../../services/firebaseService';
=======
import React ,{useState,useEffect,useRef} from 'react';
import ReplyService from '../../services/ReplyService'


import Reply from './Reply';


function ReplyLists({renderValue,increaseRenderValue,comment}){

    const [listReplies,setListReplies] = useState([]);
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193



   
    useEffect(() => {
      getAllReplies();
    },[renderValue] );

    const getAllReplies =()=>{
      ReplyService.getReplies(comment.id).then((response) => {
          setListReplies(response.data);       
      });
    }

<<<<<<< HEAD
    const [inputReply,setInputReply] = useState("");
    const user = AuthService.getCurrentUser();
    const formRef = useRef([])
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [avatar,setAvatar] = useState(null);

    useEffect(()=>{

      ProfileService.getProfile(comment.user.id).then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          FirebaseSerive.getAvatarFromFirebase(response.data.avatar).then((response) => {
              setAvatar(response)
          })
          
      })

  },[])
    const saveReply = (e)=>{
        e.preventDefault();
        var reply = inputReply;

        const temp = {reply,user,comment}
        
        ReplyService.createReply(temp).then((res)=>{
            const currentForm = formRef.current;
            currentForm.style.display = "none"
            increaseRenderValue();  

        

        }).catch((err)=>{
            console.log(err)
        });
        
=======
    
  
    
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193

    
  return (
    <div>
<<<<<<< HEAD

             <div ref={formRef} className='reply-box'>
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
              >
              </TextareaAutosize>  
              <button disabled={!inputReply} className="btn btn-primary float-end" onClick={(e) => saveReply(e)}>Bình luận</button>

              </div>
                  </div>
=======
        {
            listReplies.map(
                (reply,index) =>
                <li key={reply.id}>    

                <Reply increaseRenderValue={increaseRenderValue} data={reply}/>
            
                </li>
            )
        }
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
    </div>
  )
}

export default ReplyLists;