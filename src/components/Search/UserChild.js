import { useEffect, useState } from "react";
import {storage} from '../../utils/firebaseConfig';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import {Link } from "react-router-dom";

function UserChild({user}) {
    const [avatar,setAvatar] = useState()

    useEffect(() =>{
        const avatarRef = ref(storage,`avatarImages/${user.avatar}`);
        getDownloadURL(avatarRef).then(url => setAvatar(url))
    },[user])

    return (
        <li>
            <div className="nearly-pepls">
                <figure>
                    <Link to={"/profile/" + user.userID}>
                        <img src={avatar} />
                    </Link>
                </figure>
                <div className="pepl-info">
                    <h4>
                        <Link to={"/profile/" + user.userID}>
                            {user.firstName + " " + user.lastName}
                        </Link>
                    </h4>
                </div>
            </div>
        </li>)
}

export default UserChild