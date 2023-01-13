import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import GroupService from "../../services/group.service";
import Loading from "../Loading/Loading";
import PostModal from "./PostModal";
import Post from "./Post";
import { addPost, setAllPosts } from "../../redux/actions/PostActions";

import "./post.css";
import GroupPresent from "./GroupPresent";


const PostContainer = () => {
    const currentUser = AuthService.getCurrentUser();

    const [posts, setPosts] = useState([]);
    const [isShowed, setIsShowed] = useState(false);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [groupsJoined, setGroupsJoined] = useState([]);

    const [isGroupPost, setIsGroupPost] = useState(false);

    const dispatch = useDispatch();

	useEffect(() => {
        getAllPosts();
        getGroupsCurrentUserJoined(currentUser.id);
        return () => {
            setPosts([]);
        }
    }, [reload]);
    
    useEffect(() => {
        getAllPosts();
        return () => {
            setPosts([]);
        }
    }, []);


    const getAllPosts = async () => {
        setLoading(true);
        await PostService.getFriendPostByUserID(currentUser.id)
			.then(res => {
                setPosts(res.data);
                dispatch(setAllPosts(res.data));
            })
            .catch(e => {
                console.log(e);
            });
        setLoading(false);
    }

    const getGroupsCurrentUserJoined = async (userId) => {
        await GroupService.readGroupsUserJoined(userId)
            .then(res => {
                setGroupsJoined(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const showModal = () => {
        setIsShowed(true);
    }

    const hideModal = () => {
        setIsShowed(false);
    }

    return (
        <section>
            <div className="gap gray-bg">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row" id="page-contents">
                                <div className="col-lg-3">
                                    <aside className="sidebar static">
                                        <div className="widget">
                                            <h4 className="widget-title">Shortcuts</h4>
                                            <ul className="naves">
                                            <li>
                                                <i className="ti-clipboard"></i>
                                                <a href="newsfeed.html" title="">News feed</a>
                                            </li>
                                            <li>
                                                <i className="ti-mouse-alt"></i>
                                                <a href="inbox.html" title="">Inbox</a>
                                            </li>
                                            <li>
                                                <i className="ti-files"></i>
                                                <a href="fav-page.html" title="">My group</a>
                                            </li>
                                            <li>
                                                <i className="ti-user"></i>
                                                <a href="timeline-friends.html" title="">friends</a>
                                            </li>
                                            <li>
                                                <i className="ti-image"></i>
                                                <a href="timeline-photos.html" title="">images</a>
                                            </li>
                                            <li>
                                                <i className="ti-video-camera"></i>
                                                <a href="timeline-videos.html" title="">videos</a>
                                            </li>
                                            <li>
                                                <i className="ti-comments-smiley"></i>
                                                <a href="messages.html" title="">Messages</a>
                                            </li>
                                       
                                            <li>
                                                <i className="ti-share"></i>
                                                <a href="people-nearby.html" title="">People Nearby</a>
                                            </li>
                                            <li>
                                                <i className="fa fa-bar-chart-o"></i>
                                                <a href="insights.html" title="">insights</a>
                                            </li>
                                            
                                            </ul>
                                        </div>
                                    </aside>
                                </div>
                                <div className="col-lg-6">
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
                                                isGroupPost = {isGroupPost}
                                                callBack={ setReload }
                                            /> : '' 
                                    }
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
                                <div className="col-lg-3">
                                    <aside className="sidebar static">
                                        <div className="widget">
                                            <h4 className="widget-title">Your group</h4>	
                                            {
                                                groupsJoined && 
                                                    groupsJoined.map((group, index) => 
                                                        <div className="your-page" key={index}>
                                                            <GroupPresent
                                                                data={group}
                                                                callBack={setReload}
                                                                user={currentUser}
                                                            />
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PostContainer;