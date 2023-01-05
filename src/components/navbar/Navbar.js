import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as MenuIcon } from "../../assets/svg/menu.svg";
import { isWindowLandscape } from "../../utils/IsWindowLandscape";

export default function Navbar() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [isWindowLandscapeBool, setIsWindowLandscapeBool] = useState(
    isWindowLandscape(window.innerWidth, window.innerHeight)
  );

  const toggleNav = () => {
    setNavbarVisible(!navbarVisible);
  };

  useEffect(() => {
    function handleResize() {
      setIsWindowLandscapeBool(
        isWindowLandscape(window.innerWidth, window.innerHeight)
      );
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const linkItemClassname =
    navbarVisible || isWindowLandscapeBool ? "navLink" : "hidden";

  return (
    <div className='navbar'>
      <button onClick={toggleNav} className="navToggleBtn">
        <MenuIcon className='smallIcon'/>
      </button>
      <Link to="/" className='navLink homeLink'>Dan's finnhub lister</Link>
      <Link to="/stock-market/US" className={linkItemClassname} onClick={toggleNav}>Stock exchange</Link>
      <Link to="/crypto" className={linkItemClassname} onClick={toggleNav}>Crypto</Link>
      <Link to="/forex" className={linkItemClassname} onClick={toggleNav}>Forex</Link>
      </div>
  );
}
