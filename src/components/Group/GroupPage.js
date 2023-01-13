import React, { useEffect, useState} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import Post from "../Post/Post";
import Loading from "../Loading/Loading";
import PostModal from "../Post/PostModal";
import GroupService from "../../services/group.service";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import PostService from "../../services/post.service";

import "../Post/post.css";

const GroupPage = () => {

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [group, setGroup] = useState(null);
    const [totalMembers, setTotalMembers] = useState(0);
    const [loading, setLoading] = useState("");
    const [isJoined, setIsJoined] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isShowed, setIsShowed] = useState(false);
    const [reload, setReload] = useState(false);
    const [isGroupPost, setIsGroupPost] = useState(true);

    const currentUser = AuthService.getCurrentUser();
    
    const navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        getAllPosts();
        return () => {
            setPosts([]);
        }
    }, [reload]);

    useEffect(() => {
        getGroup(id)
            .then((res) => {
                setGroup(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        getTotalMember(id)
            .then(res => {
                setTotalMembers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        checkUserJoinedGroup(id, currentUser.id)
            .then(res => {
                setIsJoined(res.data === 1 ? true : false);
            })
            .catch(err => {
                console.log(err);
            });
        checkUserIsAdminGroup(id, currentUser.id)
            .then(res => {
                setIsAdmin(res.data === 1 ? true : false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [totalMembers, isJoined, loading]);

    const getAllPosts = async () => {
        setLoading(true);
        setIsGroupPost(true)
        await PostService.getPostsGroup(id)
			.then(res => {
				let allPosts = res.data;
                setPosts(allPosts);
               
            })
            .catch(e => {
                console.log(e);
            });
            setLoading(false);
    }  
    
    const showModal = () => {
        setIsShowed(true);
    }

    const hideModal = () => {
        setIsShowed(false);
    }
    
    const handleJoinGroup = async (event) => {
        event.preventDefault();
        setLoading(true);
        await UserService.joinGroup(id, currentUser.id)
            .then((res) => {
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
    }

    const handleLeaveGroup = async (event) => {
        event.preventDefault();
        if (isAdmin) {
            if (window.confirm("Bạn là admin nếu rời nhóm, nhóm sẽ tự động xóa.\nXác nhận xóa?")) {
                await UserService.leaveGroup(id, currentUser.id);
                await GroupService.deleteGroup(id)
                    .then(res => {
                        navigate("/groups");
                    });
            }
        } else {
            setLoading(true);
            await UserService.leaveGroup(id, currentUser.id)
                .then((res) => {
                    setLoading(false);
                });
            setLoading(false);
        }
    }

    const getGroup = async (id) => {
        return await GroupService.readGroupById(id);
    }

    const getTotalMember = async (id) => {
        return await GroupService.readTotalMembersById(id);
    }

    const checkUserJoinedGroup = async (groupId, userId) => {
        return await UserService.checkUserJoinedGroup(groupId, userId);
    }
    const checkUserIsAdminGroup = async (groupId, userId) => {
        return await UserService.checkUserIsAdminGroup(groupId, userId);
    }

    return (
        <div>
            { group !== null ? (
                    <div>
                        <section>
                            <div className="feature-photo">
                                <figure><img src="https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png" alt=""  /></figure>
                                <div className="add-btn">
                                    <span>{ totalMembers } thành viên</span>
                                    {
                                        isJoined ? <a href="#" title="" className="bg-danger" data-ripple="" 
                                            onClick={ handleLeaveGroup }
                                        >{loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}Leave Group</a>
                                        
                                        : <a href="#" title="" data-ripple="" 
                                            onClick={ handleJoinGroup }
                                        >{loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}Join Group</a>
                                    }
                                    { isAdmin && 
                                        <Link 
                                            className="btn btn-primary"
                                            to={ `/group/${id}/edit` }
                                        ><i className="fa fa-pencil-square" aria-hidden="true"></i></Link>
                                    }
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
                                                    <img src="https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3" alt="" />
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

                                { 
                                    isShowed ? 
                                        <PostModal 
                                            handleClose={ hideModal } 
                                            oldData={ selectedPost }
                                            isGroupPost={isGroupPost}
                                            groupID = {id}
                                            callBack={ setReload }
                                        /> : '' 
                                }
                                {
                                    posts === undefined || posts.length === 0  || loading
                                    ?   <Loading />
                                    :   posts.map((post, index) => (
                                            <div className="central-meta item" key={index}>
                                                <Post 
                                                    data={post}  callBack={ setReload }
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