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

  const closeNav = () => {
    setNavbarVisible(false);
  };

  const handleResize = () => {
    setIsWindowLandscapeBool(
      isWindowLandscape(window.innerWidth, window.innerHeight)
    );
  };

  useEffect(() => {
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
        <Link to="/" className='navLink homeLink' onClick={closeNav}>Dan's finnhub lister</Link>
        <Link to="/stock-market/US" className={linkItemClassname} onClick={closeNav}>Stock exchange</Link>
        <Link to="/crypto" className={linkItemClassname} onClick={closeNav}>Crypto</Link>
        <Link to="/forex" className={linkItemClassname} onClick={closeNav}>Forex</Link>
        </div>
    );
}
