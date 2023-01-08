import React, { useEffect, useState } from 'react';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js';
// eslint-disable-next-line no-unused-vars
import "../../../App.css";
import UserService from "../../../services/user.service";
import PostService from "../../../services/post.service";
import GroupService from "../../../services/group.service";
import LocationService from "../../../services/location.service";
// Import hết luôn tránh bị lỗi lúc chuyển Chart
import "chart.js/auto";
import PostChart from './PostChart';
import UserChart from './UserChart';
import CommentChart from './CommentChart';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const Chart = () => {

    // Để phân biệt các Chart tránh đè dữ liệu lên nhau

    const [users, setUsers] = useState([]);


    const [posts, setPosts] = useState([]);
 
   
    const [groups, setGroups] = useState([]);

    const [locations, setLocations] = useState([]);

    const fetchUser = async () => {
      await UserService.getAllUsers().then(response => {
          // console.log(response.data)
          setUsers(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

  
    const fetchPost = async () => {
      await PostService.readAllPosts().then(response => {
          // console.log(response.data)
          setPosts(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchGroup = async () => {
      await GroupService.readAllGroups().then(response => {
          // console.log(response.data)
          setGroups(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchLocation = async () => {
      await LocationService.getAllProvinces().then(response => {
          // console.log(response.data)
          setLocations(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };
  
    useEffect(() => {
      fetchUser()
      fetchPost()
      fetchGroup()
      fetchLocation()


    }, []);
  // First Chart
  



  return (
   // Thêm className = "content-wrapper" vào tránh Navbar che chữ
   <div className="content-wrapper">
      <div>
        <div className="container-fluid">
               {/* Small boxes (Stat box) */}
        <div className="row">
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
                <h3>{users.length}</h3>
                <p style={{color: 'white'}}>User Registrations</p>
              </div>
            
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
              <div className="inner">
                <h3>{posts.length}<sup style={{fontSize: 20}}></sup></h3>
                <p style={{color: 'white'}}>Posts Published</p>
              </div>
            
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h3 style={{color: 'white'}}>{groups.length}</h3>
                <p style={{color: 'white'}}>Total Group</p>
              </div>
            
            </div>
            
          </div>
          <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
              <div className="inner">
                <h3 style={{color: 'white'}}>{locations.length}</h3>

                <p style={{color: 'white'}}>Total Province</p>
              </div>
             
            </div>
          </div>
          {/* ./col */}
        </div>
 
        <PostChart />
      
        <UserChart />

        <CommentChart />

      </div>
      
      
      </div>
    
    </div>

    
  )
}

export default Chart