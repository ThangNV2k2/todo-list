import React from "react";
import Todo from "./Todo";
import "../assets/css/TodoList.css";
class TodoList extends React.Component {
  render() {
    const {
      todoList,
      myOption,
      editTodoItem,
      changeIsCompleted,
      deleteTodoItem,
    } = this.props;
    return (
      <ul className="todo-list">
        {todoList.map((todo) => {
          if (
            myOption === "All" ||
            (myOption === "Active" && !todo.isCompleted) ||
            (myOption === "Completed" && todo.isCompleted)
          ) {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                editTodoItem={editTodoItem}
                changeIsCompleted={changeIsCompleted}
                deleteTodoItem={deleteTodoItem}
              />
            );
          }
          return null;
        })}
      </ul>
    );
  }
}

export default TodoList;
