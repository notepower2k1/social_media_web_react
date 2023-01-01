import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loading/Loading";

import { useSelector, useDispatch } from "react-redux";

import PostService from "../../services/post.service";
import UserService from "../../services/user.service";
import PostModal from "../Post/PostModal";
import Post from "../Post/Post";
import { addPost } from "../../redux/actions/PostActions";
import AuthService from '../../services/auth.service'

import "../Post/post.css";
import GroupService from "../../services/group.service";


const GroupPage = () => {
    const [group, setGroup] = useState(null);
    let {id} = useParams();

    const currentUser = AuthService.getCurrentUser();

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isShowed, setIsShowed] = useState(false);
    const [reload, setReload] = useState(false);

    const [isGroupPost, setIsGroupPost] = useState(true);

    /* const forceUpdate = useForceUpdate(); */
    const dispatch = useDispatch();
    const state = useSelector(state => state.allPosts);
    
    useEffect(() => {
        getAllPosts();
        return () => {
            setPosts([]);
        }
    }, [reload, state]);

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async () => {
        setLoading(true);
        setIsGroupPost(true)
        await PostService.getPostsGroup(id)
			.then(res => {
				let allPosts = res.data;
				allPosts.forEach(post => {
					getUserProfileByUser(post.user)
					.then(profileRes => {
						let userProfile = profileRes.data;
						post.userProfile = userProfile;
                        setPosts(prev => {
                            if (prev.every(curPostValue => curPostValue.id !== post.id)) {
                                return [...prev, post];
                            } else {
                                return [...prev];
                            }
                        });
                        if (state.allPosts.every(curPostValue => curPostValue.id !== post.id)) {
                            dispatch(addPost(post));
                        }
					});
				})
            })
            .catch(e => {
                console.log(e);
            });
            setLoading(false);

    }  
     
    const getUserProfileByUser = async (user) => {
        return await UserService.readUserProfile(user);
    }




    const showModal = () => {
        setIsShowed(true);
    }

    const hideModal = () => {
        setIsShowed(false);
    }

    useEffect(() => {
        GroupService.readGroupById(id)
            .then((res) => {
                setGroup(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div>
            { group !== null ? (
                    <div>
                        <section>
                            <div className="feature-photo">
                                <figure><img src="https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png" alt=""  /></figure>
                                <div className="add-btn">
                                    {/* <span>1205 followers</span> */}
                                    <span>(số thành viên)</span>
                                    <a href="#" title="" data-ripple="">Join Group</a>
                                </div>
                                <form className="edit-phto">
                                    <i className="fa fa-camera-retro"></i>
                                    <label className="fileContainer">
                                        Edit Cover Photo
                                    <input type="file"/>
                                    </label>
                                </form>
                                <div className="container-fluid">
                                    <div className="row merged">
                                        <div className="col-lg-2 col-sm-3">
                                            <div className="user-avatar">
                                                <figure>
                                                    <img src="https://w.wallha.com/ws/14/KoWeELYH.jpg" alt="" />
                                                    <form className="edit-phto">
                                                        <i className="fa fa-camera-retro"></i>
                                                        <label className="fileContainer">
                                                            Edit Display Photo
                                                            <input type="file"/>
                                                        </label>
                                                    </form>
                                                </figure>
                                            </div>
                                        </div>
                                        <div className="col-lg-10 col-sm-9">
                                            <div className="timeline-info">
                                                <ul>
                                                    <li className="admin-name">
                                                    <h5>{ group.groupName }</h5>
                                                    <span>(public-private)</span>
                                                    </li>
                                                    {/* <li>
                                                        <a className="active" href="time-line.html" title="" data-ripple="">time line</a>
                                                        <a className="" href="timeline-photos.html" title="" data-ripple="">Photos</a>
                                                        <a className="" href="timeline-videos.html" title="" data-ripple="">Videos</a>
                                                        <a className="" href="timeline-friends.html" title="" data-ripple="">Friends</a>
                                                        <a className="" href="timeline-groups.html" title="" data-ripple="">Groups</a>
                                                        <a className="" href="about.html" title="" data-ripple="">about</a>
                                                        <a className="" href="#" title="" data-ripple="">more</a>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </section>
                            
                    <section className="d-flex justify-content-center">
                    <div className="col-lg-8">
                                <div className="central-meta">
									<div className="new-postbox">
										<div className="">
											<div onClick={ showModal } >
												<textarea disabled></textarea>
												<div className="attachments">
													<ul>
														<li>
															<i className="fa fa-music"></i>
															<label className="fileContainer">
															</label>
														</li>
														<li>
															<i className="fa fa-image"></i>
															<label className="fileContainer">
															</label>
														</li>
														<li>
															<i className="fa fa-video-camera"></i>
															<label className="fileContainer">
															</label>
														</li>
														<li>
															<i className="fa fa-camera"></i>
															<label className="fileContainer">
															</label>
														</li>
														<li>
															<button className="btn btn-primary" onClick={ showModal } >Post</button>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>

                            { isShowed ? <PostModal 
                                handleClose={ hideModal } 
                                oldData={ selectedPost }
                                isGroupPost={isGroupPost}
                                groupID = {id}
                            /> : '' }
                                {
                                    posts === undefined || posts.length === 0  || loading
                                    ?  <Loading />
                                    : posts.map((post, index) => (
                                        <div className="central-meta item" key={index}>
                                            <Post data={post}  callBack={ setReload }
                                selected={ setSelectedPost }
                                onShowModal={ showModal }
                                />
                                            </div>
                                        
                                       
                                    ))
                                }
                                </div>
                    </section>
                    </div>
                ) : <Loading />
            }
        </div>
    );
}

export default GroupPage;