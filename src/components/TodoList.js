import React from "react";
import Todo from "./Todo";
import "../assets/css/TodoList.css";
import { options } from "../App";
class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1, // trang hien tai
      todosPerPage: 3, // so todo hien thi tren 1 trang
      pageNumbers: [] // cac nut phan trang
    };
  }
  componentDidMount() {
    const { todosPerPage } = this.state;
    const { todoList } = this.props;
    const pageList = [];
    for (let i = 1; i <= Math.ceil(todoList.length / todosPerPage); i++) {
      pageList.push(i);
    }
    this.setState({
      pageNumbers: pageList
    })
  }
  componentDidUpdate(prevProps) {
    if(prevProps.todoList !== this.props.todoList) {
      const { todosPerPage } = this.state;
      const { todoList } = this.props;
      const pageList = [];
      for (let i = 1; i <= Math.ceil(todoList.length / todosPerPage); i++) {
        pageList.push(i);
      }
      this.setState({
        pageNumbers: pageList
      })
    }
  }
  render() {
    const {
      todoList,
      myOption,
      editTodoItem,
      changeIsCompleted,
      deleteTodoItem,
      requestUpdate
    } = this.props;
    const { currentPage, todosPerPage, pageNumbers } = this.state;
    //tinh toan cac cong viec can hien thi tren mot trang
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodoList = todoList.slice(indexOfFirstTodo, indexOfLastTodo);

    return (
      <div className="body">
        <ul className="todo-list">
          {currentTodoList.map((todo) => {
            if (
              myOption === options.All ||
              (myOption === options.Active && !todo.isCompleted) ||
              (myOption === options.Completed && todo.isCompleted)
            ) {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  editTodoItem={editTodoItem}
                  changeIsCompleted={changeIsCompleted}
                  deleteTodoItem={deleteTodoItem}
                  requestUpdate={requestUpdate}
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
