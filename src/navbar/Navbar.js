import React, { useState ,useEffect, useContext} from "react";
import { Link ,useNavigate  } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import ProfileService from '../services/profile.service';
import NotificationList from "../components/Notification/NotificationList";
import { SocketContext } from '../utils/SocketContext';

function Navbar({currentUser,logOut}) {

    const socket = useContext(SocketContext);


    const [searchInput, setSearchInput] = useState();
    const [avatar,setAvatar] = useState(null)



    useEffect(()=>{
        socket.emit("addUser",currentUser.id);
        ProfileService.getProfile(currentUser.id).then((response) => {
          setAvatar(response.data.avatar)
        })

    },[])


    const navigate = useNavigate();
    const handleKeyDown = async  (event) => {
        if (event.key === 'Enter') {
            if(!searchInput){
                alert("please fill in field!!")
            }
            else{
                navigate("/search/" + searchInput);
            }

    }
}
  return (

   
   <div className="topbar stick"
    style={{
      position: "fixed",
      top: "0px",
      width: "100%"
    }}
   >
        <div className="logo">
          <Link to={"/posts"}><img src="https://scontent.fdad2-1.fna.fbcdn.net/v/t1.15752-9/317636730_608631167735920_975038834038231370_n.png?stp=cp0_dst-png&_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=QNDdebCd7-MAX9k2HJ2&_nc_ht=scontent.fdad2-1.fna&oh=03_AdT_hDq8H2AkDSd0Eu6QT0JszTDwqB8igQm8piFOKgY_WQ&oe=63D4FEC9" alt="" /></Link>
        </div>
        
        <div className="top-area">
          <ul className="main-menu">

            <li>
              <Link to={"/"}>
                Newsfeed
              </Link>
            </li>
            <li>
              <Link to={"/groups"}>
                Groups
              </Link>
              
            </li>

            
          </ul>

          <ul className="setting-area">
            <li className="mt-2">
                <InputGroup>
               
                    <Form.Control 
                    placeholder="Search..." 
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}>
                        
                    </Form.Control>
                    <InputGroup.Text>
                <i className="fa fa-search"></i>
                </InputGroup.Text>
                </InputGroup>
              
            </li>
            <NotificationList currentUser = {currentUser} socket={socket}/>
            
				<li>
      
					
				</li>
				
			</ul>
       
                
                <div className="user-img dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={avatar} style={{width:"50px",height:"50px"}}className="rounded-circle" alt="" />
                <span className="status f-online"></span>
                </div>
                <div className="dropdown-menu">
                <Link to={"/profile/" + currentUser.id} className="dropdown-item">Profile</Link>
                <Link onClick={logOut} className="dropdown-item" >Log out</Link>

                {currentUser && currentUser.roles.includes("ROLE_ADMIN") 
                ?<Link to={"/admin/chart"} className="dropdown-item" >Admin page</Link>
                :<></>
                }
                </div>

        </div>
      </div>
     
      
    

  )
}
export default Navbar