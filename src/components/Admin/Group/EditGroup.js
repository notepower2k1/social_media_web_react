import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import GroupService from "../../../services/group.service";

const GroupForm = () => {
// Gán Url luôn thì bị lỗi: has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
//  const editURL = "http://localhost:8080/api/user/";
  const navigate = useNavigate();
  const param = useParams();
  const [groupID, setGroupID] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupAbout, setGroupAbout] = useState('');
  const [createdDate, setCreatedDate] = useState('');

  useEffect(() => {

    GroupService.readGroupById(param.id).then((response) => {
      const group = response.data;
      setGroupID(group.id);
      setGroupName(group.groupName);
      setGroupAbout(group.groupAbout)
      setCreatedDate(group.createdDate);
  
    }).catch(error => {
      alert("Error Ocurred getting group detail:"+ error);
    });
  }, [param.id]);
  
    // const groupIDChangeHandler = (event) => {
    //   setGroupID(event.target.value);
    // };

    const groupNameChangeHandler = (event) => {
      setGroupName(event.target.value);
    };

    const groupAboutChangeHandler = (event) => {
      setGroupAbout(event.target.value);
    };


    const submitActionHandler = (event) => {
      event.preventDefault();

      GroupService.updateGroup({groupName: groupName, groupAbout: groupAbout},groupID)
        .then((response) => {
          alert("Group "+ groupID +" updated!");
          navigate('/admin/group/read')
  
        }).catch(error => {
          const resMessage =
						(error.response &&
						error.response.data &&
						error.response.data.message) ||
						error.message ||
						error.toString();
          alert(resMessage);
        });
   
    };
  
      return(
            // Thêm className = "content-wrapper" vào tránh Navbar che chữ
    <div className="content-wrapper">
     <Alert variant='primary'>
        <Container>
        <Form onSubmit={submitActionHandler}>
         <Form.Group  controlId="form.GroupName">
            <Form.Label>Group Name</Form.Label>
            <Form.Control type="text" value={groupName} onChange={groupNameChangeHandler} placeholder="Enter Group Name" required/>
        </Form.Group>
        <Form.Group  controlId="form.GroupAbout">
            <Form.Label>About</Form.Label>
            <Form.Control type="text" value={groupAbout} onChange={groupAboutChangeHandler} placeholder="Enter Group About" required/>
        </Form.Group>
        <Form.Group  controlId="form.CreatedDate">
            <Form.Label>Created Date</Form.Label>
            <Form.Control type="date" value={createdDate} disabled/>
        </Form.Group>
        <br></br>
        <Button type='submit'>Update Group</Button>
        &nbsp;&nbsp;&nbsp;
        <Button onClick={()=>navigate("/admin/group/read")}>Cancel</Button>
      </Form>
      </Container>
      </Alert>
    </div>
   
  
      );
  }
  export default GroupForm;