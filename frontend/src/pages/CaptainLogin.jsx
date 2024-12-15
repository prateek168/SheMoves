import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setemail] = useState('');
  const [password , setPassword] = useState('');
  const [captainData, setCaptainData] = useState({})

  useEffect(()=>{
    console.log(captainData)
  },[captainData])


  const submitHandler = (e)=>{
    e.preventDefault();
    setCaptainData({
      email:email,
      password:password
    })
    console.log(captainData)
    setemail('');
    setPassword('');
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <form onSubmit={(e)=>submitHandler(e)}> 
          <h3 className="text-xl mb-2">What&apos;s your email</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 border-rounded px-4 border w-full text-lg rounded-md placeholder:md py-2"
            placeholder="email@example.com"
            />
          <h3 className="text-xl mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 border-rounded px-4 border w-full text-lg rounded-md placeholder:md py-2"
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
          />
          <button className="bg-[#111] w-full py-2 text-white rounded-md font-semibold mb-2">
            Login
          </button>
        </form>
        <p className="text-lg text-center">
          Register as Captain?{" "}
          <Link to="/captain-signup" className="text-blue-500 font-semibold">
            Create account
          </Link>
        </p>
      </div>

      <div className="text-center">
        <Link to='/login' className="mt-2 flex items-center justify-center bg-[#d5622d] w-full py-2 text-white rounded-md font-semibold">
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
