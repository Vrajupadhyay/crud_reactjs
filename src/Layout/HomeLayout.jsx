import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HomeLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Admin Dashboard</a>
        </div>
      </div>

      <div className={`drawer ${isSidebarOpen ? 'open' : ''}`}>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isSidebarOpen} />
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={toggleSidebar}></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li>
              <Link to="/" className="menu-title">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/add" className="menu-title">
                Add Student
              </Link>
            </li>
            <li>
              <Link to="/view" className="menu-title">
                View Students
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {children}
      </div>
    </>
  );
}

export default HomeLayout;
