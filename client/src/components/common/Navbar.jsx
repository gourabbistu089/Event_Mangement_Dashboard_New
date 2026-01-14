// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Calendar, LogOut, Menu, X } from 'lucide-react';
// import { useAuth } from '../../hooks/useAuth';
// import { NotificationBell } from '../notifications/NotificationBell';

// export const Navbar = () => {
//   const { user, logout,setUser } = useAuth();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   console.log("User in Navbar : ", user)

//   const dashboardLink = user?.role === 'organizer' ? '/organizer-dashboard' : '/user-dashboard';

//   return (
//     <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to={dashboardLink} className="flex items-center gap-3">
//             <Calendar className="w-8 h-8 text-blue-600" />
//             <span className="text-xl font-semibold text-gray-900">EventHub</span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-6">
//             <Link
//               to="/events"
//               className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Browse Events
//             </Link>

//             {user?.role === 'user' && (
//               <Link
//                 to="/my-registrations"
//                 className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 My Registrations
//               </Link>
//             )}

         

//             {/* <NotificationBell /> */}

//             <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-900">{user?.name}</p>
//                 <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
//               </div>
//               <button
//                 onClick={logout}
//                 className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                 title="Logout"
//               >
//                 <LogOut className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
//           >
//             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden border-t border-gray-200 bg-white">
//           <div className="px-4 py-3 space-y-2">
//             <div className="px-4 py-2 border-b border-gray-100">
//               <p className="text-sm font-medium text-gray-900">{user?.name}</p>
//               <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
//             </div>
//             <Link
//               to="/events"
//               className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               Browse Events
//             </Link>
//             {user?.role === 'user' && (
//               <Link
//                 to="/my-registrations"
//                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 My Registrations
//               </Link>
//             )}
//             <button
//               onClick={() => {
//                 logout();
//                 setMobileMenuOpen(false);
//               }}
//               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };


import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, LogOut, Menu, X, User, LayoutDashboard, FileText, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dashboardLink = user?.role === 'organizer' ? '/organizer-dashboard' : '/user-dashboard';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={'/'} className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">EventHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/events"
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse Events
            </Link>

            {user ? (
              /* User Profile Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    <div className="py-2">
                      <Link
                        to={dashboardLink}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>

                      {user.role === 'user' && (
                        <Link
                          to="/my-registrations"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <FileText className="w-4 h-4" />
                          My Registrations
                        </Link>
                      )}

                      {user.role === 'organizer' && (
                        <Link
                          to="/create-event"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <Plus className="w-4 h-4" />
                          Create Event
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Login/Signup Buttons */
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            {user ? (
              <>
                <div className="px-4 py-3 border-b border-gray-100 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/events"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar className="w-4 h-4" />
                  Browse Events
                </Link>

                <Link
                  to={dashboardLink}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                {user.role === 'user' && (
                  <Link
                    to="/my-registrations"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FileText className="w-4 h-4" />
                    My Registrations
                  </Link>
                )}

                {user.role === 'organizer' && (
                  <Link
                    to="/create-event"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Plus className="w-4 h-4" />
                    Create Event
                  </Link>
                )}

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/events"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar className="w-4 h-4" />
                  Browse Events
                </Link>
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};