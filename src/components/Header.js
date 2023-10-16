import React from "react";
import { v4 as uuidv4 } from "uuid";
import "../assets/css/Header.css";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  updateContent = (e) => {
    const { value } = e.target;
    this.setState({
      value,
    });
  };
  eventSubmit = (e) => {
    if (e.code === "Enter") {
      const { value } = this.state;
      if (value.trim() !== "") {
        const todo = {
          id: uuidv4(),
          content: value,
          isCompleted: false,
        };
        this.props.addTodo(todo);
        this.setState({
          value: "",
        });
      }
    }
  };
  render() {
    const { value } = this.state;
    return (
      <div className="header">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={value}
          onChange={this.updateContent}
          onKeyDown={this.eventSubmit}
        />
      </div>
    );
  }
}

export default Header;
