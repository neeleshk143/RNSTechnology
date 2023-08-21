import React, { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserContext } from "../App";

 const Navbar =()=>{
  const {state,dispatch} = useContext(UserContext)
  const navigate=useNavigate();
  const renderList = ()=>{
    if(state){
        return [
         <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
         <li> <button className="btn  #64b5f6 red darken-1"
         onClick={()=>{ localStorage.clear()
          dispatch(({type:"CLEAR"}))
          navigate('/signin')
         }}
         >
             LogOut
         </button>
         </li>
    
         
        ]
    }else{
      return [
       <li  key="6"><Link to="/signin">Signin</Link></li>,
       <li  key="7"><Link to="/signup">Signup</Link></li>

      ]
    }
  }
  
  

    return(
    <nav className="white">
    <div className="navigation">
    <Link to={state ? "/" : "/signin"} className="brand-logo left">RNS IT Solution</Link>
     <ul id="nav-mobile" className="right hide-on-med-and-down">
       {renderList()}
      </ul>
    </div>
  </nav>
    )
 } 
 export default Navbar;