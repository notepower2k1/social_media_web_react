import React, { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import PostService from "../../services/post.service";
import PostModal from "./PostModal";
import Post from "./Post";

import "./post.css";

function PostDetail() {
    const [post, setPost] = useState();
    const [selectedPost, setSelectedPost] = useState(null);
    const [isShowed, setIsShowed] = useState(false);
    const [reload, setReload] = useState(false);
    
    const {postID} = useParams();

    useEffect(() => {
        getAllPosts(postID);

        return () => {
            setPost([]);
        }
    }, []);

    const getAllPosts = async (postID) => {
        PostService.readPostById(postID).then((res) => {
            let postDetail = res.data;
            setPost(postDetail);
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
                                            <a href="fav-page.html" title="">My pages</a>
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
                                            <i className="ti-bell"></i>
                                            <a href="notifications.html" title="">Notifications</a>
                                        </li>
                                        <li>
                                            <i className="ti-share"></i>
                                            <a href="people-nearby.html" title="">People Nearby</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-bar-chart-o"></i>
                                            <a href="insights.html" title="">insights</a>
                                        </li>
                                        <li>
                                            <i className="ti-power-off"></i>
                                            <a href="landing.html" title="">Logout</a>
                                        </li>
                                        </ul>
                                    </div>
                                   
                                </aside>
                            </div>
                        
                            <div className="col-lg-9">
                        

                            { isShowed ? <PostModal handleClose={ hideModal } /> : '' }
                            {
                                post &&
                                    <div className="central-meta item" key={post.id}>
                                        <Post data={post}  callBack={ setReload }
                                            selected={ setSelectedPost }
                                            onShowModal={ showModal }
                                        />
                                    </div>
                                    
                            }   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default PostDetail;
