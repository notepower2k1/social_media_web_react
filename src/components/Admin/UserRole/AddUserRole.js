import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import UserRoleService from "../../../services/userRole.service";
import UserService from "../../../services/user.service";

const UserRoleForm = () => {
// Gán Url luôn thì bị lỗi: has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
  const navigate = useNavigate();

  const [enteredUserID, setUserID] = useState('');
  const [enteredRoleID, setRoleID] = useState('');
  const [userList, setUserList] = useState([]);
  const [roleList, setRoleList] = useState([]);


  
  useEffect(() => {

    UserRoleService.getAllRole().then((res)=>{
      setRoleList(res.data)

    }).catch(error => {
      alert("Error Ocurred getting user detail:"+ error);
     }); 

     UserService.getAllUsers().then((res)=>{
      setUserList(res.data)

    }).catch(error => {
      alert("Error Ocurred getting user detail:"+ error);
     }); 

  },[]
);


  const submitActionHandler = async (event) => {

    console.log(enteredUserID,enteredRoleID)
    event.preventDefault();
    await UserRoleService.createUserRole(enteredUserID, enteredRoleID)
      .then((res) => {
        // console.log(res.data);
        // console.log(enteredUserID, enteredRoleID);
        // alert("Create Success");
        navigate('/admin/user-role/read');
      }).catch(err => {
        alert("error==="+err);
      });

  };


    return(
        // Thêm className = "content-wrapper" vào tránh Navbar che chữ
        <div className="content-wrapper">
          <Alert variant='primary'>
                <Container>
                <Form id="data" style={{'text-align':'center'}}>
                <Form.Group>
                <Form.Label className='mr-2'>Username</Form.Label>
                <select value={enteredUserID} onChange={(e) => setUserID(e.target.value)}>
                          {userList && userList.map( 
                            (item) =>
                            
                            <option value={item.id}> {item.username}</option>
                          )
                          }
                        
                  </select>
                  <br></br><br></br>
                  <Form.Label className='mr-2'>Role</Form.Label>
                  <select value={enteredRoleID} onChange={(e) => setRoleID(e.target.value)}>
                          {roleList && roleList.map( 
                            (item) =>
                            
                            <option value={item.id}> {item.name}</option>
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
export default UserRoleForm;