/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect ,useRef ,useContext} from "react";
import { Link } from "react-router-dom";
import { useDispatch  } from "react-redux";
import ReactEmoji from 'react-emoji';

import PostHistory from "./PostHistory";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import CommentsList from '../Comment/CommentsList';
import FirebaseService from "../../services/firebase.service";
import LikePostService from "../../services/likepost.service";
import UserService from "../../services/user.service";
import { removePost } from "../../redux/actions/PostActions";
import { getPassedTime } from "../../utils/spUtils";
import NotificationService from "../../services/notify.service";
import { SocketContext } from '../../utils/SocketContext';
import GroupService from "../../services/group.service";
const Post = ({ data, callBack, selected, onShowModal, nameProfile }) => {
    const currentUser = AuthService.getCurrentUser();
    const formRef = useRef([]);

	const socket = useContext(SocketContext);

    const [images, setImages] = useState([]);
    const [isShowed, setIsShowed] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);

    const [isLiked , setIsLiked] = useState(true);
    const [postsLiked, setPostLiked] = useState([]);

    const [groupName,setGroupName] = useState("")
    const [groupID,setGroupID] = useState("")
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

        getPostsCurrentUserLiked(currentUser, data);
        

        if(data.group_id !==null){
            GroupService.readGroupById(data.group_id).then((response) => {
                setGroupName(response.data.groupName);
                setGroupID(response.data.id)
            })
        }

        return () => {
            setImages([]);
        };

       
    }, []);
    
    useEffect(()=>{
        getPostsCurrentUserLiked(currentUser,data)
        readTotalLikes()
    },[isLiked])

    const getImageFromFirebase = async (image) => {
        FirebaseService.getImageUrlFromFirebase(image)
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

  
    const getPostsCurrentUserLiked = async (user,post) => {

            await LikePostService.readPostUserLiked(user.id,post.id)
            .then(res => {
                setPostLiked(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleShowEditHistory = (e) => {
        e.preventDefault();
        setIsShowed(true);
    }

    const handleHideEditHistory = (e) => {
        e.preventDefault();
        setIsShowed(false);
    }

    const handleRepost = (event) => {
        event.preventDefault();
        
        selected(prev => data);
        onShowModal();
    };


    const handleLikePost = async (event) => {
        await UserService.likePost(data.id, currentUser.id)
            .then((res) => {
                // console.log(res.data);
                setIsLiked(prev=>!prev)
                NotificationService.createNotification(currentUser.id,data.user.id,`/detail/post/${res.data.post.id}`,2)
                    .then(noty => {
                        noty && socket.emit("sendNotification",noty.data)
                    }) 
            })
            .catch((err) => {
                console.log(err);
            });
      }
      // Cần thêm @Modifying và @Transactional bên Repository mới Delete được
      const handleDisLikePost = async (event) => {
        // console.log(data.id, currentUser.id)
            await UserService.dislikePost(data.id, currentUser.id)
                .then((res) => {
                    // console.log(res.data);
                    setIsLiked(prev=>!prev)
                })
                .catch((err) => {
                    console.log(err);
                });
      }
  
      // Function để gọi lại cho tiện
      const readTotalLikes = () => {
        LikePostService.readTotalLikesById(data.id)
            .then(res => {
                setTotalLikes(res.data);
            })
            .catch(err => {
                console.log(err.response)
            });
    }
  
    return (
        <div className="user-post">
            { 
                isShowed 
                ?   <PostHistory 
                        handleClose={ handleHideEditHistory } 
                        postId={ data.id }
                        nameProfile={nameProfile}
                    /> : '' 
            }
            <div className="dropdown float-right">
                <button className="btn btn-flat btn-flat-icon" type="button" data-toggle="dropdown" aria-expanded="false">
                    <em className="fa fa-ellipsis-h"></em>
                </button>
                <div className="dropdown-menu dropdown-scale dropdown-menu-right" role="menu" 
                    style={{position: "absolute", transform: "translate3d(-136px, 28px, 0px)", top: "0px", willChange: "transform"}}
                >
                    <a className="dropdown-item" href="#" onClick={ handleShowEditHistory }>History Editting</a>
                    {   currentUser.id === data.user.id 
                        ? 
                            <>
                                <a className="dropdown-item" href="#" onClick={ handleRepost }>Repost</a>
                                <a className="dropdown-item" href="#" onClick={ handleDeletePost }>Delete Post</a> 
                            </>
                        : "" 
                    }
                    
                </div>
            </div>
            <div className="friend-info">
            <figure>
                <img src={data.user.profile.avatar} alt=""/>
            </figure>
            <div className="friend-name">
                    {data.group_id
                    ? <>
                    <ins><Link to ={"/group/"+groupID}>{groupName}</Link></ins><span>{ data.user.profile.firstName.concat(" " + data.user.profile.lastName) }</span> 
                    </>
                    : <ins>{ data.user.profile.firstName.concat(" " + data.user.profile.lastName) }</ins>}
               
                <Link to={"/detail/post/" + data.id} >{getPassedTime(new Date(data.publishedDate)) }</Link>

                
            </div>
            <div className="description">
                    
                    <p>
                        {ReactEmoji.emojify(data.content)}
                    </p>
                </div>
            <div className="post-meta">
                <div className="">
                    <a href="#" title="">
                    { 
                        data.image !== "NONE" 
                            ?   (
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
                    <p><i className="fa fa-thumbs-up"></i> {totalLikes}</p>

                    <div className="feature-box d-flex ">
                             
                           
                             
                        {
                            postsLiked.length === 0?
                            <button className="btn btn-primary w-100"   onClick={ handleLikePost }>
                            <i className="fa fa-thumbs-up"> Like</i>
                            </button> 
                            :
                            <button className="btn btn-primary w-100"   onClick={ handleDisLikePost }>
                            <i className="fa fa-thumbs-down"> Unlike</i>
                            </button>
                           
                            
                             
                                                    
                        }

                        <button  
                        className="btn btn-primary w-100"    
                            onClick={(e) => handleOpenComment(e)}
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