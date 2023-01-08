import React from 'react';
import { Link ,useNavigate  } from "react-router-dom";

import AuthService from "./services/auth.service"
const AdminNavbar = () => {
  const user = AuthService.getCurrentUser()

    return (
        <>
             <div>
  {/* Main Sidebar Container */}
  <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{"height" : "100%"}}>
    {/* Brand Logo */}
    <a href="#" className="brand-link">
      {/* <img src="../public/admin_template/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} /> */}
      <span className="brand-text font-weight-light ">Dashboard</span>
    </a>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          {/* <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" /> */}
        </div>
        <div className="ms-2 mt-2" style={{border: 'none'}}>
          <a href="#" className="d-block">{user.username}</a>
        </div>
      </div>
      {/* SidebarSearch Form */}

      {/* <div className="form-inline">
        <div className="input-group" data-widget="sidebar-search">
          <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
          <div className="input-group-append">
            <button className="btn btn-sidebar">
              <i className="fas fa-search fa-fw" />
            </button>
          </div>
        </div>
      </div> */}
      
      {/* Sidebar Menu */}
      <nav className="mt-2"  style={{border : 'none'}}>
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
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

              {/* <li className="nav-item">
                <a href="/admin/user/read" className="nav-link">
                <i className="nav-icon fa fa-user"></i>
                  <p style={{color:'white'}}>
                    User
                  </p>
                </a>
              </li> */}

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

            </ul>
          </li>
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
</div>
        </>
    )
}

export default AdminNavbar;