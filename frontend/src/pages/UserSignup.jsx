import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [userData, setUserData] = useState({})

  useEffect(()=>{
  },[userData])

  const submitHandler = (e)=>{
    e.preventDefault();
    setUserData({
      fullname:{
        firstname:firstname,
        lastname:lastname,
      },
        email:email,
        password:password 
    })
    setEmail('')
    setFirstname('')
    setLastname('')
    setPassword('')

  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-xl mb-2">What&apos;s your name</h3>
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                type="text"
                required
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                className="bg-[#eeeeee] border-rounded px-4 border w-full text-lg rounded-md placeholder:md py-2"
                placeholder="Firstname"
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                required
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                className="bg-[#eeeeee] border-rounded px-4 border w-full text-lg rounded-md placeholder:md py-2"
                placeholder="Lastname"
              />
            </div>
          </div>
          <h3 className="text-xl mb-2 mt-4">What&apos;s your email</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
          <button className="bg-[#111] w-full py-2 text-white rounded-md font-semibold mb-2 bg-green-600">
            Register
          </button>
        </form>
        <p className="text-lg text-center pt-1">
          Already a User?{" "}
          <Link to="/login" className=" pb-1 text-blue-500 font-semibold">
            Login here
          </Link>
        </p>
      </div>

      <div className="">
        <p className="text-[10px] leading-1">
          The site is protected by reCAPTHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service Apply</span>
        </p>
      </div> 
    </div>
  );
};

export default UserSignup;
