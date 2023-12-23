import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
// import Slider from "../../Pages/Home/Slider";

const Navbar = () => {
    const {user,logOut} = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const navlinks = <>
        <li className='text-white text-xl'><NavLink to='/'>Home</NavLink></li>
       
        

    </>
    return (
        <div>
            <div className='bg relative bg-blend-multiply hero-overlay bg-opacity-20'>

                <div className="navbar  container mx-auto">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {navlinks}
                            </ul>
                        </div>
                        <img className="w-1/2 md:w-1/3 " src="https://i.ibb.co/x290T0q/clickup-logo-transparent-removebg-preview.png" alt="" />
                    </div>
                    <div className="form-control hidden md:block">
                        <input type="text" placeholder="Search" className="input input-bordered  md:w-auto lg:-ml-8" />
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="active:border-y-4 active:border-red-400 px-1 lg:ml-80">
                            {navlinks}
                        </ul>

                    </div>
                    <div className="navbar-end flex gap-3">
                    {/* console.log(user) */}
                    {user ?
                        <>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="md:w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={ user?.photoURL } />
                                    </div>
                                </div>
                                <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                        <li className='text-base list-none font-xl'> {user?.displayName}</li>

                                           
                                        </a>
                                    </li>

                                   
                                    <button onClick={handleLogOut} className='text-black text-lg font-semibold'>Logout</button>
                                </ul>
                            </div>

                        </>
                        :
                        <>
                        
                        <Link to='/login'>
                        <button className="btn btn-error">Login</button>
                        </Link> 
                        <Link to='/register'>
                        <button className="btn btn-error">Register</button>
                        </Link>
                        </>
                        }
                        

                      
                    </div>
                </div>
            <div>
                {/* <Slider></Slider> */}
            </div>
            </div>
           <Link to='/dashboard'>
           
            <button className="absolute md:left-52  top-64 md:top-96 btn btn-error  text-white text-base md:text-2xl py-1 md:py-2">Let’s Explore</button> </Link>
         </div>
    );
};

export default Navbar;