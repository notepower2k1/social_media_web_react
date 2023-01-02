import { useEffect, useState } from "react";
import {Form,Card,Button,Row,Col } from 'react-bootstrap'
import FriendService from "../../services/friend.service"
import {Link } from "react-router-dom";
import CardUser from "./CardUser";
function ListFriend(props){
    const [listFriend,setListFriend] = useState()

    useEffect(() => {
        FriendService.getListFriend(props.userID).then(res => setListFriend(res.data))
    },[props.userID])

    // console.log(listFriend);
    // const handleRemoveFriend = (userId1) => {
    //     removeFriendShip(userId1,userId).then(() => setChange(!change))
    // }
    
    return (
        <div>
            {listFriend && 
                listFriend.map((user) =>(
                    <li key= {user.userProfileID}>
                    <CardUser 
                                user = {user}
                            />
                    </li>
                ))}
             
           
        </div>
        
    )
}

export default ListFriend