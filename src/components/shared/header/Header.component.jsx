import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.styles.css";

import Sidebar from "../sidebar/Sidebar.component";
import { MdOutlineMenuBook } from "react-icons/md";

const Header = () => {
  const [sidebar, setSidebar] = useState("");

  const showSidebar = () => setSidebar("show");

  const hideSidebar = () => setSidebar("");

  return (
    <header className="main-header">
      <h1>
        <Link to="books">Bookstore</Link>
      </h1>

      <div className="mr-4">
      <MdOutlineMenuBook
        size="45px"
        style={{ position: "absolute", right: 30, top: 20 }}
        onClick={showSidebar}
        cursor="pointer"
      />
      </div>

      <Sidebar className={sidebar} hideSidebar={hideSidebar} />
    </header>
  );
};

export default Header;
