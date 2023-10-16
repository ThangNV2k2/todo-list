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
  handleDelete = () => {
    const { todo, deleteTodoItem } = this.props;
    deleteTodoItem(todo.id);
  };
  handleDoubleClick = () => {
    this.setState({
      isEditing: true,
    });
  };
  handleKeyDown = (e) => {
    if (e.code === "Enter") {
      const { todo } = this.props;
      const newContent = e.target.value;
      this.setState({
        isEditing: false,
        value: newContent,
      });
      this.props.editTodoItem(todo.id, newContent);
    }
  };
  changeValue = (e) => {
    const { value } = e.target;
    this.setState({
      value,
    });
  };
  changeIsCompleted = () => {
    const { todo, changeIsCompleted } = this.props;
    changeIsCompleted(todo.id);
  };
  render() {
    const { todo } = this.props;
    const { isEditing, value } = this.state;
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
            />
          </div>
        ) : (
          <div className="todo">
            <div className="todo_check">
              <label className="checkbox_item" htmlFor={todo.id}>
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
                {value}
              </p>
              <i
                className="fa-solid fa-xmark"
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
