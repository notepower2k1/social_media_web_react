import React from 'react';
import { Link   } from "react-router-dom";

import AuthService from "../services/auth.service"
const AdminNavbar = () => {
  const user = AuthService.getCurrentUser()
  
  console.log(user)
    return (
        <>
             <div>
  <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{"height" : "100%"}}>
    <Link  className="brand-link">
      <span className="brand-text font-weight-light ">Dashboard</span>
    </Link>
    <div className="sidebar">
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
        </div>
        <div className="ms-2 mt-2" style={{border: 'none'}}>
          { user && <Link to={"/profile/"+user.id} className="d-block">ADMIN:{user.username}</Link>}
        </div>
      </div>
   
      <nav className="mt-2"  style={{border : 'none'}}>
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
     
          <li className="nav-item menu-open">
            <ul className="nav nav-treeview" >

              <li className="nav-item">
                <a href="/admin/chart" className="nav-link">
                <i className="nav-icon fa fa-bar-chart"></i>
                  <p style={{color:'white'}}>
                    Statitics
                  </p>
                </a>
              </li>

        
              <li className="nav-item">
                <a href="/admin/user-role/read" className="nav-link">
                <i className="nav-icon fas fa-user-lock"></i>
                  <p style={{color:'white'}}>
                    Authorization
                  </p>
                </a>
              </li>

              <li className="nav-item">
                <a href="/admin/group/read" className="nav-link">
                <i className="nav-icon fa fa-group"></i>
                  <p style={{color:'white'}}>
                    Group
                  </p>
                </a>
              </li>


              <li className="nav-item">
                <a href="/" className="nav-link">
                <i className="nav-icon fa fa-home"></i>
                  <p style={{color:'white'}}>
                    Home
                  </p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</div>
        </>
    )
}

export default AdminNavbar;