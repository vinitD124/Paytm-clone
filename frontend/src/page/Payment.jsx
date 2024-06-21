import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userEndpPoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import { GrTransaction } from "react-icons/gr";
import { TbTransferVertical } from "react-icons/tb";
import { AccountEndpPoints } from "../services/apis";
import toast from "react-hot-toast";
import { FaCircleCheck } from "react-icons/fa6";

let { GETALLUSER_API } = userEndpPoints;
let { TRANSFER_API } = AccountEndpPoints;

function Payment({ totalBalance, fetchUserBalance }) {
  const state = useSelector((state) => state);
  const token = state.auth.token;

  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [amount, setAmount] = useState(0);

  const [toUser, setToUser] = useState("");
  const [toUserId, setToUserId] = useState("");

  const [paymentSucces, setPaymentSucess] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (keyword.trim() === "") {
        setUsers([]);
        return;
      }

      try {
        const resp = await apiConnector(
          "GET",
          `${GETALLUSER_API}${keyword}`,
          null,
          {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          }
        );

        setUsers(resp.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, [keyword, token]);

  const startTransaction = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const resp = await apiConnector(
        "POST",
        TRANSFER_API,
        {
          to: toUserId,
          amount,
        },
        {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        }
      );

      if (!resp.data.success) {
        throw new Error(resp.data.message);
      }

      setPaymentSucess(true);
      toast.success("Payment Transfer successful");

      fetchUserBalance();

    } catch (error) {
      let errorMessage = "Error while Transfering";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setHasSearched(true);
  };

  return (
    <div className="px-14 py-8">
      <h1 className="text-3xl text-slate-600 payment-heading">Payment</h1>
      <div className="paymentflex flex gap-10">
        <div className="left-payment w-[40%]">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search User"
            className="border p-2 my-4 w-full"
          />
          <div>
            {hasSearched && users?.length === 0 && <p>Search User</p>}
            <div className="search-box flex flex-col gap-4 mt-3">
              {users?.map((user) => (
                <div
                  className="bg-full bg-slate-100 rounded-md text-slate-600 px-4 py-3 flex justify-between items-center"
                  key={user._id}
                >
                  <div className="text-slate-700 ">{user.fullName}</div>
                  <button
                    className="bg-blue-700 text-white px-4 rounded-lg  py-2"
                    onClick={() => {
                      setToUserId(user._id);
                      setToUser(user.fullName);
                      setIsStart(true);
                      setPaymentSucess(false);
                    }}
                  >
                    Send money
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
   
        <div className={`right-payment h-[55vh] mt-[-10px] w-[55%] flex justify-center items-center given-one ${isStart && !paymentSucces ? 'active' : ''}`}>
      <div className="transfter w-[50%] main-payment h-full relative flex flex-col justify-center text-center gap-4 items-center ">
        <GrTransaction className="absolute left-[43%] top-[-25px] text-2xl box-icon" />
        <div className="top-border  w-full h-5 absolute top-0"></div>
        <input
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          placeholder="Amount"
          className="text-center input-box w-[150px] p-3 mt-[-5px]"
        />
        <div className="from">
          <span className="text-slate-500">From</span>
          <h1 className="text-[1.3rem] text-slate-600">
            {state.auth.signupData.fullName}
          </h1>
        </div>

        <h2 className="text-2xl text-yellow-400 p-2 rounded-full my-2">
          <TbTransferVertical />
        </h2>

        <div className="to">
          <span className="text-slate-500">To</span>
          <h1 className="text-[1.3rem] text-slate-600 font-md">{toUser}</h1>
        </div>

        <button
          className={`w-[80%] p-3 rounded-md mb-[-70px] mt-4 bg-green-500 text-white font-md`}
          onClick={startTransaction}
        >
          Transfer
        </button>
      </div>
    </div>
      

   
          <div className={`right-payment h-[55vh] mt-[-10px] w-[55%] flex justify-center items-center show-box-2  ${paymentSucces ? 'active' : ''}`}>
            <div className="transfter w-[50%] main-payment h-full relative flex flex-col justify-center text-center gap-4 items-center ">
              <div className="top-sucess top-nav-success w-full h-[150px] absolute top-0 flex justify-center items-center">
                <FaCircleCheck className="absolute top-[-25px] p-1 rounded-full text-green-500 bg-white text-5xl" />
                <h1 className="text-white text-2xl font-bold">Payment Success</h1>
              </div>
              <div className="top-sucess bg-white w-full mt-[170px] h-[400px] flex justify-center">
                <ul>
                  <li>
                    <span className="text-slate-500">From</span>
                    <h1 className="text-2xl text-slate-700 mb-4">
                      {state.auth.signupData.fullName}
                    </h1>
                  </li>

                  <li>
                    <span className="text-slate-500">To</span>
                    <h1 className="text-2xl text-slate-700">{toUser}</h1>
                  </li>

                  <li className="mt-8 bg-slate-500 text-white px-4 py-2 rounded-lg">
                    amount: {amount}
                  </li>
                </ul>
              </div>
            </div>
          </div>
     
      </div>
    </div>
  );
}

export default Payment;
