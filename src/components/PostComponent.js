import React ,{useState ,useEffect,useRef} from 'react'
import PostService from '../services/PostService';
import CommentComponent from '../components/CommentComponent';
import Button from '@atlaskit/button';
import LikeIcon from '@atlaskit/icon/glyph/like'
import CommentIcon from '@atlaskit/icon/glyph/comment'
import {Link} from 'react-router-dom'
function PostComponent() {

 

  const [posts,setPosts] = useState([]);

  const formRef = useRef([]);

  useEffect(()=>{
    getPosts()
  },[]);

  const getPosts = () =>{
    PostService.getPost().then((response)=>{
        setPosts(response.data)
    });
  }

  const handlerOpenComment = function(idx) {
    return function(e)
    {
      
      const currentForm = formRef.current[idx];
      if (currentForm) {
  
       
        if (currentForm.style.display === "none" || currentForm.style.display === "") {
          currentForm.style.display = "block";
        } else {
          currentForm.style.display = "none";
        }
      }
    };
  
  } 
  const userID = 1;
  return (
    <>
    <div className="container">
         
        <h1 className="text-center">Post List</h1>
        <Link to={`/profile/1`} className="btn btn-primary"> Profile</Link>
    </div>
   
            {
                
                posts.map(
                     (post,index) =>
                    <div className="mt-3 " key={post.postID}>
                        <div className="card">
                        <div className="card-body">
                            <div className="user-info d-flex">
                            <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle avatar shadow-4" alt="Avatar" />

                            <div className="user-info-text align-self-center ms-3">
                                <h5 className="card-title">UserID: {post.userID}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{post.publishedDate}</h6>
                            </div>
                            </div>
                           <div className="content-box">
                            <p className="card-text">{post.content}</p>

                            <img src="https://www.shutterstock.com/image-vector/new-post-vector-lettering-typography-260nw-1780835693.jpg"  alt="..."/>
                            </div>
                        </div>
                          <div className="feature-box d-flex ">
                        <Button
                        appearance="subtle"
                        iconBefore={<LikeIcon label="" size="medium"></LikeIcon> }
                        shouldFitContainer></Button>
                        <Button 
                        appearance="subtle" 
                        iconBefore={<CommentIcon label="" size="medium" ></CommentIcon>}
                        shouldFitContainer
                        onClick={(e) => handlerOpenComment(index)(e)}
                        ></Button>
                          </div>
                        </div>

                        <div id="comment-box" ref={el => formRef.current[index] = el}>
                 <CommentComponent postID={post.postID}/>
                 </div>
                 </div>
                
                )
              
            }
   
   
    </>
  )
}

export default PostComponent