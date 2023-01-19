import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.jsx';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Notification from './notification';
import { Avatar,  
    AvatarImage,  
    AvatarUser,  
    DropdownMenu, 
    DropdownMenuLists, 
    Navbar, 
    NavbarContainer, 
    NavbarItem, 
    NavbarLog, 
    NavbarMenu, 
    NavbarResponsive, 
    NavbarResponsiveIcon, 
    NavbarResponsiveItem, 
    NavbarResponsiveMenu } from '../styles/Navbar.jsx';

function Navigation() {
  // handle toggle onclick
  // toggle profile
  const toggleProfile = async () =>{
    navigate('/profile')
  }
  const toggleHome = async ()=> {
    navigate('/home')
  }
  // handle logout
  const navigate = useNavigate()
  const {logout,currentUser} = useAuth();
  const handleSignOut = async() => {
      await logout()
      navigate('/login')
  }
  // Add state variables to control dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    }
  const [responsiveMenuVisible, setResponsiveMenuVisible] = useState(false);
  const toggleMenu = () => {
    setResponsiveMenuVisible(!responsiveMenuVisible);
  }
  return (
    <Navbar>
      <Notification/>
      <NavbarContainer>
        <NavbarLog>RewindingHub</NavbarLog>
        <NavbarMenu>
          <NavbarItem>Home</NavbarItem>
          <NavbarItem>About</NavbarItem>
          <NavbarItem>Services</NavbarItem>
          <NavbarItem>Contact</NavbarItem>
        </NavbarMenu>
        <Avatar>
          <AvatarImage display="true" onClick={toggleDropdown} >
            <AvatarUser>{currentUser?.email[0]}</AvatarUser>
            </AvatarImage>
      {/* {isDropdownOpen && ( */}
        <DropdownMenu clicked={isDropdownOpen}>
          <DropdownMenuLists>{currentUser?.email}</DropdownMenuLists>
          <DropdownMenuLists onClick={toggleProfile}>Profile</DropdownMenuLists>
          <DropdownMenuLists onClick={handleSignOut}>Logout</DropdownMenuLists>
        </DropdownMenu>
      {/* )} */}
        </Avatar>
      </NavbarContainer>
      {/* Add responsive menu */}
      <NavbarResponsive>
        <NavbarResponsiveIcon onClick={toggleMenu} >
          <FontAwesomeIcon icon={faBars} />
        </NavbarResponsiveIcon>
        {/* Toggle responsive menu visibility on click */}
        <NavbarResponsiveMenu clicked={responsiveMenuVisible}>
          <NavbarResponsiveItem onClick={toggleHome}>Home</NavbarResponsiveItem>
          <NavbarResponsiveItem>About</NavbarResponsiveItem>
          <NavbarResponsiveItem>Services</NavbarResponsiveItem>
          <NavbarResponsiveItem>Contact</NavbarResponsiveItem>
        </NavbarResponsiveMenu>
      </NavbarResponsive>
    </Navbar>
  );
}

export default Navigation;
