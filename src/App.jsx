import React from 'react'
import { AuthProvider } from './context/AuthContext';
import Signup from './components/Signup';
import Login from "./components/Login"
import Dashboard from './components/Dashboard';
import {Routes,Route} from 'react-router-dom'
import UpdateEmail from './components/UpdateEmail';
import ProtectedRoute from './hooks/protectedRoute';
import Navigation from './components/Navigation';
import  Profile  from './pages/Profile';

 function App() {
  return ( 
    <AuthProvider>
      <Routes>
        
        <Route path='/' element={<Dashboard />} />
        
        <Route  path='/signup' element={<Signup />} />
        <Route path="/login" element={<Login/>}/>
        <Route  path='/navbar' element={<Navigation />} />
        <Route path="/update" element={<UpdateEmail />}/>
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>

        <Route path='*' element={<div>Not Found</div>} />
        
      </Routes>       
    </AuthProvider>
  
  );
};
export default App;