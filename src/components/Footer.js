import "../assets/css/Footer.css";
import React from "react";

export default class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      cntTodo: 0,
      activeOption: "All",
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
  changeOption = (option) => {
    this.setState({
      activeOption: option,
    });
    this.props.changeOption(option);
  }
  render() {
    const { todoList, deleteAllTodoItem } = this.props;
    const { cntTodo, activeOption } = this.state;
    return (
      todoList.length > 0 && (
        <div className="Footer">
          <div className="Footer--left">
            <p>{cntTodo} items left</p>
            <div className="btns">
              <button className={`btn ${activeOption === "All" ? "act" : ""}`} onClick={() => this.changeOption("All")}>
                All
              </button>
              <button className={`btn ${activeOption === "Active" ? "act" : ""}`} onClick={() => this.changeOption("Active")}>
                Active
              </button>
              <button className={`btn ${activeOption === "Completed" ? "act" : ""}`} onClick={() => this.changeOption("Completed")}>
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
