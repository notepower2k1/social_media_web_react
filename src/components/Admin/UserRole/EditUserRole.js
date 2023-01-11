import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import UserRoleService from "../../../services/userRole.service";

const UserForm = () => {
// Gán Url luôn thì bị lỗi: has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
//  const editURL = "http://localhost:8080/api/user/";
  const navigate = useNavigate();
  // Lấy UserID với RoleID khi nhấn vào Button Edit ở trang User Role Table
  const {userID} = useParams();
  const {roleID} = useParams();

  const [user_name, setUserName] = useState([]);
  const [role_ID, setRoleID] = useState(0);

  const [roleList, setRoleList] = useState([]);
  const [isSelectedRole, setSelectedRole] = useState(false);



 
  useEffect(() => {

      UserRoleService.getAllRole().then((res)=>{
        setRoleList(res.data)

      }).catch(error => {
        alert("Error Ocurred getting user detail:"+ error);
       }); 

      UserRoleService.getUserRoleByID(userID, roleID).then((response) => {
      // Truyền List nên phải userRole[0]
      setUserName(response.data.user.username);
      setRoleID(response.data.role.id);  
    }).catch(error => {
     alert("Error Ocurred getting user detail:"+ error);
    }); 

  },[]);
    
  

   

    const submitActionHandler = async (event) => {
      event.preventDefault();
      console.log(userID,roleID,role_ID)
      await UserRoleService.updateUserRole(userID, roleID,role_ID)
        .then((response) => {  
          navigate('/admin/user-role/read')
        })
        .catch(error => {
          alert("Error Ocurred Updating User Role:"+ error);
        });
  
    };
  
    const handleSelecRole = (e) => {
      if(!isSelectedRole){
        setSelectedRole(true)
      }
  
      setRoleID(e.target.value)
    }
    
      return(
        // Thêm className = "content-wrapper" vào tránh Navbar che chữ
      <div className="content-wrapper">
        <Alert variant='primary'>
              <Container>
              <Form id="data" style={{textAlign:'center'}}>
              <Form.Group>
                  <Form.Label className='mr-1'>Username</Form.Label>
                  <input type="text" name="user_ID" value={user_name} placeholder="Enter UserID" disabled/>
              </Form.Group>
              <br></br>
              <Form.Group >
              <Form.Label className='mr-3'>Role</Form.Label>
              <select value={role_ID} 
              onClick={(e) => handleSelecRole(e)}
              onChange={(e) => setRoleID(e.target.value)}>
                      {!isSelectedRole
                          ?<option>Select role</option>
                          :roleList && roleList.map( 
                        (item,index) =>
                        
                        <option key={index} value={item.id}> {item.name}</option>
                      )
                      }
                    
              </select>
              </Form.Group>
              <br></br>
              &nbsp;&nbsp;&nbsp;
              <Button className="mr-2"type='submit' onClick={(e)=>submitActionHandler(e)}>Submit</Button>
              <Button onClick={()=> navigate('/admin/user-role/read')}>Cancel</Button>

            </Form>

            </Container>
        </Alert>
    </div>
        

      );
  }
  export default UserForm;