import { Link } from 'react-router-dom';
import logo from '../assets/0000.png'

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-[url(https://w0.peakpx.com/wallpaper/290/80/HD-wallpaper-girl-glance-wind-traffic-light-anime.jpg)] h-screen flex justify-end flex-col  w-full bg-red-400">
        <img className="w-40 absolute  top-5" src={logo} alt="SheMoves" />
        <div className="bg-white px-4 pb-5 py-4">
          <h2 className="text-2xl font-bold">Get Started with SheMoves</h2>
          <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded-md mt-4 ">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home
