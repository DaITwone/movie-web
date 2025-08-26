import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  const { user, signOut } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="border-b border-gray-600" data-aos="fade-down" data-aos-delay='200'>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-red-600 font-extrabold text-6xl">
            D<b className='text-[28px] text-white'>App</b>
          </Link>
          <Link to="/" className="text-sm hover:text-lg hover:font-bold">
            Home
          </Link>
          <Link to="/search" className="text-sm hover:text-lg hover:font-bold">
            Search
          </Link>
          <Link to="/watchlist" className="text-sm hover:text-lg hover:font-bold">
            Watchlist
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-500 hidden sm:inline">{user.email}</span>
              <button
                onClick={async () => {
                  await signOut();
                  nav('/');
                }}
                className="text-sm underline hover:text-red-600 duration-200"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="text-sm  hover:text-red-500 hover:font-bold transition-colors duration-200">
              Sign in 
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
