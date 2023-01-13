
import {Link } from "react-router-dom";

function UserChild({user}) {

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
                </div>
            </div>
        </li>)
}

export default UserChild