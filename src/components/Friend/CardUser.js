import { useEffect, useState } from "react";
import {Form,Card,Button,Row,Col } from 'react-bootstrap'
import FriendService from "../../services/FriendService"
import {storage} from '../../utils/firebaseConfig';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import {Link } from "react-router-dom";

function CardUser({user}) {
    const [avatar,setAvatar] = useState()

    useEffect(() =>{
        const avatarRef = ref(storage,`avatarImages/${user.avatar}`);
        getDownloadURL(avatarRef).then(url => setAvatar(url))
    },[])

    return (
        <Card  style={{ width: '15rem',marginTop: '20px' }}>                           
            <Card.Body >
            <img src={avatar}  alt="Avatar" className="rounded-circle avatar shadow-4 img-thumbnail" style={{width: "150px"}}/>
            <Link to={"/profile/" + user.user.id}> 
                <Card.Title>{user.firstName + " " + user.lastName}</Card.Title>
            </Link>           
                <Card.Text>{"User ID: " + user.user.id}</Card.Text>
            </Card.Body>
    </Card>)
}

export default CardUser