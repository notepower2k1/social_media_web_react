import React ,{useState ,useEffect,useRef} from 'react'
import ProfileService from '../../services/ProfileService';
import {useParams} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import TextareaAutosize from 'react-textarea-autosize';
import PostService from '../../services/post.service';
import ListFriend from '../Friend/ListFriend.js';
import {storage} from '../../utils/firebaseConfig';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import AuthService from "../../services/auth.service";
import ButtonFriend from '../Friend/ButtonFriend';
import { Routes, Route, Link } from "react-router-dom";
import Post from "../Post/Post"
import UserService from "../../services/user.service";

function ProfileComponent() {

    const [isCurrentProfile,setIsCurrentProfile] = useState()
    const currentUser = AuthService.getCurrentUser();

    const [userProfileID,setUserProfileID] = useState(0)
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [gender,setGender] = useState(0)
    const [dob,setDob] = useState("")
    const [avatar,setAvatar] = useState(null)
    const [background,setBackground] = useState(null)
    const [about,setAbout] = useState("")
    const [locationID,setLocationID] = useState(0)
    const [userName,setUserName] = useState("")
    const {userID} = useParams();

    const [uploadAvatar,setUploadAvatar] = useState(null);
    const [uploadBackground,setUploadBackground] = useState(null);

    const [posts,setPosts] = useState([]);
    


    const OldImage = useRef(null);
    const OldBackground = useRef(null);


    useEffect(() => {
        ProfileService.getProfile(userID).then((response) => {
            setUserProfileID(response.data.userProfileID);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setAbout(response.data.about);
            setGender(response.data.gender);
            setDob(response.data.dateOfBirth);
            setLocationID(response.data.locationID);
            getImageFromFirebase(response.data.avatar,response.data.background)
            setUserName(response.data.user.username)
        })
        getUserPost()
        checkCurrentUserProfile()
    },[userID])

   const checkCurrentUserProfile = () => {
    if (currentUser.id == userID){
      setIsCurrentProfile(true)
    } else{
      setIsCurrentProfile(false)
    }
   }



    const getImageFromFirebase=(avatar,background)=>{
      const avatarRef = ref(storage,`avatarImages/${avatar}`);
      getDownloadURL(avatarRef).then((url) => {
        setAvatar(url)
      }).catch((error) => {
        // Handle any errors
      });
      OldImage.current = avatar;

      const backgroundRef = ref(storage,`backGroundImages/${background}`);
      getDownloadURL(backgroundRef).then((url) => {
        setBackground(url)
      }).catch((error) => {
        // Handle any errors
      });
      OldBackground.current = background
    }
    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      setUploadAvatar(null);
      setUploadBackground(null);
    }
    const handleShow = () => {
      setShow(true);

    }

    const [isReadonly, setIsReadonly] = useState(true);

    const handleUploadAvatar = (selectorFiles) => {
      if (selectorFiles) {
        setUploadAvatar(selectorFiles[0]);
      }
    };

    const handleUploadBackground = (selectorFiles) => {
      if (selectorFiles) {
        setUploadBackground(selectorFiles[0]);
      }
    };
    
    const handleUpdateProfile= ()=>{
        var avatar = "";
        var background = "";
        if(uploadAvatar===null){
          avatar = OldImage.current;
        }
        else{
        const avatarRef = ref(storage,`avatarImages/${uploadAvatar.name}`)
        uploadBytes(avatarRef,uploadAvatar)
        avatar = avatarRef.name
        }

        if(uploadBackground===null){
          background = OldBackground.current;

        }
        else{
        const backgroundRef = ref(storage,`backGroundImages/${uploadBackground.name}`)
        uploadBytes(backgroundRef,uploadBackground)
        background = backgroundRef.name;  
        }
        const updateDate = new Date().toISOString().slice(0, 10);;
        const dateOfBirth = dob;
          

      
        const profile = {userProfileID,firstName,lastName,gender,dateOfBirth,avatar,background,about,updateDate,locationID}

         
        ProfileService.updateProfile(userID,profile).then((res)=>{
            handleClose();
            getImageFromFirebase(avatar,background);
            alert("Update Sucess!")
          
        }).catch((err)=>{
            console.log(err)
        });
        
  }

  const getUserProfileByUser = async (user) => {
	return await UserService.readUserProfile(user);
	}

  const getUserPost = async () => {
	await PostService.getPostByUserID(userID)
		.then(res => {
			let allPosts = res.data;
			allPosts.forEach(post => {
				getUserProfileByUser(post.user)
				.then(profileRes => {
					let userProfile = profileRes.data;
					post.userProfile = userProfile;
					setPosts(prev => {
						if (prev.every(curPostValue => curPostValue.id !== post.id)) {
							return [...prev, post];
						} else {
							return [...prev];
						}
					});				
				});
			})
		})
		.catch(e => {
			console.log(e);
		});
}  

 

    const formRef = useRef([]);
    const handlerOpenComment = function(idx) {
      return function(e)
      {
        
        const currentForm = formRef.current[idx];
        if (currentForm) {
    
         
          if (currentForm.style.display === "none" || currentForm.style.display === "") {
            currentForm.style.display = "block";
          } else {
            currentForm.style.display = "none";
          }
        }
      };
    
    } 

  // const handleChange = () => {
  //   setChange(!change)
  // }
  return (
    <div>
  <section>
		<div className="feature-photo">
			<figure>
      <div className="rounded-top text-white d-flex flex-row" style={{backgroundImage:`url(${background})`, 
          backgroundRepeat: 'no-repeat', 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
            , height:"600px"}}>
              </div>
      </figure>
			<div className="add-btn">
      {!isCurrentProfile && <ButtonFriend 
              userID = {userID} 
              // handle = {handleChange()}
          />}
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
								<img src={avatar} alt=""/>
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
								  <h5>{firstName} {lastName}</h5>
								</li>
								<li>
									<Link className="active" title="" data-ripple="">time line</Link>
									<Link className=""  title="" data-ripple="">Photos</Link>
									<Link className=""  title="" data-ripple="">Videos</Link>
									<Link className=""  title="" data-ripple="">Friends</Link>
									<Link className=""  title="" data-ripple="">Groups</Link>
									<Link className=""  title="" data-ripple="">about</Link>
									<Link className=""  title="" data-ripple="">more</Link>
								</li>
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
							<div className="col-lg-3">
								<aside className="sidebar static">		
									<div className="widget">
										<h4 className="widget-title">Recent Activity</h4>
										<ul className="activitiez">
											<li>
												<div className="activity-meta">
													<i>10 hours Ago</i>
													<span><Link  title="">Commented on Video posted </Link></span>
													<h6>by <Link >black demon.</Link></h6>
												</div>
											</li>
											<li>
												<div className="activity-meta">
													<i>30 Days Ago</i>
													<span><Link  title="">Posted your status. “Hello guys, how are you?”</Link></span>
												</div>
											</li>
											<li>
												<div className="activity-meta">
													<i>2 Years Ago</i>
													<span><Link title="">Share a video on her timeline.</Link></span>
													<h6>"<Link >you are so funny mr.been.</Link>"</h6>
												</div>
											</li>
										</ul>
									</div>
									<div className="widget stick-widget">
										<h4 className="widget-title">Who's follownig</h4>
										<ul className="followers">
											<li>
												<figure><img src="images/resources/friend-avatar2.jpg" alt=""/></figure>
												<div className="friend-meta">
													<h4><Link title="">Kelly Bill</Link></h4>
													<Link  title="" className="underline">Add Friend</Link>
												</div>
											</li>
											<li>
												<figure><img src="images/resources/friend-avatar4.jpg" alt=""/></figure>
												<div className="friend-meta">
													<h4><Link  title="">Issabel</Link></h4>
													<Link  title="" className="underline">Add Friend</Link>
												</div>
											</li>
											<li>
												<figure><img src="images/resources/friend-avatar6.jpg" alt=""/></figure>
												<div className="friend-meta">
													<h4><Link  title="">Andrew</Link></h4>
													<Link  title="" className="underline">Add Friend</Link>
												</div>
											</li>
											<li>
												<figure><img src="images/resources/friend-avatar8.jpg" alt=""/></figure>
												<div className="friend-meta">
													<h4><Link  title="">Sophia</Link></h4>
													<Link  title="" className="underline">Add Friend</Link>
												</div>
											</li>
											<li>
												<figure><img src="images/resources/friend-avatar3.jpg" alt=""/></figure>
												<div className="friend-meta">
													<h4><Link  title="">Allen</Link></h4>
													<Link  title="" className="underline">Add Friend</Link>
												</div>
											</li>
										</ul>
									</div>
								</aside>
							</div>
							<div className="col-lg-6">
								<div className="loadMore">	
								<div className="central-meta item">
						
								{
									posts.map(
									(post) =>
                  <div key={post.id}>
                                      <Post data={post}/>

                  </div>
                  )}
									
								</div>
								</div>
							</div>
							<div className="col-lg-3">
								<aside className="sidebar static">						
									<div className="widget friend-list stick-widget">
										<h4 className="widget-title">Friends</h4>
										<ul id="people-list" className="friendz-list">
                    {userID && <ListFriend userID = {userID}/>}			
										</ul>
										
									</div>
								</aside>
							</div>
						</div>	
					</div>
				</div>
			</div>
		</div>	
	</section>



            <Modal
            size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa trang cá nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
           <div className="d-flex justify-content-between">
            <p>Tên</p>
           </div>    
           <div className="ms-3 mb-2 d-flex flex-column">
            <span  className="align-self-start">Họ và tên đệm</span>
            <input      
            name="lastName" 
            placeholder="Họ và tên đệm"      
            value = {lastName}
            onChange= {(e)=> setLastName(e.target.value)}
            >
          </input>                
             </div>
             <div className="ms-3 mb-2 d-flex flex-column">
             <span className="align-self-start">Tên cuối</span>
                 <input        
                 name="firstName" 
                 placeholder="Tên cuối"      
                 value = {firstName}
                 onChange= {(e)=> setFirstName(e.target.value)}
                 >
                </input>                
             </div>  
          
           </div>
           <div className="text-center mb-3">
            <div className="d-flex justify-content-between mb-5">
            <p>Ảnh đại diện </p>
            <input
        accept="image/png, image/jpeg"
        type="file"
        name="uploadAvatar"
        onChange={(e) => handleUploadAvatar(e.target.files)}
        className="btn btn-primary"
      />
           </div>      
           
           
           {!uploadAvatar 
            ? <img src={(avatar)}  alt="Avatar" className="rounded-circle shadow-4 img-thumbnail" style={{width: "150px"}}/>
            : <img src={URL.createObjectURL(uploadAvatar)}  alt="Avatar" className="rounded-circle shadow-4 img-thumbnail" style={{width: "150px"}}/>
        
      }
           </div>
           <div className="text-center mb-3">
           <div className="d-flex justify-content-between mb-5">
           <p>Ảnh nền </p>
           <input
        accept="image/png, image/jpeg"
        type="file"
        name="uploadBackground"
        onChange={(e) => handleUploadBackground(e.target.files)}
        className="btn btn-primary"
      />
           </div>    

           {!uploadBackground 
            ? <img src={(background)}  alt="Background" className="shadow-4 img-fluid" style={{height: "200px"}}/>
            : <img src={URL.createObjectURL(uploadBackground)}  alt="Background" className="shadow-4 img-fluid" style={{height: "200px"}}/>
           }
           </div>
           <div className="text-center mb-3">
           <div className="d-flex justify-content-between">
            <p>Giới thiệu </p>
            <button
            className="btn btn-primary"
                        onClick={()=>setIsReadonly(prevState => !prevState)}
                        ><i className="fa fa-edit"> Chỉnh sửa</i>
                     
                        </button>
           </div>    
           

           <div className="form-group mb-2">

                 <TextareaAutosize        
                 id="TextAreaResizeable"
                 name="about" 
                 placeholder="Viết bình luận công khai..."      
                 value = {about}
                 onChange= {(e)=> setAbout(e.target.value)}
                 readOnly ={isReadonly}
                 >
                </TextareaAutosize>                
             </div>
           </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={() => handleUpdateProfile()}>
          <i className="fa fa-edit"> Cập nhật</i>
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProfileComponent;
