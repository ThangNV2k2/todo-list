import React from "react";
import Todo from "./Todo";
import "../assets/css/TodoList.css";
class TodoList extends React.Component {
  deleteTodoItem = (id) => {
    this.props.deleteTodoItem(id);
  };
  editTodoItem = (id, content) => {
    this.props.editTodoItem(id, content);
  };
  changeIsCompleted = (id) => {
    this.props.changeIsCompleted(id);
  };
  render() {
    const { todoList } = this.props;
    return (
      <ul className="todo-list">
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodoItem={this.deleteTodoItem}
            editTodoItem={this.editTodoItem}
            changeIsCompleted={this.changeIsCompleted}
          />
        ))}
      </ul>
    );
  }
}

export default TodoList;
