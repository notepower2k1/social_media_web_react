import React ,{useState ,useEffect,useRef} from 'react'
import AuthService from "../../services/auth.service";
import FriendService from "../../services/FriendService"



function ButtonFriend(props){

    // -------------
    const [listFriendCurrentUser,setListFriendCurrentUser] = useState()
    const [isFriend,setIsFriend] = useState(true)
    const currentUser = AuthService.getCurrentUser();
    useEffect(() =>{
        FriendService.getListFriend(currentUser.id).then(res => setListFriendCurrentUser(res.data))
        checkIsFriend()
    })

    const checkIsFriend = () => {
        if (listFriendCurrentUser){
          let isFr = false
          listFriendCurrentUser.map((userProfile) => {
            if (userProfile.user.id == props.userID){
              isFr = true
            }
          })
          if (isFr){
            setIsFriend(true)
          } else{
            setIsFriend(false)
          }
        }
      }
    // const [isCurrentProfile,setIsCurrentProfile] = useState()

    return <div className="button_friend mr-2">
            {isFriend ?
              <button className="btn btn-danger">Hủy kết bạn</button> 
            : <button className="btn btn-info">Kết bạn</button>}
          </div>
}
export default ButtonFriend