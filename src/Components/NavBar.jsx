import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../utils/handleLogout';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = () => handleLogout(dispatch, navigate);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to={"/feed"} className="btn btn-ghost text-xl text-secondary hover:text-primary">Devtinder</Link>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          {user && <div tabIndex={0} role="button" className="btn btn-ghost avatar mx-3 flex items-center"> 
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
            <li><Link to={"/connections"}>Connections</Link></li>
            <li><Link to={"/requests"}>Requests</Link></li>
            <li><Link to={"/feed"}>Feed</Link></li>
            <li><Link to={"/logout"} onClick={onLogoutClick}>Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar;