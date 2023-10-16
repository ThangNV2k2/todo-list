import React from "react";
import Todo from "./Todo";
import "../assets/css/TodoList.css";
class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1, // trang hien tai
      todosPerPage: 3, // so todo hien thi tren 1 trang
    };
  }
  render() {
    const {
      todoList,
      myOption,
      editTodoItem,
      changeIsCompleted,
      deleteTodoItem,
    } = this.props;
    const { currentPage, todosPerPage } = this.state;
    //tinh toan cac cong viec can hien thi tren mot trang
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodoList = todoList.slice(indexOfFirstTodo, indexOfLastTodo);
    // tao cac nut phan trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todoList.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="body">
        <ul className="todo-list">
          {currentTodoList.map((todo) => {
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
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                className={`page-link ${number === currentPage ? "focus" : ""}`}
                onClick={() => this.setState({ currentPage: number })}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
