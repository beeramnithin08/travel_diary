import React from "react"
import {Navigate,Outlet} from "react-router-dom"


const PrivateComponent=()=>{
    const auth=localStorage.getItem("user");
    console.log("user")
    console.log(auth);
    return auth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateComponent