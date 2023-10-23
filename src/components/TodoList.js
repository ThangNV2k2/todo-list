import React from "react";
import Todo from "./Todo";
import "../assets/css/TodoList.css";
import propstypes from "prop-types";
import { options } from "../App";
class TodoList extends React.Component {
  constructor() {
    super();
    this.isScroll = React.createRef();
    this.state = {
      numberTodo: 4,
      loadingState: false,
    };
  }
  componentDidMount() {
    this.isScroll.current.addEventListener("scroll", () => {
      if (
        this.isScroll.current.scrollTop + this.isScroll.current.clientHeight >=
        this.isScroll.current.scrollHeight - 10
      ) {
        this.setState({ loadingState: true });
        setTimeout(() => {
          this.setState({
            numberTodo: this.state.numberTodo + 4,
            loadingState: false,
          });
        }, 1000);
      }
    });
  }
  displayTodoList = () => {
    const {
      todoList,
      myOption,
      editTodoItem,
      changeIsCompleted,
      deleteTodoItem,
      requestUpdate,
    } = this.props;
    const { numberTodo } = this.state;
    const todoListDisplay = [];
    if (todoList.length > 4 && numberTodo >= todoList.length + 4) {
      this.setState({ numberTodo: 4 });
    }
    for (let i = 0; i < numberTodo; i++) {
      if (
        (todoList[i] && todoList[i].id) &&
        (myOption === options.All ||
        (myOption === options.Active && !todoList[i].isCompleted) ||
        (myOption === options.Completed && todoList[i].isCompleted))
      ) {
        todoListDisplay.push(
          <Todo
            key={todoList[i].id}
            todo={todoList[i]}
            editTodoItem={editTodoItem}
            changeIsCompleted={changeIsCompleted}
            deleteTodoItem={deleteTodoItem}
            requestUpdate={requestUpdate}
          />
        );
      }
    }
    return todoListDisplay;
  };
  render() {
    const { loadingState } = this.state;
    return (
      <div className="body">
        <ul
          className="todo-list"
          ref={this.isScroll}
          style={{ maxHeight: "200px", overflowY: "scroll" }}
        >
          {this.displayTodoList()}
        </ul>
        {loadingState ? <p className="load">Loading more todo...</p> : ""}
      </div>
    );
  }
}

TodoList.propTypes = {
  todoList: propstypes.array,
  myOption: propstypes.string,
  editTodoItem: propstypes.func,
  changeIsCompleted: propstypes.func,
  deleteTodoItem: propstypes.func,
  requestUpdate: propstypes.func,
}
export default TodoList;
