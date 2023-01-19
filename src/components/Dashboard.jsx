import React from 'react'
import { Button } from 'react-bootstrap';
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from 'react-router-dom';
import Navigation from './Navigation';


export default function Dashboard() {
    const navigate = useNavigate()
    const {currentUser,logout} = useAuth();
    const handleSignOut = async() => {
        await logout()
        navigate('/login')
    }
  return ( 
    <div>
      <Navigation/>
      <h1>"Welcome {currentUser?.email}"</h1>
      <Button onClick={handleSignOut} type="submit">
        Logout
      </Button>
      <Link to='/update' >
        <Button>Update</Button>
      </Link>
    </div>
  )
}
