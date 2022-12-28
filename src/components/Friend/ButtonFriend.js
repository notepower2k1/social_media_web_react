import React ,{useState ,useEffect,useRef} from 'react'
import AuthService from "../../services/auth.service";
import FriendService from "../../services/FriendService"



function ButtonFriend(props){

    // -------------
    const [isFriend,setIsFriend] = useState()
    const [isRequesting, setIsRequesting] = useState()
    const [isRequester, setIsRequester] = useState()
    const [change,setChange] = useState()
    const currentUser = AuthService.getCurrentUser();

    useEffect(() =>{
        FriendService.checkIsFriend(currentUser.id,props.userID).then(res => 
          {
            setIsFriend(res)
          }
        )
        FriendService.checkIsRequesting(currentUser.id,props.userID).then(res => 
          {
            setIsRequesting(res)
          }
        )
        FriendService.checkIsRequester(currentUser.id,props.userID).then(res => 
          {
            setIsRequester(res)
          }
        )
    },[props.userID,change])

    const handleAddRequest = () => {
      FriendService.addRequest(currentUser.id,props.userID).then(res => setChange(!change))
    }

    const handleRemoveFriendShip = () => {
      FriendService.removeFriendShip(currentUser.id,props.userID).then(res => 
        {
          setChange(!change)
        }
      )
      props.handle()
    }

    const handleAcceptRequest = () => {
      FriendService.acceptRequest(currentUser.id,props.userID).then(res => 
        {
          setChange(!change)
        }
      )
      
    }

    if (isFriend){
      return (
        <div className="button_friend">
          <button 
                className="btn btn-danger col-3"
                onClick={handleRemoveFriendShip}
          >Hủy kết bạn</button>
        </div>
      )
    } else if (isRequesting) {
      return (
          <div className="button_friend">
            <button 
                className="btn btn-secondary col-3"
                onClick={handleRemoveFriendShip}
              >Hủy yêu cầu</button>
          </div>
      )
          } else if (isRequester) {
            return (
              <div className="button_friend">
                <button 
                    className="btn btn-primary col-3"
                    onClick={handleAcceptRequest}
                >Chấp nhận lời mời</button>
              </div>
            )
                } else{
                  return (
                    <div className="button_friend">
                      <button 
                          className="btn btn-info col-3"
                          onClick={handleAddRequest}
                      >Kết bạn</button>
                    </div>
                  )
                }
    
}
export default ButtonFriend
