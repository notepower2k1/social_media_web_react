import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../../App.css";
import GroupService from "../../../services/group.service";


const GroupDataTable = () => {

  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  const setGroupData = async () => {
    await GroupService.readAllGroups().then((response) => {
      setGroups(response.data);
    }).catch(error => {
      alert("Error Ocurred while loading data:" + error);
    });
  }

  // Để load List Group, 2 cách gọi
  useEffect(() => {
    setGroupData();
    
    // axios.get("/api/group/all").then((response) => {
    //   setGroups(response.data);
    // }).catch(error => {
    //   alert("Error Ocurred while loading data:" + error);
    // });
  }, []);


  const removeGroup = async (id) => {

    if(window.confirm("Delete item ?")){
      await GroupService.deleteGroup(id).then((response) => {
        alert("User record " + id + " deleted!");
        setGroupData();
  
      }).catch(error => {
        alert("Error Ocurred in removeGroup:" + error);
      });
    }
    else{
      
    }
  }

  return (
      // Thêm className = "content-wrapper" vào tránh Navbar che chữ
    <div className="content-wrapper">
<div className="card-body" style={{textAlign:'center'}}>
      <br>
      </br>
      <nav>
        <button
          className="btn btn-primary nav-item active"
          onClick={() => navigate("/admin/group/create")}>
          Create New Group
        </button>
      </nav>


      <br></br>
      <div className="col-12">
        <h4 style={{textAlign: 'center'}}>Groups List</h4>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Group Name</th>
                    <th>About</th>
                    <th>Created Date</th>
                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody>

                  {
                    groups &&
                    groups.map((group, index) => (

                        <tr key={index}>
                        <th scope="row">{group.id}</th>
                        <td>{group.groupName}</td>
                        <td>{group.groupAbout}</td>
                        <td>{group.createdDate}</td>
                        <td>
                          <button  className='btn btn-primary w-100' onClick={()=> navigate("/admin/group/edit/" + group.id)}>
                             
                          <i className="fa fa-edit"></i>

                          </button>
                        </td>
                        <td>
                          <button className='btn btn-primary w-100'
                            onClick={() => removeGroup(group.id)}
                          > <i className="fa fa-trash"></i>

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
export default GroupDataTable;