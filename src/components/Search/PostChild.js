import { useEffect, useState } from "react";
import {storage} from '../../utils/firebaseConfig';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import {Link } from "react-router-dom";
import { getPassedTime } from "../../utils/spUtils";

function PostChild({postWithUser}){

    const [avatar,setAvatar] = useState()
    const userProfile = postWithUser.userProfile
    const post = postWithUser.post
    
    useEffect(() =>{
        const avatarRef = ref(storage,`avatarImages/${postWithUser.userProfile.avatar}`);
        getDownloadURL(avatarRef).then(url => setAvatar(url))
    },[postWithUser])

    return (
        <div className="central-meta item">
        <Link to={"/detail/post/" + postWithUser.post.id}>
        <div className="user-post">
            <div className="friend-info">
                <figure>
                    <img src={avatar} alt=""/>
                </figure>
                <div className="friend-name">
                   
                    <ins>{userProfile.firstName + " " + userProfile.lastName}</ins>
                    <span>{getPassedTime(new Date(post.publishedDate))}</span>
                </div>
                <div className="description">
                    <p>{post.content}</p>
                </div>
            </div>
        </div>
        </Link>

    </div>
    )
}

export default PostChild