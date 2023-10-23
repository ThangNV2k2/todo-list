import React from "react";
import { v4 as uuidv4 } from "uuid";
import "../assets/css/Header.css";
import propstypes from "prop-types";
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
      const { updateContent } = this.props;
      const { value } = this.state;
      if (value.trim() !== "") {
        updateContent(value.trim());
        this.setState({
          value: "",
        });
      }
    }
  };
  render() {
    const { value } = this.state;
    const { clickUpdate, inputRef } = this.props;
    return (
      <div className="header">
        {!clickUpdate ? (
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
            onChange={this.updateContent}
            onKeyDown={this.eventUpdate}
            ref={inputRef}
          />
        )}
      </div>
    );
  }
}
Header.propstypes = {
  addTodo: propstypes.func,
  updateTodoItem: propstypes.func,
  inputRef: propstypes.object,
  updateContent: propstypes.func,
  clickUpdate: propstypes.bool,
};
Header.defaultProps = {
  clickUpdate: false,
};
export default Header;
