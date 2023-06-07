import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import "./style.scss";
import { ThemeContext } from "../../ThemeContext";
const SideBar = () => {
  const [isHidden, setIsHidden] = React.useState(true);
  const { theme, setTheme } = useContext(ThemeContext);
  const menuItems = [
    {
      sectionName: "Menu Dashboard",
      items: [
        {
          name: "Dashboard",
          icon: "ic:round-dashboard",
          isSelected: true,
          badge: "",
        },
        {
          name: "Menus",
          icon: "streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard",
          isSelected: false,
          badge: "New",
        },
        {
          name: "History",
          icon: "solar:stopwatch-linear",
          isSelected: false,
          badge: "",
        },
        {
          name: "Wallet",
          icon: "game-icons:swipe-card",
          isSelected: false,
          badge: "",
        },
        {
          name: "Promotion",
          icon: "iconoir:percentage-square",
          isSelected: false,
          badge: "12 +",
        },
      ],
    },
    {
      sectionName: "General",
      items: [
        {
          name: "Settings",
          icon: "ph:gear",
          isSelected: false,
          badge: "",
        },
        {
          name: "Give Rating",
          icon: "simple-line-icons:envolope",
          isSelected: false,
          badge: "",
        },
      ],
    },
  ];

  const toggleSidebar = () => {
    if (isHidden) {
      document.getElementById("nav").classList.add("hidden")
      setIsHidden(false);
    } else {
        document.getElementById("nav").classList.remove("hidden");
      setIsHidden(true);
    }
  };
  const changeTheme = (theme) => {
    setTheme(theme);
  };
  return (
    <nav id="nav" className={`navbar ${theme}`}>
      <div className="mainTitle">
        <Icon
          icon="material-symbols:offline-bolt"
          height={34}
          className="boltIcon"
          color="#ec5753"
        />
        <div>
          <div>
            <h2 className="pkart">ProductsKart</h2>
            <small>Thu 16 Jun</small>
          </div>
          <button onClick={toggleSidebar} id="btnToggle" className="toggleBtn">
            <Icon
              icon={`${
                isHidden ? "icon-park:left-one" : "icon-park-outline:right-one"
              }`}
            />
          </button>
        </div>
      </div>
      <div className="menuContainer Border-t">
        <Icon icon="twemoji:hamburger" height={34} />
        <div className="headerContainer">
          <div className="header">
            <small className="subTitle">Menu</small>
            <div className="filterWrapper">
              <Icon
                icon="streamline:interface-setting-slider-vertical-adjustment-adjust-controls-fader-vertical-settings-slider-square"
                className="filterIcon"
              />
              <small>Filter</small>
            </div>
          </div>
          <h2 className="cat-title">Burger</h2>
        </div>
      </div>
      <ul>
        {menuItems.map((ele, key) => {
          return (
            <div key={key} className="sectionWrapper">
              <h4 key={key} className="itemTitle">
                {ele.sectionName}
              </h4>
              {ele.items.map((childEle, childKey) => {
                return (
                  <li key={childKey} className="item">
                    <a href="/" className="item">
                      <div
                        className={`menuName ${
                          childEle.isSelected ? "isSelected" : ""
                        }`}
                      >
                        <Icon icon={childEle.icon} height={18} />
                        <span className="elementName">{childEle.name}</span>
                      </div>
                      {childEle.badge ? (
                        <span className="badge">{childEle.badge}</span>
                      ) : (
                        <></>
                      )}
                    </a>
                  </li>
                );
              })}
            </div>
          );
        })}
      </ul>
      <div className="btnWrapper">
        <button
          className={`btnTheme ${theme==="dark"?"active":""}`}
          onClick={() => {
            changeTheme("dark");
          }}
        >
          Dark
        </button>
        <button
          className={`btnTheme ${theme==="dark"?"":"active"}`}
          onClick={() => {
            changeTheme("");
          }}
        >
          Light
        </button>
      </div>
    </nav>
  );
};
export default SideBar;
