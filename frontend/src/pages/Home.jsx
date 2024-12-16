import { Link } from 'react-router-dom';
// import logo from '../assets/logo.png'
// import home1 from '../assets/home1.jpg'


const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-[url(https://images.unsplash.com/photo-1610963075509-3426f7621fd2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen flex justify-end flex-col  w-full bg-red-400">
        {/* <img
          className="w-40 absolute  text-white top-5"
          src={logo}
          alt="SheMoves"
        /> */}
        <p className="w-40 absolute left-5 text-3xl text-white top-5">SheMoves</p>
        <div className= "rounded-md bg-white px-4 pb-5 py-4">
          <h2 className="text-2xl font-bold">
            <p className=" leading-tightwe">Get Started with SheMoves</p>
          </h2>
          <Link
            to="/login"
            className="flex items-center justify-center bg-black text-white py-3 text-lg rounded-md mt-4 "
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home
