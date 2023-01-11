import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

import AuthService from '../../services/auth.service';
import ConverRoomAdd from './ConverRoom/ConverRoomAdd';
import ConverRoomDetail from './ConverRoom/ConverRoomDetail';

const ConversationDetail = ({ conver, toggleChat, onlineUsers, otherMembers, onSetOtherMembers, otherUser }) => {
    const user = AuthService.getCurrentUser();

    const [isShowed, setIsShowed] = useState(false);

    /* const roomNameRef = useRef(null);

    const setRef = useCallback(node => {
        roomNameRef.current = node
    }, []); */
    
    useEffect(() => {
        return () => {
            setIsShowed(false);
        }
    }, []);

    return (
        <div>
            {
                isShowed && 
                    <ConverRoomAdd
                        usersInChat={{ userID: user.id, otherUserID: otherUser.otherUserID}}
                        onShow={setIsShowed}
                        onToggleChat={toggleChat}
                        conver={conver}
                    />
            }
            {
                otherMembers.length >= 2
                ?   <ConverRoomDetail
                        conver={conver}
                        onToggleChat={toggleChat}
                        otherMembers={otherMembers}
                        onSetOtherMembers={onSetOtherMembers}
                    />
                :   otherMembers.length === 1 && <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-primary btn-rounded" 
                                    onClick={ toggleChat }
                                >
                                    <i className="fa fa-arrow-left"></i>
                                </button>
                                <button type="button" className="btn btn-primary btn-rounded"
                                    onClick={() => {
                                        setIsShowed(prev => !prev);
                                    }}
                                >
                                    Add group
                                </button>
                            </div>
                            <div className="mt-3 text-center">
                                <Link to={"/profile/" + otherUser.otherUserID}>
                                    <img src={otherUser.avatar}
                                        className="current-chat-avatar rounded-circle img-fluid" alt="avatar" />
                                </Link>
                            </div>
                            <div className="text-center">
                                <h4 className="mb-2">{otherUser.firstName} {otherUser.lastName}</h4>
                                    <p className="text-muted">@{otherMembers[0].username}</p>
                                    { 
                                        onlineUsers && onlineUsers.map((u, index) =>
                                            otherMembers.some(mem => u.userID === mem.id)
                                                ?
                                                <p key={index} className="text-success">Người dùng đang hoạt động
                                                    <i className="ml-2 fa fa-globe text-success"></i>
                                                </p>
                                                : ""
                                        )
                                    }
                            </div>
                        </div>
                    </div>
                
            }
        </div>
    );
}

export default ConversationDetail;