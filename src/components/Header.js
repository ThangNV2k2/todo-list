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
      idUpdate: null
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
  changeIdUpdate = (id) => {
    this.setState({
      idUpdate: id
    }, () => {
      this.inputRef.current.value = this.props.contentTodo(id);
      this.inputRef.current.focus();
    });
  }
  eventUpdate = (e) => {
    if (e.code === "Enter") {
      const { editTodoItem } = this.props;
      const { value, idUpdate } = this.state;
      if (value.trim() !== "") {
        editTodoItem(idUpdate, value.trim());
        this.setState({
          value: "",
        }, () => this.setState({idUpdate: null}));
      }
    }
  };
  render() {
    const { value, idUpdate } = this.state;
    return (
      <div className="header">
          <input
            type="text"
            placeholder={!idUpdate ? "What needs to be done?" : ""}
            value={value}
            onChange={this.updateContent}
            onKeyDown={!idUpdate ? this.eventSubmit : this.eventUpdate}
            ref={this.inputRef}
          />
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
