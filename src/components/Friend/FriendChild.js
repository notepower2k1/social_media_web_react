import { useEffect, useState } from "react";
import FriendService from "../../services/friend.service"
import { storage } from '../../utils/firebaseConfig';
import { ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

function FriendChild({user,userCurrentID,handleChange}) {
    
    const handleRemoveFriendShip = (userID2) => {
        FriendService.removeFriendShip(userCurrentID,userID2).then(res => handleChange())
    }
    return (
        <li>
            <div className="nearly-pepls">
                <figure>
                    <Link to={"/profile/" + user.userID}>
                        <img src={user.avatar} />
                    </Link>
                </figure>
                <div className="pepl-info">
                    <h4>
                        <Link to={"/profile/" + user.userID}>
                            {user.firstName + " " + user.lastName}
                        </Link>
                    </h4>
                    <p onClick={() => handleRemoveFriendShip(user.userID)} className="add-butn more-action" data-ripple="">Unfriend</p>
                </div>
            </div>
        </li>)
}

export default FriendChild