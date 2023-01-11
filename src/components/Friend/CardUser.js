import {Link } from "react-router-dom";

function CardUser({user}) {

    return (
    <>
        <figure>
        <img src={user.avatar} alt=""/>
        <span className="status f-online"></span>
    </figure>
    <div className="friendz-meta">
        <Link to={"/profile/" + user.userID} >{user.firstName + " " + user.lastName}</Link>
    </div>
    </>
    )
}

export default CardUser