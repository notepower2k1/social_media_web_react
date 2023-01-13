import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import UserService from "../../services/user.service";
import GroupService from "../../services/group.service";
import AuthService from "../../services/auth.service";

const Group = ({ data, user, callBack }) => {

    const [totalMembers, setTotalMembers] = useState(0);
    const [loading, setLoading] = useState("");

    const currentUser = AuthService.getCurrentUser();
    
    useEffect(() => {
        GroupService.readTotalMembersById(data.id)
            .then(res => {
                setTotalMembers(res.data);
            })
            .catch(err => {

            })
    }, [loading])

    const handleJoinGroup = async (event) => {
        event.preventDefault();
        setLoading(true);
        await UserService.joinGroup(data.id, user.id)
            .then((res) => {
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
        callBack(prev => !prev)
    }
    
    const handleLeaveGroup = async (event) => {
        event.preventDefault();
        checkUserIsAdminGroup(data.id, currentUser.id)
            .then(res => {
                if (res.data === 1) {
                    if (window.confirm("Bạn là admin nếu rời nhóm, nhóm sẽ tự động xóa.\nXác nhận xóa?")) {
                        /* UserService.leaveGroup(data.id, currentUser.id); */
                        GroupService.deleteGroup(data.id)
                            .then(res => {
                                callBack(prev => !prev);
                            });
                    }
                } else {
                    setLoading(true);
                    UserService.leaveGroup(data.id, currentUser.id)
                        .then((res) => {
                            setLoading(false);
                        });
                    setLoading(false);
                }
                callBack(prev => !prev);
            })
            .catch(err => {
                console.log(err);
            });
        
    }

    const checkUserIsAdminGroup = async (groupId, userId) => {
        return await UserService.checkUserIsAdminGroup(groupId, userId);
    }

    return (
        <div className="nearly-pepls">
            <figure>
                <Link to={`/group/${data.id}`}>
                    <img src="https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3" alt="" />
                </Link>
            </figure>
            <div className="pepl-info">
                
                <h4><Link to={`/group/${data.id}`}>
                    { data.groupName }
                </Link></h4>
                <span>(public-private)</span>
                <em>{ totalMembers } thành viên</em>
                {
                    data.isJoined 
                        ? <a href="#" title="" className="add-butn bg-danger" data-ripple="" 
                            onClick={ handleLeaveGroup }
                        >Leave group</a>
                        : <a href="#" title="" className="add-butn" data-ripple="" 
                            onClick={ handleJoinGroup }

                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            Join now</a>
                }
                
                
            </div>
        </div>
    )
}

export default Group;