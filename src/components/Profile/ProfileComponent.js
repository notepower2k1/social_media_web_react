import React ,{useState ,useEffect,useRef} from 'react'
import ProfileService from '../../services/profile.service';
import {useParams} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import TextareaAutosize from 'react-textarea-autosize';
import PostService from '../../services/post.service';
import ListFriend from '../Friend/ListFriend.js';
import {storage} from '../../utils/firebaseConfig';
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import AuthService from "../../services/auth.service";
import ButtonFriend from '../Friend/ButtonFriend';
import { Link } from "react-router-dom";
import Post from "../Post/Post"
import FriendService from '../../services/friend.service';
import CardUser from '../Friend/CardUser';
import PostModal from "../Post/PostModal";

function ProfileComponent() {

    const [isCurrentProfile,setIsCurrentProfile] = useState()
    const currentUser = AuthService.getCurrentUser();

    //0:timeline, 1:listFriend
    const [stateSwitch,setStateSwitch] = useState(0)


    const [userProfileID,setUserProfileID] = useState(0)
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [gender,setGender] = useState(0)
    const [dob,setDob] = useState("")
    const [avatar,setAvatar] = useState(null)
    const [background,setBackground] = useState(null)
    const [about,setAbout] = useState("")
    const [locationID,setLocationID] = useState(0)
    const {userID} = useParams();

    const [uploadAvatar,setUploadAvatar] = useState(null);
    const [uploadBackground,setUploadBackground] = useState(null);

    const [posts,setPosts] = useState([]);
    const [reload, setReload] = useState(false);

    const [renderValue,setRenderValue] = useState(0)

    const [selectedPost, setSelectedPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isShowed, setIsShowed] = useState(false);

    const [isGroupPost, setIsGroupPost] = useState(false);

    const handleRender = ()=>{
      setRenderValue(c=>c+1);
    }

    const OldImage = useRef(null);
    const OldBackground = useRef(null);


    const [listFriend,setListFriend] = useState([]);

    useEffect(() => {
        ProfileService.getProfile(userID).then((response) => {
            setUserProfileID(response.data.userProfileID);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setAbout(response.data.about);
            setGender(response.data.gender);
            setDob(response.data.dateOfBirth);
            setLocationID(response.data.locationID);
			setAvatar(response.data.avatar);
			setBackground(response.data.background);
            setStateSwitch(0);
            setPosts([]);

			OldImage.current = response.data.avatar
			OldBackground.current = response.data.background
        });
        FriendService.getListFriend(userID).then(res => setListFriend(res.data))

        checkCurrentUserProfile()

        getAllPosts()

    },[userID])

	const checkCurrentUserProfile = () => {
		if (currentUser.id == userID){
			setIsCurrentProfile(true)
		} else {
			setIsCurrentProfile(false)
		}
	}
	
    const [show, setShow] = useState(false);

    const handleClose = () => {
		setShow(false);
		setUploadAvatar(null);
		setUploadBackground(null);
    }
   
    const handleShow = (e) => {
		e.preventDefault();
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
	}
	
    const handleUpdateProfile= async ()=>{
		var avatar = "";
        var background = "";

		if(uploadAvatar===null){
			avatar = OldImage.current;

		  }

		else{
			const avatarRef = ref(storage,`avatarImages/${uploadAvatar.name}`)
			uploadBytesResumable(avatarRef, uploadAvatar)
				.then(() =>{
					getDownloadURL(avatarRef)
						.then(url => {
							setAvatar(url);

						});
				});
			avatar = await getDownloadURL(avatarRef).then(url => {
				return url
			})
		}
	
	
		if(uploadBackground===null){
			background = OldBackground.current;

		}
		else{
			const backgroundRef = ref(storage,`backGroundImages/${uploadBackground.name}`);
			uploadBytesResumable(backgroundRef, uploadBackground)
			.then(() =>{
				getDownloadURL(backgroundRef)
				.then(url => {
					setBackground(url);

				});
			});
			background = await getDownloadURL(backgroundRef).then(url => {
				return url
			})
		}
		
			

		
		
		

        const updateDate = new Date().toISOString().slice(0, 10);;
        const dateOfBirth = dob;
          
        const profile = {userProfileID,firstName,lastName,gender,dateOfBirth,avatar,background,about,updateDate,locationID}

        ProfileService.updateProfile(userID,profile)
			.then((res)=>{
				handleClose();
				alert("Update Sucess!")
			}).catch((err)=>{
				console.log(err)
			});
  	}

    useEffect(() => {
        getAllPosts();

        return () => {
            setPosts([]);
        }
    }, [reload]);

    const getAllPosts = async () => {
        setLoading(true);
        setIsGroupPost(false);
        await PostService.getPostByUserID(userID)
			.then(res => {
				let allPosts = res.data;              
        		setPosts(allPosts);
            })
            .catch(e => {
                console.log(e);
            });
        setLoading(false);
    }  

    const showModal = () => {
        setIsShowed(true);
    }

    const hideModal = () => {
        setIsShowed(false);
    }

	return (
		<div>
			<section>
				<div className="feature-photo">
					<figure>
						<div className="rounded-top text-white d-flex flex-row" style={{backgroundImage:`url(${background})`, 
							backgroundRepeat: 'no-repeat', 
							backgroundSize: 'cover',
							backgroundPosition: 'center'
							, height:"600px"}}
						>
						</div>
					</figure>
					<div className="add-btn">
						{
							!isCurrentProfile && <ButtonFriend userID = {userID} />
						} 
					</div>
						{
						currentUser.id === userID
						?
							<form className="edit-phto">
								<i className="fa fa-camera-retro"></i>
								<label className="fileContainer">
									Edit Cover Photo
									<input type="file" onClick={(e) => handleShow(e)}/>
								</label>
							</form>
						: 	<></>
						}
						<div className="container-fluid">
							<div className="row merged">
								<div className="col-lg-2 col-sm-3">
									<div className="user-avatar">
										<figure>
											<img src={avatar} alt="" width="155px" height="152px"/>
											{
												currentUser.id == userID 
												?
													<form className="edit-phto">
														<i className="fa fa-camera-retro"></i>
														<label className="fileContainer">
															Edit Display Photo
															<input type="file" onClick={(e) => handleShow(e)}/>
														</label>
													</form>
												:	<></>
											}
										</figure>
									</div>
								</div>
								<div className="col-lg-10 col-sm-9">
									<div className="timeline-info">
										<ul>
											<li className="admin-name">
											<h5>{firstName} {lastName}</h5>
											</li>
											<li style={{marginRight: "150px"}}>
												<Link className="" onClick={() => setStateSwitch(0)}>Time Line</Link>
												{isCurrentProfile && <Link className=""  onClick={() => setStateSwitch(1)}>Friends</Link>}
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
												<h4 className="widget-title">About me</h4>
												<p align="center">{about}</p>
											</div>
										</aside>
									</div>
									<div className="col-lg-6">
										<div className="loadMore">	
											{ 
												stateSwitch === 0 
												?
													<div className="central-meta item">
														{ 
															isShowed 
															? 	<PostModal 
																	handleClose={ hideModal } 
																	oldData={ selectedPost }
																	isGroupPost = {isGroupPost}
																/> : '' 
														}
														{
															posts === undefined || posts.length === 0  || loading
															?  	<div></div>
															: 	posts.map((post, index) => (
																<div className="central-meta item" key={index}>
																	<Post data={post}  handleRender={ handleRender }
																		selected={ setSelectedPost }
																		onShowModal={ showModal }
																		callBack={ setReload }
																	/>
																</div>
															))
														}
													</div>
												: 	<ListFriend userCurrentID = {currentUser.id}/>
											}
										</div>
									</div>
									<div className="col-lg-3">
										<aside className="sidebar static">						
											<div className="widget friend-list stick-widget">
												<h4 className="widget-title">Friends</h4>
												<ul id="people-list" className="friendz-list">
													{
														listFriend.map((user,index) => (
															<div key={index}>
																<CardUser  user = {user}/>
															</div>
														))
													}	
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
						{
							!uploadAvatar 
							? 	<img src={avatar}  alt="Avatar" className="rounded-circle shadow-4 img-thumbnail" style={{width: "150px"}}/>
							: 	<img src={URL.createObjectURL(uploadAvatar)}  alt="Avatar" className="rounded-circle shadow-4 img-thumbnail" style={{width: "150px"}}/>
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
						{
							!uploadBackground 
							? 	<img src={(background)}  alt="Background" className="shadow-4 img-fluid" style={{height: "200px"}}/>
							: 	<img src={URL.createObjectURL(uploadBackground)}  alt="Background" className="shadow-4 img-fluid" style={{height: "200px"}}/> 
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