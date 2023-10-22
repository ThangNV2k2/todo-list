import React from "react";
import Todo from "./Todo";
import "../assets/css/TodoList.css";
import { options } from "../App";
class TodoList extends React.Component {
  constructor() {
    super();
    this.isScroll = React.createRef();
    this.state = {
      currentPage: 1, // trang hien tai
      todosPerPage: 4, // so todo hien thi tren 1 trang
      pageNumbers: [], // cac nut phan trang
      loadingState: false,
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
      pageNumbers: pageList,
    });
    this.isScroll.current.addEventListener("scroll", () => {
      if (
        this.isScroll.current.scrollTop + this.isScroll.current.clientHeight >=
        this.isScroll.current.scrollHeight
      ) {
        this.loadMoreItems();
      }
      if(this.isScroll.current.scrollTop === 0){
        this.backItems();
        console.log("back");
      }
    });
  }
  loadMoreItems = () => {
    if (this.state.loadingState) {
      return;
    }
    this.setState({ loadingState: true });
    const { currentPage, pageNumbers } = this.state;
    if (currentPage >= pageNumbers.length) {
      setTimeout(() => {
        this.setState({
          currentPage: 1,
        });
      }, 500);
      console.log("next");
      this.setState({ loadingState: false });
    } else {
      setTimeout(() => {
        this.setState({
          currentPage: this.state.currentPage + 1,
        });
      }, 500);
      this.setState({ loadingState: false });
    }
  };
  backItems = () =>{
    if (this.state.loadingState) {
      return;
    }
    this.setState({ loadingState: true });
    const { currentPage, pageNumbers } = this.state;
    if (currentPage === 1) {
      setTimeout(() => {
        this.setState({
          currentPage: pageNumbers.length,
        });
      }, 500);
      this.setState({ loadingState: false });
    } else {
      setTimeout(() => {
        this.setState({
          currentPage: this.state.currentPage - 1,
        });
      }, 500);
      this.setState({ loadingState: false });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.todoList !== this.props.todoList) {
      const { todosPerPage } = this.state;
      const { todoList } = this.props;
      const pageList = [];
      for (let i = 1; i <= Math.ceil(todoList.length / todosPerPage); i++) {
        pageList.push(i);
      }
      this.setState({
        pageNumbers: pageList,
      });
    }
  }
  render() {
    const {
      todoList,
      myOption,
      editTodoItem,
      changeIsCompleted,
      deleteTodoItem,
      requestUpdate,
    } = this.props;
    const { currentPage, todosPerPage, pageNumbers, loadingState } = this.state;
    //tinh toan cac cong viec can hien thi tren mot trang
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodoList = todoList.slice(indexOfFirstTodo, indexOfLastTodo);
    return (
      <div className="body">
        <ul
          className="todo-list"
          ref={this.isScroll}
          style={{ maxHeight: "200px", overflowY: "scroll" }}
        >
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
        {loadingState ? <p>Loading more todo...</p> : ""}
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
