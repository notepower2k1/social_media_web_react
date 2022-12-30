import React ,{useState,useEffect,useRef} from 'react';
import ReplyService from '../../services/ReplyService'


import Reply from './Reply';


function ReplyLists({comment}){

    const [listReplies,setListReplies] = useState([]);

    const [renderValue,setRenderValue] = useState(0);


    const increaseRenderValue = ()=>{
      setRenderValue(c=>c+1)
    }
    useEffect(() => {
      getAllReplies();
    },[renderValue] );

    const getAllReplies =()=>{
      ReplyService.getReplies(comment.id).then((response) => {
          setListReplies(response.data);       
      });
    }

    
  
    

    
  return (
    <div>
        {
            listReplies.map(
                (reply,index) =>
                <li key={reply.id}>    

                <Reply increaseRenderValue={increaseRenderValue} data={reply}/>
            
                </li>
            )
        }
    </div>
  )
}

export default ReplyLists;