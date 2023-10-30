import React from "react";
import { ThemeContext } from "./ThemeProvider";
import "../assets/css/Theme.css";
class Theme extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div className="toggle">
            <input
              type="checkbox"
              id="toggleMode"
              checked={theme === 'dark'}
              onChange={toggleTheme}
              hidden
            />
            <label htmlFor="toggleMode"></label>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Theme;
