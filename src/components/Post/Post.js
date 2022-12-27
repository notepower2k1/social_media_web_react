/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect ,useRef } from "react";
import { useDispatch } from "react-redux";
import ReactEmoji from 'react-emoji';

import PostHistory from "./PostHistory";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import CommentComponent from '../Comment/CommentComponent';
import { getImageUrlFromFirebase } from "../../utils/firebasePort";
import { removePost } from "../../redux/actions/PostActions";
import { getPassedTime } from "../../utils/spUtils";

const Post = ({ data, callBack, selected, onShowModal }) => {
    const currentUser = AuthService.getCurrentUser();
    const formRef = useRef([]);
    const [images, setImages] = useState([]);
    const [isShowed, setIsShowed] = useState(false);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (data?.image !== "NONE") {
            let imageString = data.image;
            let imagesArr = imageString.split("|");

            let preProcessArr = imagesArr.filter(image => image);
            preProcessArr.forEach(imageFileName => {
                getImageFromFirebase(imageFileName);
            });
        }
        return () => {
            setImages([]);
        };
    }, []);
    
    const getImageFromFirebase = async (image) => {
        getImageUrlFromFirebase("post_images", image)
            .then((url) => {
                setImages(prev => [...prev, url])
            });
    }

    const handleDeletePost = (event) => {
        event.preventDefault();
        if (window.confirm("Xác nhận xóa post?") && (data.user.id === currentUser.id)) {
            PostService.deletePost(data.id)
                .then(res => {
                    callBack(prev => !prev);
                    dispatch(removePost(data.id));
                });
            alert("Xóa thành công bài viết");
        } else if (data.user.id !== currentUser.id) {
            alert("Bạn không thể xóa bài viết của người khác")
        }
    };

    const handleRepost = (event) => {
        event.preventDefault();
        
        selected(prev => data);
        onShowModal();
    };

    const handleOpenComment = function(e) {   
        const currentForm = formRef.current;
        if (currentForm) {    
            if (currentForm.style.display === "none" || currentForm.style.display === "") {
                currentForm.style.display = "block";
            } else {
                currentForm.style.display = "none";
            }
        }
    } 

    const handleShowEditHistory = (e) => {
        e.preventDefault();
        setIsShowed(true);
    }

    const handleHideEditHistory = (e) => {
        e.preventDefault();
        setIsShowed(false);
    }

    return (
        <section className="hero">
            { isShowed ? <PostHistory 
                handleClose={ handleHideEditHistory } 
                postId={ data.id }
            /> : '' }
            <div className="container">
                <div className="row">	
                    <div className="col-lg-10">
                        <div className="cardbox shadow-lg bg-white">
                            <div className="cardbox-heading">
                                <div className="dropdown float-right">
                                    <button className="btn btn-flat btn-flat-icon" type="button" data-toggle="dropdown" aria-expanded="false">
                                        <em className="fa fa-ellipsis-h"></em>
                                    </button>
                                    <div className="dropdown-menu dropdown-scale dropdown-menu-right" role="menu" 
                                        style={{position: "absolute", transform: "translate3d(-136px, 28px, 0px)", top: "0px", willChange: "transform"}}
                                    >
                                        {/* <a className="dropdown-item" href="#">Hide post</a>
                                        <a className="dropdown-item" href="#">Stop following</a>
                                        <a className="dropdown-item" href="#">Report</a> */}
                                        <a className="dropdown-item" href="#" onClick={ handleShowEditHistory }>History Editting</a>
                                        <a className="dropdown-item" href="#">Hide</a>
                                        { currentUser.id === data.user.id ? 
                                            <>
                                                <a className="dropdown-item" href="#" onClick={ handleRepost }>Repost</a>
                                                <a className="dropdown-item" href="#" onClick={ handleDeletePost }>Delete Post</a> 
                                            </>
                                        : "" }
                                        
                                    </div>
                                </div>
                                <div className="media m-0">
                                    <div className="d-flex mr-3">
                                        <a href="">
                                            <img 
                                                className="img-fluid rounded-circle" 
                                                src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/4.jpg" 
                                                alt="User"/>
                                        </a>
                                        
                                    </div>
                                    <div className="media-body">
                                        <p className="m-0">test{/* { data.userProfile.firstName.concat(" " + data.userProfile.lastName) } */}</p>
                                        <small><span>{ getPassedTime(new Date(data.publishedDate)) }</span></small>
                                    </div>
                                </div>
                            </div>
                            <div className="p-1 pb-3" style={{ fontSize: "16px" }}>{ReactEmoji.emojify(data.content)}</div>
                            <div className="cardbox-item">
                                { data?.image !== "NONE" ? 
                                    (
                                        images.length === 1 ?
                                            <img 
                                                className="img-fluid" 
                                                src={ images[0] }
                                            /> : 
                                        images.map((image, index) => <img 
                                            className="" 
                                            src={image}
                                            height="125"
                                            key={index}
                                        />)
                                    )
                                    : ""
                                }
                            </div>
                            <div className="cardbox-base">
                                <ul className="float-right">
                                    <li><a><i className="fa fa-comments"></i></a></li>
                                    <li><a><em className="mr-5">12</em></a></li>
                                    <li><a><i className="fa fa-share-alt"></i></a></li>
                                    <li><a><em className="mr-3">03</em></a></li>
                                </ul>
                                <ul>
                                    <li><a><i className="fa fa-thumbs-up"></i></a></li>
                                    <li><a href="#"><img src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/3.jpeg" className="img-fluid rounded-circle" alt="User"/></a></li>
                                    <li><a href="#"><img src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/1.jpg" className="img-fluid rounded-circle" alt="User"/></a></li>
                                    <li><a href="#"><img src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/5.jpg" className="img-fluid rounded-circle" alt="User"/></a></li>
                                    <li><a href="#"><img src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/2.jpg" className="img-fluid rounded-circle" alt="User"/></a></li>
                                    <li><a><span>242 Likes</span></a></li>
                                </ul>			   
                            </div>
                            <div>
                        <div className="feature-box d-flex ">
                            <button
                                className="btn btn-primary mx-auto"
                            // iconBefore={<LikeIcon label="" size="medium"></LikeIcon> }
                            >Like</button>
                            <button 
                                className="btn btn-primary mx-auto"
                            // iconBefore={<CommentIcon label="" size="medium" ></CommentIcon>}
                          
                            onClick={(e) => handleOpenComment(e)}
                            >Comment</button>
                        </div>


                            <div id="comment-box" ref={el => formRef.current = el}>
                            <CommentComponent post={data}/>
                             </div>

                            </div>		
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Post