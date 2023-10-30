import React from "react";
import Todo from "./Todo";
import "../assets/css/TodoList.css";
import { options } from "../App";
import { ThemeContext } from "./ThemeProvider";
import propstypes from "prop-types";
import { withScroll } from "../HOC/withScroll";

class TodoList extends React.Component {
  displayTodoList = () => {
    const {
      todoList,
      myOption,
      editTodoItem,
      changeIsCompleted,
      deleteTodoItem,
      requestUpdate,
      numberTodo,
    } = this.props;
    const todoListDisplay = [];
    for (let i = 0; i < numberTodo; i++) {
      if (
        todoList[i] &&
        todoList[i].id &&
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
    const { loadingState, isScroll } = this.props;
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={`${theme}`}>
            <ul
              className="todo-list"
              ref={isScroll}
              style={{ maxHeight: "200px", overflowY: "scroll" }}
            >
              {this.displayTodoList()}
            </ul>
            {loadingState ? <p className="loading">Loading more todo...</p> : ""}
          </div>
        )}
      </ThemeContext.Consumer>
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
  numberTodo: propstypes.number,
  loadingState: propstypes.bool,
  isScroll: propstypes.object,
};
export default withScroll(TodoList, 4);
