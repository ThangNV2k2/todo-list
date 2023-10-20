import React from "react";
import { v4 as uuidv4 } from "uuid";
import "../assets/css/Header.css";
class Header extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
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
          content: value.trim(),
          isCompleted: false,
        };
        this.props.addTodo(todo);
        this.setState({
          value: "",
        });
      }
    }
  };
  eventUpdate = (e) => {
    if (e.code === "Enter") {
      const { value } = this.state;
      if (value.trim() !== "") {
        this.props.updateTodoItem(value.trim());
        this.setState({
          value: "",
        });
      }
    }
  };
  componentDidUpdate() {
    const { refInputUpdate } = this.props;
    if (refInputUpdate) {
      this.inputRef.current.focus();
    }
  }
  render() {
    const { value } = this.state;
    const { refInputUpdate } = this.props;
    return (
      <div className="header">
        {!refInputUpdate ? (
          <input
          type="text"
          placeholder="What needs to be done?"
          value={value}
          onChange={this.updateContent}
          onKeyDown={this.eventSubmit}
        />
        ) : (
          <input
          type="text"
          value={value}
          ref={this.inputRef}
          onChange={this.updateContent}
          onKeyDown={this.eventUpdate}
        />
        )}
      </div>
    );
  }
}
export default Header;
