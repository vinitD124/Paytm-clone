import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../slice/authReducer';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { apiConnector } from '../services/apiConnector';
import { userEndpPoints } from '../services/apis';
import toast from 'react-hot-toast';

let { GOOGLEHANDLER_API } = userEndpPoints;

function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      console.log(result);
      let { email, displayName, photoURL } = result.user;

      let resp = await apiConnector("POST", GOOGLEHANDLER_API, {
        email, displayName, photoURL
      });

      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("user", JSON.stringify({
        fullName: resp.data.fullName,
        email: resp.data.email,
        profilePicture: resp.data.profilePicture
      }));

      let user = {
        fullName: resp.data.fullName,
        email: resp.data.email,
        profilePicture: resp.data.profilePicture
      };

      if (resp.data.success) {
        navigate("/dashboard");
        toast.success("Login Succesfull")
      }

      dispatch(setSignupData({ user, token: resp.data.token }));

    } catch (error) {
      console.log("Error during Google authentication", error);
    }
  }

  return (
    <button onClick={handleGoogleClick} className='bg-red-600 text-white w-full p-4 rounded-md mt-4 flex text-center items-center justify-center gap-4'>
      Continue with Google <FaGoogle />
    </button>
  );
}

export default Oauth;
