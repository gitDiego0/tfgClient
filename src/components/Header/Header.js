import React, { useState } from "react";
import { Link } from "gatsby";

export default function Header({ id, name, items, logo }) {

  const handleMenu = ()=> {
    setIsActive(!isActive)
  }

  const [isActive, setIsActive] = useState(false)
  console.log("Items header", logo);
  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href={`/home`}>
            <img alt={logo.title} src={logo.fluid.srcWebp} />
          </a>

          <a
            role="button"
            className={`navbar-burger ${isActive ? "is-active" : ""} `}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => setIsActive(!isActive)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-end">
            {items.map((item, index) => (
              <Link
                key={index}
                to={`/${item.title.toLowerCase()}`}
                className="navbar-item"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
