import React, { useEffect, useState} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loading from "../Loading/Loading";

import GroupService from "../../services/group.service";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

const GroupPage = () => {

    const [group, setGroup] = useState(null);
    const [totalMembers, setTotalMembers] = useState(0);
    const [loading, setLoading] = useState("");
    const [isJoined, setIsJoined] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const currentUser = AuthService.getCurrentUser();
    
    const navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        getGroup(id)
            .then((res) => {
                setGroup(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        getTotalMember(id)
            .then(res => {
                setTotalMembers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        checkUserJoinedGroup(id, currentUser.id)
            .then(res => {
                setIsJoined(res.data === 1 ? true : false);
            })
            .catch(err => {
                console.log(err);
            });
        checkUserIsAdminGroup(id, currentUser.id)
            .then(res => {
                setIsAdmin(res.data === 1 ? true : false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [totalMembers, isJoined, loading]);

    
    const handleJoinGroup = async (event) => {
        event.preventDefault();
        setLoading(true);
        await UserService.joinGroup(id, currentUser.id)
            .then((res) => {
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
    }

    const handleLeaveGroup = async (event) => {
        event.preventDefault();
        //Nếu admin rời nhóm thì chuyển quyền cho thành viên khác
        //Nếu là admin thì có quyền buộc thành viên khác rời nhóm
        if (isAdmin) {
            if (window.confirm("Bạn là admin nếu rời nhóm, nhóm sẽ tự động xóa.\nXác nhận xóa?")) {
                await UserService.leaveGroup(id, currentUser.id);
                await GroupService.deleteGroup(id)
                    .then(res => {
                        navigate("/groups");
                    });
            }
        } else {
            setLoading(true);
            await UserService.leaveGroup(id, currentUser.id)
                .then((res) => {
                    setLoading(false);
                });
            setLoading(false);
        }
    }

    const getGroup = async (id) => {
        return await GroupService.readGroupById(id);
    }

    const getTotalMember = async (id) => {
        return await GroupService.readTotalMembersById(id);
    }

    const checkUserJoinedGroup = async (groupId, userId) => {
        return await UserService.checkUserJoinedGroup(groupId, userId);
    }
    const checkUserIsAdminGroup = async (groupId, userId) => {
        return await UserService.checkUserIsAdminGroup(groupId, userId);
    }

    return (
        <div>
            { group !== null ? (
                    <div>
                        <section>
                            <div className="feature-photo">
                                <figure><img src="https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png" alt=""  /></figure>
                                <div className="add-btn">
                                    {/* <span>1205 followers</span> */}
                                    <span>{ totalMembers } thành viên</span>
                                    {
                                        isJoined ? <a href="#" title="" className="bg-danger" data-ripple="" 
                                            onClick={ handleLeaveGroup }
                                        >{loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}Leave Group</a>
                                        
                                        : <a href="#" title="" data-ripple="" 
                                            onClick={ handleJoinGroup }
                                        >{loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}Join Group</a>
                                    }
                                    { isAdmin && 
                                        <Link 
                                            className="btn btn-primary"
                                            to={ `/group/${id}/edit` }
                                        ><i className="fa fa-pencil-square" aria-hidden="true"></i></Link>
                                    }
                                </div>
                                <form className="edit-phto">
                                    <i className="fa fa-camera-retro"></i>
                                    <label className="fileContainer">
                                        Edit Cover Photo
                                    <input type="file"/>
                                    </label>
                                </form>
                                <div className="container-fluid">
                                    <div className="row merged">
                                        <div className="col-lg-2 col-sm-3">
                                            <div className="user-avatar">
                                                <figure>
                                                    <img src="https://w.wallha.com/ws/14/KoWeELYH.jpg" alt="" />
                                                    <form className="edit-phto">
                                                        <i className="fa fa-camera-retro"></i>
                                                        <label className="fileContainer">
                                                            Edit Display Photo
                                                            <input type="file"/>
                                                        </label>
                                                    </form>
                                                </figure>
                                            </div>
                                        </div>
                                        <div className="col-lg-10 col-sm-9">
                                            <div className="timeline-info">
                                                <ul>
                                                    <li className="admin-name">
                                                    <h5>{ group.groupName }</h5>
                                                    <span>(public-private)</span>
                                                    </li>
                                                    {/* <li>
                                                        <a className="active" href="time-line.html" title="" data-ripple="">time line</a>
                                                        <a className="" href="timeline-photos.html" title="" data-ripple="">Photos</a>
                                                        <a className="" href="timeline-videos.html" title="" data-ripple="">Videos</a>
                                                        <a className="" href="timeline-friends.html" title="" data-ripple="">Friends</a>
                                                        <a className="" href="timeline-groups.html" title="" data-ripple="">Groups</a>
                                                        <a className="" href="about.html" title="" data-ripple="">about</a>
                                                        <a className="" href="#" title="" data-ripple="">more</a>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </section>
                            
                    <section>
                        <div className="gap gray-bg">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row" id="page-contents">
                                            <div className="col-lg-6">
                                                <div className="loadMore">
                                                    <div className="central-meta item">
                                                        <div className="new-postbox">
                                                            <figure>
                                                                <img src="../../images/resources/admin2.jpg" alt="" />
                                                            </figure>
                                                            <div className="newpst-input">
                                                                <form method="post">
                                                                    <textarea rows="2" placeholder="write something"></textarea>
                                                                    <div className="attachments">
                                                                        <ul>
                                                                            <li>
                                                                                <i className="fa fa-music"></i>
                                                                                <label className="fileContainer">
                                                                                    <input type="file" />
                                                                                </label>
                                                                            </li>
                                                                            <li>
                                                                                <i className="fa fa-image"></i>
                                                                                <label className="fileContainer">
                                                                                    <input type="file" />
                                                                                </label>
                                                                            </li>
                                                                            <li>
                                                                                <i className="fa fa-video-camera"></i>
                                                                                <label className="fileContainer">
                                                                                    <input type="file" />
                                                                                </label>
                                                                            </li>
                                                                            <li>
                                                                                <i className="fa fa-camera"></i>
                                                                                <label className="fileContainer">
                                                                                    <input type="file" />
                                                                                </label>
                                                                            </li>
                                                                            <li>
                                                                                <button type="submit">Publish</button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>	
                                    </div>
                                </div>
                            </div>
                        </div>	
                    </section>
                    </div>
                ) : <Loading />
            }
        </div>
    );
}

export default GroupPage;