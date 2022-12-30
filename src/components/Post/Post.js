/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect ,useRef} from "react";
import { useNavigate } from 'react-router-dom';
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import ReactEmoji from 'react-emoji';
import CommentsList from '../Comment/CommentsList';
import { Routes, Route, Link } from "react-router-dom";
import FirebaseSerive from '../../services/firebaseService';
import ProfileService from '../../services/ProfileService';

const Post = ({data}) => {
    let navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();

    const [images, setImages] = useState([])
    const [avatar,setAvatar] = useState(null);



    useEffect(() => {
        let imageString = data?.image;
        let imagesArr = imageString.split("|");

        let preProcessArr = imagesArr.filter(image => image);
        
        setImages(preProcessArr);

    }, []);

    useEffect(()=>{

        ProfileService.getProfile(data.user.id).then((response) => {       
            FirebaseSerive.getAvatarFromFirebase(response.data.avatar).then((response) => {
                setAvatar(response)
            })
            
            
        })

    },[])
    const handleInputChange = event => {
        const { name, value } = event.target;

    };

    const deletePost  = (event) => {
        event.preventDefault();
        if (window.confirm("Xác nhận xóa post?") && (data.user.id === currentUser.id)) {
            PostService.deletePost(data.id)
            .then(response => {
                console.log(response.data);
                navigate("/posts");
            })
            .catch(e => {
                console.log(e);
            });

            alert("Xóa thành công bài viết: ", data.id)
        } else {
            alert("Bạn không thể xóa bài viết của người khác")
        }
    };


    const formRef = useRef([]);


    const handlerOpenComment = function(e) {   
          const currentForm = formRef.current;
          if (currentForm) {    
            if (currentForm.style.display === "none" || currentForm.style.display === "") {
              currentForm.style.display = "block";
            } else {
              currentForm.style.display = "none";
            }
          }
        
      
      } 

    return (
        <div className="user-post">

            <div className="friend-info">
            <figure>
                <img src={avatar} alt=""/>
            </figure>
            <div className="friend-name">
                <ins>{ data.userProfile.firstName.concat(" " + data.userProfile.lastName) }</ins>
                <span>{data.publishedDate}</span>
            </div>
            <div className="description">
                    
                    <p>
                        {data.content}
                    </p>
                </div>
            <div className="post-meta">
                <div className="">
                    <a href="#" title="">
                    { data.image !== "NONE" 
                                        ? 
                                        (
                                            images.length === 1 ?
                                                <img 
                                                    className="img-fluid" 
                                                    src={ images[0] }
                                                    alt=""
                                                /> : 
                                                <div className="row">
                                            {
                                            images.map((image, index) =>
                                            <div key={index} className="col-lg-6 col-md-12 mb-4 mb-lg-0">

                                                <img 
                                                    className="shadow-1-strong rounded mb-4" 
                                                    src={image}
                                                    height="125"
                                                    
                                                    alt=""
                                                />
                                            </div>

                                                )}
                                            
                                           </div>

                                        )
                                        : ""
                                    }
                    </a>
                </div>	
                <div className="we-video-info">
                <div className="feature-box d-flex ">
                                <button className="btn btn-primary w-100">
                                <i className="fa fa-thumbs-up"> Like</i>

                                </button>
                                <button  className="btn btn-primary w-100"    
                                onClick={(e) => handlerOpenComment(e)}
                                >
                                    <i className="fa fa-comment"> Comment</i>
                                </button>
                            </div>
                </div>
            </div>
            </div>
            <div className="coment-area" id="comment-box" ref={el => formRef.current = el}>
                <CommentsList post={data}/>
            </div>
        </div>
    )
}

export default Post