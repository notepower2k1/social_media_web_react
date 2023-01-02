import { useEffect, useState } from "react";
import {Link } from "react-router-dom";
<<<<<<< HEAD
import FirebaseSerive from '../../services/firebaseService';
=======
import FirebaseService from '../../services/firebase.service';
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193

function CardUser({user}) {
    const [avatar,setAvatar] = useState()

    useEffect(() =>{
<<<<<<< HEAD
        FirebaseSerive.getAvatarFromFirebase(user.avatar).then((response) => {
=======
        FirebaseService.getAvatarFromFirebase(user.avatar).then((response) => {
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
            setAvatar(response)
        })
    },[])

    return (
    <>
        <figure>
        <img src={avatar} alt=""/>
        <span className="status f-online"></span>
    </figure>
    <div className="friendz-meta">
        <Link to={"/profile/" + user.user.id} >{user.firstName + " " + user.lastName}</Link>
    </div>
    </>
    )
}

export default CardUser