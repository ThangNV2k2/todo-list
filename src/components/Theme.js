import React from "react";
import { ThemeContext, background } from "../App";
import "../assets/css/Theme.css";
class Theme extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div class="toggle">
            <input
              type="checkbox"
              id="toggleMode"
              checked={theme === background.dark}
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
