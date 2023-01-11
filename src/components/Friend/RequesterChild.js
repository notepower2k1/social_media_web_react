import { useEffect, useState } from "react";
import FriendService from "../../services/friend.service"
import { storage } from '../../utils/firebaseConfig';
import { ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

function RequesterChild({user,userCurrentID,handleChange}){

    const handleAcceptRequest = (userID2) => {
        FriendService.acceptRequest(userCurrentID,userID2).then(res => handleChange())
    }

    const handleRemoveRequest = (userID2) => {
        FriendService.removeFriendShip(userCurrentID,userID2).then(res => handleChange())
    }

    return (
        <li>
            <div class="nearly-pepls">
                <figure>
                    <Link to={"/profile/" + user.userID}>
                        <img src={user.avatar} />
                    </Link>
                </figure>
                <div class="pepl-info">
                    <h4>
                        <Link to={"/profile/" + user.userID}>
                            {user.firstName + " " + user.lastName}
                        </Link>
                    </h4>
                    <p  onClick={() => handleRemoveRequest(user.userID)} class="add-butn more-action">
                        Delete Request</p>
                    <p  onClick={() => handleAcceptRequest(user.userID)} class="add-butn" >Confirm</p>
                </div>
            </div>
        </li>	
    )
}

export default RequesterChild