import React from "react";
import "../assets/css/Todo.css";
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      value: props.todo.content,
    };
  }
  handleDelete = (e) => {
    const { id } = e.target;
    this.props.deleteTodoItem(id);
  };
  handleDoubleClick = (e) => {
    this.setState({
      isEditing: true,
    });
  };
  handleKeyDown = (e) => {
    if (e.code === "Enter") {
      const { id } = e.target;
      const newContent = e.target.value;
      this.setState({
        isEditing: false,
        value: newContent,
      });
      this.props.editTodoItem(id, newContent);
    }
  };
  changeValue = (e) => {
    const { value } = e.target;
    this.setState({
      value,
    });
  };
  changeIsCompleted = (e) => {
    const { id } = e.target;
    this.props.changeIsCompleted(id);
  };
  render() {
    const { todo } = this.props;
    const { isEditing } = this.state;
    const { value } = this.state;
    return (
      <li className="todo-item">
        {isEditing ? (
          <div className="todo_input">
            <input
              onKeyDown={this.handleKeyDown}
              type="text"
              className="input"
              onChange={this.changeValue}
              value={value}
              id={todo.id}
            />
          </div>
        ) : (
          <div className="todo">
            <div className="todo_check">
              <label className="checkbox_item" for={todo.id}>
                <input
                  type="checkbox"
                  id={todo.id}
                  className="checkbox"
                  checked={todo.isCompleted}
                  onChange={this.changeIsCompleted}
                />
                <i className="fa-solid fa-check"></i>
              </label>
            </div>
            <div className="div_content" onDoubleClick={this.handleDoubleClick}>
              <p className={todo.isCompleted ? "content" : ""}>
                {todo.content}
              </p>
              <i
                className="fa-solid fa-xmark"
                id={todo.id}
                onClick={this.handleDelete}
              ></i>
            </div>
          </div>
        )}
      </li>
    );
  }
}
export default Todo;
