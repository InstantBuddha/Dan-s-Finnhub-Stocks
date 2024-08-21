import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as MenuIcon } from "../../assets/svg/menu.svg";
import { isWindowLandscape } from "../../utils/IsWindowLandscape";
import "../../styles/navbar.css";

function Navbar() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [isWindowLandscapeBool, setIsWindowLandscapeBool] = useState(
    isWindowLandscape(window.innerWidth, window.innerHeight)
  );
  const navbarRef = useRef(null);

  const toggleNav = useCallback(() => {
    setNavbarVisible((prev) => !prev);
  }, []);

  const closeNav = () => {
    setNavbarVisible(false);
  };

  const handleResize = () => {
    setIsWindowLandscapeBool(
      isWindowLandscape(window.innerWidth, window.innerHeight)
    );
  };

  const handleClickOutside = useCallback((e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setNavbarVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const linkItemClassname =
    navbarVisible || isWindowLandscapeBool ? "navLink" : "hidden";

  return (
    <nav className="navbar">
      <button onClick={toggleNav} className="navToggleBtn" ref={navbarRef}>
        <MenuIcon className="smallIcon burgerIcon" />
      </button>
      <Link to="/" className="navLink homeLink" onClick={closeNav}>
        Dan's finnhub lister
      </Link>
      <Link
        to="/stock-market/US"
        className={linkItemClassname}
        onClick={closeNav}
      >
        Stock exchange
      </Link>
      <Link
        to="/exchange/crypto"
        className={linkItemClassname}
        onClick={closeNav}
      >
        Crypto
      </Link>
      <Link
        to="/exchange/forex"
        className={linkItemClassname}
        onClick={closeNav}
      >
        Forex
      </Link>
    </nav>
  );
}

export default Navbar;
