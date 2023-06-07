import "./App.css";
import SideBar from "./components/sideBar";
import Dashboard from "./dashboard";
import React from "react";
import { ThemeContext } from "./ThemeContext";
function App() {
  const [theme, setTheme] = React.useState("");
  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <SideBar />
        <Dashboard />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
