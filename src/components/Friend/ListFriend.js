import { useEffect, useState } from "react";
import FriendService from "../../services/friend.service"
import FriendChild from "./FriendChild";
import RequesterChild from "./RequesterChild";
function ListFriend({userCurrentID}){
    const [listFriend,setListFriend] = useState()
    const [listRequester,setListRequester] = useState()
    const [change,setChange] = useState(false)

    useEffect(() => {
        FriendService.getListFriend(userCurrentID).then(res => setListFriend(res.data))
        FriendService.getListRequester(userCurrentID).then(res => setListRequester(res.data))
    },[userCurrentID,change])

    return (
        <div className="central-meta">
            <div className="frnds">
                <ul className="nav nav-tabs">
                    <li className="nav-item"><a className="active" href="#frends" data-toggle="tab">My Friends</a> 
                    <span>{listFriend && listFriend.length}</span></li>
                    <li className="nav-item"><a className="" href="#frends-req" data-toggle="tab">Friend Requests</a>
                    <span>{listRequester && listRequester.length}</span></li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active fade show " id="frends" >
                        <ul className="nearby-contct">
                            {listFriend && listFriend.map((user,index) =>(
                                <FriendChild 
                                    key ={index}
                                    user = {user} 
                                    userCurrentID = {userCurrentID}
                                    handleChange = {() => setChange(!change)}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className="tab-pane fade" id="frends-req" >
                        <ul className="nearby-contct">
                            {listRequester && listRequester.map((user,index) =>(
                                <RequesterChild 
                                    key ={index}
                                    user = {user} 
                                    userCurrentID = {userCurrentID}
                                    handleChange = {() => setChange(!change)}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ListFriend