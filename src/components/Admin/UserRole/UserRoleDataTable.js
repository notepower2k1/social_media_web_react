import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "../../../App.css";

// import detailLogo from '../../../images/details.png';


import UserRoleService from "../../../services/userRole.service";

const UserRoleDataTable = () => {

  const navigate = useNavigate();
  const [userRole, setUserRole] = useState([]);

  

  const setUserRoleData = async () => {
    await UserRoleService.readAllUserRole()
    .then(res => {
        setUserRole(res.data);
    })
    .catch(err => {
        console.log(err);
    })
  }

  const removeUserRole = async (userID, roleID) => {

    if(window.confirm("Delete item ?")){
      await UserRoleService.deleteUserRole(userID, roleID)
      .then(res => {
          setUserRoleData();
          alert("Delete Success");
          // navigate("/user-role/read");
      })
      .catch(err => {
        
        alert("Error Ocurred in removeUserRole:" + err);
      });
    }
    else{

    }
  }
  
  useEffect(() => {
    setUserRoleData();
  }, []);
  

 

  return (
    // Thêm className = "content-wrapper" vào tránh Navbar che chữ
    <div className="content-wrapper">
      <div className="card-body" style={{textAlign:'center'}}>
        <br>
        </br>
        <nav>
          <button
            className="btn btn-primary nav-item active"
            onClick={() => navigate("/admin/user-role/create")}>
            Create New User Role
          </button>
        </nav>


        <br></br>
        <div className="col-12">
          <h4 style={{textAlign:'center'}}>User Role List</h4>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      {/* <th>ID</th> */}
                      <th>User</th>
                      <th>Role</th>

                    </tr>
                  </thead>
                  <tbody>

                    {
                      userRole &&
                      userRole.map((userRoles,index) => (

                        <tr key={index}>
                          {/* <th scope="row">{index}</th> */}
                          <td>{userRoles.user.username}</td>
                          <td>{userRoles.role.name}</td>
                          <td>
                            <button className='btn btn-primary w-100' onClick={() => navigate("/admin/user-role/edit/" + userRoles.user.id + "/" + userRoles.role.id)}>
                               
                                  <i className="fa fa-edit"></i>
                               
                            </button>
                            
                          </td>
                          <td>
                            <button className='btn btn-primary  w-100'
                              onClick={() => removeUserRole(userRoles.user.id, userRoles.role.id)}
                            >                                   <i className="fa fa-trash"></i>

                            </button>

                          </td>
                        </tr>

                      ))
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

    </div>
    </div>
    

  );
}
export default UserRoleDataTable;