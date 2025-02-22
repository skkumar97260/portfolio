import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../utils/Auth';
import { clearStorage, getAdminId } from '../utils/Storage';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import { getsingleAdmin } from '../api/admin';
import { useTheme, useMediaQuery } from '@mui/material';
import '../App.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated(false));
  const [user, setUser] = useState(null); // Initialize user state with null or default value
  const id = getAdminId();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearStorage();
    setIsLoggedIn(false);
    toast.success('You have logged out successfully.');
    navigate('/');
  };

  const getsingleadmin = useCallback(() => {
    if (id) {
      getsingleAdmin(id)
        .then((res) => {
          setUser(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  useEffect(() => {
    getsingleadmin();
  }, [getsingleadmin]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));



  return (
    <div className="container header-container text-white  p-1  " >
      {isSmallScreen ? (
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center ">

            <div className="col-12">
              <div className="d-flex align-items-center justify-content-end">
                {isLoggedIn ? (
                  <><div className="col-6 ">
                    <Button className="navbar-toggler  bg-light d-lg-none" onClick={toggleDrawer(true)}>
                      {drawerOpen ? <FaTimes /> : <FaBars />}
                    </Button>
                    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                      <List>
                        <ListItem>
                          <ListItemText>
                            <List component="nav" aria-labelledby="main navigation" >
                              <ListItem>

                                <Link to="/intro" className="text-decoration-none text-black heading_header">Intro</Link>
                              </ListItem>
                              <ListItem>

                                <Link to="/about" className="text-decoration-none text-black heading_header">About</Link>

                              </ListItem>

                              <ListItem>

                                <Link to="/projects" className="text-decoration-none text-black heading_header">Projects</Link>

                              </ListItem>
                              <ListItem>

                                <Link to="/experience" className="text-decoration-none text-black heading_header">Experience</Link>

                              </ListItem>

                              <ListItem>

                                <Link to='/certification' className="text-decoration-none text-black heading_header">Certification</Link>

                              </ListItem>
                              <ListItem>

                                <Link to='/education' className="text-decoration-none text-black heading_header">Education</Link>

                              </ListItem>

                              <ListItem>

                                <Link to='/contact' className="text-decoration-none text-black heading_header">Contact</Link>

                              </ListItem>
                              <ListItem>

                                <Link to='/contactme' className="text-decoration-none text-black heading_header">Contact Details</Link>

                              </ListItem>
                            </List>
                          </ListItemText>
                        </ListItem>
                      </List>
                    </Drawer>
                  </div><div className="col-6 d-flex justify-content-end">
                      <div className="nav-item dropdown">
                        <div className="dropdown">
                          <button
                            className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <FaUser />
                            {user?.name}
                          </button>
                          <ul className="dropdown-menu dropdown-menu-start" aria-labelledby="dropdownMenuButton">
                            <li>
                              <div className="d-flex justify-content-center">

                                <FaUser /> My Profile

                              </div>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <button className="dropdown-item d-flex justify-content-start ms-3" onClick={handleLogout}>
                                Logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div></>
                ) : (
                  <>
                    <div className="col-6 ">
                      <div className='  d-flex justify-content-start align-items-center text-center  '>
                        <h6 className='d-flex gap-2'>  <div>FullStack</div> <div className="text-warning">Developer</div></h6>
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                      <div className="nav-item p-2">

                        <Link to="/login" className="text-decoration-none">
                          <button type="button" className="btn-style btn btn-danger">
                            Login
                          </button>
                        </Link>
                      </div>
                      {/* <div className="nav-item mx-1 p-2">
                        <Link to="/signup" className="text-decoration-none">
                          <button type="button" className="btn-style btn btn-success">
                            SignUp
                          </button>
                        </Link>
                      </div> */}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (

        <div className="container-fluid">
          <div className="row">

            <div className="col-lg-12 col-md-12">

              <div className="d-flex align-items-center justify-content-end">

                {isLoggedIn ? ( // Check if user is logged in
                  <><div className="col-lg-6 col-md-6 d-flex justify-content-center align-items-center">

                    {/* <div className='  d-flex justify-content-start align-items-center text-center bg-light p-1   '>
                      <h6 className='d-flex gap-2'>  <div className='text-primary'>FullStack</div> <div className="text-warning">Developer</div></h6>
                    </div> */}

                    <div className="col-lg-2 col-md-3 d-flex justify-content-center align-items-center">

                      <Link to="/intro" className="text-decoration-none text-white heading_header">Intro</Link>

                    </div>
                    <div className="col-lg-2 col-md-3 d-flex justify-content-center align-items-center">

                      <Link to="/about" className="text-decoration-none text-white heading_header">About</Link>

                    </div>


                    <div className="col-lg-2 col-md-3 d-flex justify-content-center align-items-center">

                      <Link to="/projects" className="text-decoration-none text-white heading_header">Projects</Link>

                    </div>
                    <div className="col-lg-2 col-md-3 d-flex justify-content-center align-items-center">

                      <Link to="/experience" className="text-decoration-none text-white heading_header">Experience</Link>

                    </div>
                    <div className="col-lg-2 col-md-3 d-flex justify-content-center align-items-center">
                      <Link to='/certification' className="text-decoration-none text-white heading_header">Certification</Link>
                    </div>

                    <div className="col-lg-2 col-md-3 d-flex justify-content-center align-items-center bg-none">
                      <div className="nav-item dropdown">
                        <div className="dropdown">
                          <div
                            className="dropdown-toggle d-flex align-items-center gap-2"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <Link to='/contact' className="text-decoration-none text-white heading_header">Contact</Link>
                          </div>
                          <ul
                            className="dropdown-menu dropdown-menu-start"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li>
                              <div className='d-flex justify-content-center'>
                                <Link to='/contactme' className="text-decoration-none text-black heading_header">Details</Link>
                              </div>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <div className='d-flex justify-content-center'>
                                <Link to='/contact' className="text-decoration-none text-black heading_header">Contact</Link>
                              </div>

                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <div className='d-flex justify-content-center'>
                                <Link to='/education' className="text-decoration-none text-black heading_header">Education</Link>
                              </div>

                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div><div className="col-lg-6 col-md-6 d-flex justify-content-end">
                      <div className="nav-item dropdown">
                        <div className="dropdown">
                          <button
                            className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <FaUser />
                            {user?.name}
                          </button>
                          <ul
                            className="dropdown-menu dropdown-menu-start"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li className=''>
                              <div className='d-flex justify-content-center'>

                                <FaUser /> My Profile

                              </div>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <button className="dropdown-item d-flex justify-content-start ms-3" onClick={handleLogout}>
                                Logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div></>
                ) : (
                  <>
                    <div className="col-lg-6 col-md-6 ">
                      <div className='  d-flex justify-content-start align-items-center text-center  '>
                        <h6 className='d-flex gap-2'>  <div>FullStack</div> <div className="text-warning">Developer</div></h6>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 d-flex justify-content-end">
                      <div className="nav-item p-2">

                        <Link to="/login" className="text-decoration-none">
                          <button type="button" className="btn-style btn btn-danger">
                            Login
                          </button>
                        </Link>
                      </div>
                      {/* <div className="nav-item mx-1 p-2">
                        <Link to="/signup" className="text-decoration-none">
                          <button type="button" className="btn-style btn btn-success">
                            SignUp
                          </button>
                        </Link>
                      </div> */}
                    </div>

                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
