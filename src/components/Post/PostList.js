import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import PostService from "../../services/post.service";
import UserService from "../../services/user.service";
import Loading from "../Loading/Loading";
import PostModal from "./PostModal";
import Post from "./Post";
import { addPost, setAllPosts } from "../../redux/actions/PostActions";

import "./post.css";

const PostContainer = () => {

    const [posts, setPosts] = useState([]);
    const [isShowed, setIsShowed] = useState(false);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);

    const dispatch = useDispatch();
    const state = useSelector(state => state.allPosts);

	useEffect(() => {
        console.log(state);
        getAllPosts();
        return () => {
            setPosts([]);
        }
    }, [reload, state]);

    useEffect(() => {
        getAllPosts();
        return () => {
            setPosts([]);
        }
    }, []);
    const getAllPosts = async () => {
        setLoading(true);
        await PostService.readAllPosts()
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
                        });
                    if (state.allPosts.every(curPostValue => curPostValue.id !== post.id)) {
                        dispatch(addPost(post));
                    }
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

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={ showModal }>Add</button>
            { isShowed ? <PostModal 
                handleClose={ hideModal } 
                oldData={ selectedPost }
            /> : '' }
            {
                posts === undefined || posts.length === 0 || loading 
                    ? <Loading />
                    : posts.map((post, index) => (
                            <Post 
                                key={index} 
                                data={post}
                                callBack={ setReload }
                                selected={ setSelectedPost }
                                onShowModal={ showModal }
                            />
                        ))
            }
            
        </>
    );
}

export default PostContainer;