import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbSmartHome } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { Link, NavLink } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { AccountEndpPoints } from '../services/apis';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../slice/authReducer";

let { GETBALANCE_API } = AccountEndpPoints;

function Template({ children }) {
  const state = useSelector((state) => state);
  const token = state.auth.token;

  let navigate = useNavigate()
  let dispatch = useDispatch()

  const [totalBalance, setTotalBalance] = useState(null);

  const fetchUserBalance = async () => {
    let resp = await apiConnector("GET", GETBALANCE_API, null, {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    });

    setTotalBalance(resp?.data.balance);
  };

  console.log(state)

  useEffect(() => {
    fetchUserBalance();
  }, []);

  return (
    <div className="main-dashboard">
      <div className="main-dashboard-inside">
        <div className="top-nav flex justify-between items-center px-16 mt-4">
          <p> Dashboard {">"} Home</p>

          <div className="flex items-center gap-4">
            <NavLink to="/dashboard" className="bx-1" activeClassName="active">
              <TbSmartHome />
            </NavLink>
            <NavLink to="/payment" className="bx-1" activeClassName="active">
              <GrTransaction />
            </NavLink>
          </div>

          <div className="flex gap-4">
            <img
              className="w-6 rounded-full object-cover h-6"
              src={state.auth.signupData.profilePicture}
              alt=""
            />
            <h1>{state.auth.signupData.fullName}</h1>
            <button className="btn-logout" onClick={()=>{
              localStorage.removeItem("user")
              localStorage.removeItem("token")
              toast.success("Logout succesfuly")
              let user = null
              let token = null
              dispatch(setSignupData({ user: null, token: null }));
              navigate("/")

            }}>Logout</button>
          </div>
        </div>
        <div className="top-nav-2 flex justify-between px-14 py-6 bg-[#dfe1e537]">
          <h2 className="flex flex-row items-end  text-[0.rem] gap-4 text-slate-400 ">
            Total Balance <span className="text-5xl text-slate-700 font-medium">{totalBalance}</span>
          </h2>
          
          <div className="flex gap-4">
          <button className="flex items-center gap-2" id="bb-1">
           <Link className="flex items-center gap-2 " to={"/payment"}> Send Money <GrTransaction /></Link>
          </button>
          <button className="flex items-center gap-2 bg-[#7f8ca1] text-white px-8 py-2 rounded-full" id="bb-2">
           <Link className="flex items-center gap-2" to={"/dashboard"}>   Check Transactions <GrTransaction /></Link>
          
          </button>

          </div>
          
        </div>
        
        {React.cloneElement(children, { totalBalance, fetchUserBalance })}
      </div>
    </div>
  );
}

export default Template;
