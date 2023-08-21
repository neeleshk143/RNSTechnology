
import React,{useEffect,createContext,useReducer, useContext} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';
import Home from './components/screens/Home';
import Signup from './components/screens/SignUp';
import Signin from './components/screens/SignIn';
import {reducer,initialState} from './Reducers/userReducer';

export const UserContext = createContext()

const Routing =()=>{
   const navigate =useNavigate()
   const {state,dispatch}=useContext(UserContext)
   useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("USER"))
    if(user){
      navigate('/')

    }else{

      navigate('/signin')
    }
   },[])
  return(
    <Routes>
    <Route exact path="/" element={<Home navigate={navigate} />} />
<Route path="/signup" element={<Signup navigate={navigate} />} />
<Route path="/signin" element={<Signin navigate={navigate} />} />

    </Routes>
    

  )
}

function App() {
  const [state,dispatch] =useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
