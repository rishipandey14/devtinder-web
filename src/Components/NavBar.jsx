import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, {withCredentials: true});
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl text-secondary hover:text-primary">Devtinder</Link>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          {user && <div tabIndex={0} role="button" className="btn btn-ghost avatar mx-3 flex items-center"> 
            <p className='px-4'>Welcome, {user.firstName}</p>
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.photoUrl} />
            </div>
          </div>
          }
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link to={"/profile"}>Profile</Link></li>
            {/* <li><a>Settings</a></li> */}
            <li><Link to={"/logout"} onClick={handleLogout}>Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar;