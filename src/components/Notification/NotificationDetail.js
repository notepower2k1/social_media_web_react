import { useEffect, useState, useRef } from "react";
import {Link,useNavigate } from "react-router-dom";
import NotificationService from "../../services/notify.service";
import FirebaseService from '../../services/firebase.service';
import "./Notification.css"
import { getPassedTime } from "../../utils/spUtils";

function NotificationDetail({noty,handle}){

    const [change,setChange] = useState(false)

    const handleRead = (id,url) => {
        NotificationService.readedNotification(id).then(res => setChange(!change))
        handle()
    }

    return (
        <li>
            <Link to={noty.url} onClick={() => handleRead(noty.id)}>
                <p>
                <img src={noty.senderProfile.avatar} alt="" />
               
                    <span className="mesg-meta" >
                        <span style={{marginBottom: "0px"}}>{noty.senderProfile.firstName + " " + noty.senderProfile.lastName}</span>
                        <span>{noty.activityType === 1 ? "đã gửi lời mời kết bạn" : noty.activityType === 2 ? "đã like bài viết của bạn" : "đã comment bài post của bạn"}</span>
                        <i>{getPassedTime(new Date(noty.timeSent))}</i>
                    </span>
                    </p>
            </Link >
            {noty.isRead == 1 && <span className="tag green">New</span>}
        </li> 
    )
}

export default NotificationDetail