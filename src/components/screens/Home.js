import React ,{ useEffect, useState,useContext} from "react";
import { UserContext } from "../../App";

const Home =()=>{
  const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
       fetch('/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.posts)
       })
    },[])
    return(
      <div className="home">
        {
          <div>
            Congrate You are selected
          </div>
        }
          

      </div>
    )

}
export default Home