import "../assets/css/Footer.css";
import React from "react";
import { options } from "../App";
import propstypes from "prop-types";
class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      cntTodo: 0,
    };
  }
  cntInCompleted = () => {
    const { todoList } = this.props;
    let cnt = 0;
    todoList.forEach((e) => {
      if (!e.isCompleted) {
        cnt++;
      }
    });
    this.setState({
      cntTodo: cnt,
    });
  };
  componentDidMount() {
    this.cntInCompleted();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.todoList !== this.props.todoList) {
      this.cntInCompleted();
    }
  }
  render() {
    const { todoList, deleteAllTodoItem, myOption, changeOption } = this.props;
    const { cntTodo } = this.state;
    return (
      todoList.length > 0 && (
        <div className="Footer">
          <div className="Footer--left">
            <p>{cntTodo} items left</p>
            <div className="btns">
              <button
                className={`btn ${myOption === options.All ? "act" : ""}`}
                onClick={() => changeOption(options.All)}
              >
                All
              </button>
              <button
                className={`btn ${myOption === options.Active ? "act" : ""}`}
                onClick={() => changeOption(options.Active)}
              >
                Active
              </button>
              <button
                className={`btn ${myOption === options.Completed ? "act" : ""}`}
                onClick={() => changeOption(options.Completed)}
              >
                Completed
              </button>
            </div>
          </div>
          <div className="Footer--right">
            {todoList.length - cntTodo > 0 && (
              <button className="clear" onClick={deleteAllTodoItem}>
                Clear completed
              </button>
            )}
          </div>
        </div>
      )
    );
  }
}
Footer.propTypes = {
  todoList: propstypes.array,
  deleteAllTodoItem: propstypes.func,
  myOption: propstypes.string,
  changeOption: propstypes.func,
};
export default Footer;