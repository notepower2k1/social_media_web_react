import React from 'react';
import { Link } from 'react-router-dom';


const GroupMember = ({ key, profile, removeMember }) => {
    
    return (
        <li key={key}>
            <div className="nearly-pepls">
                <figure>
                    <Link to={ "/profile/" + profile.userID } title="">
                        <img src={ profile.avatar } alt="" />
                    </Link>
                </figure>
                <div className="pepl-info">
                    <h4><Link to={ "/profile/" + profile.userID } title="">
                        { profile.firstName.concat(" "+profile.lastName) }
                    </Link></h4>
                    {/* <span>ftv model</span> */}
                    <a 
                        href="#" 
                        title="" className="add-butn bg-danger" 
                        data-ripple=""
                        onClick={ (event) => {
                            event.preventDefault();
                            return removeMember
                                (profile.firstName.concat(" "+profile.lastName), profile.userID);
                        } }
                    >Remove from group</a>
                </div>
            </div>
        </li>
    );
}

export default GroupMember;