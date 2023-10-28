import "../assets/css/Footer.css";
import React from "react";
import { options, background, ThemeContext } from "../App";
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
      <ThemeContext>
        {({ theme }) =>
          todoList.length > 0 && (
            <div className={`Footer ${theme === background.dark ? 'backDark' : 'backLight'}`}>
              <div className={`Footer--left ${theme === background.dark ? 'darkFt' : 'lightFt'}`}>
                <p>{cntTodo} items left</p>
                <div className="btns">
                  <button
                    className={`btn ${myOption === options.All ? "act" : ""} ${theme === background.dark ? 'darkBtn' : 'lightBtn'}`}
                    onClick={() => changeOption(options.All)}
                  >
                    All
                  </button>
                  <button
                    className={`btn ${
                      myOption === options.Active ? "act" : ""}
                      ${theme === background.dark ? 'darkBtn' : 'lightBtn'}
                    `}
                    onClick={() => changeOption(options.Active)}
                  >
                    Active
                  </button>
                  <button
                    className={`btn ${
                      myOption === options.Completed ? "act" : ""}
                      ${theme === background.dark ? 'darkBtn' : 'lightBtn'}
                    `}
                    onClick={() => changeOption(options.Completed)}
                  >
                    Completed
                  </button>
                </div>
              </div>
              <div className="Footer--right">
                {todoList.length - cntTodo > 0 && (
                  <button className={`${theme === background.dark ? 'clearDark' : 'clearLight'}`} onClick={deleteAllTodoItem}>
                    Clear completed
                  </button>
                )}
              </div>
            </div>
          )
        }
      </ThemeContext>
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
