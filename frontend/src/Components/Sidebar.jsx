import React from "react";
import "../App.css";
import { SidebarData } from "./SidebarData.js";

export const Sidebar = () => {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li key={key} className="row" onClick={() => {window.location.pathname=val.link}}>
              <div id="title"><img src={val.icon} alt="" id="icon" />  {val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
