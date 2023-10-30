import React from "react";

export const ThemeContext = React.createContext({
    theme: "",
    toggleTheme: () => {},
    
});
export default class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light"
    };
  }
  toggleTheme = () => {
    this.setState({
      theme: this.state.theme === "light" ? "dark" : "light",
    });
  };
  render() {
    const { theme } = this.state;
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme: this.toggleTheme }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}