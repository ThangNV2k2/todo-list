import "../assets/css/Footer.css";
import React from "react";

export default class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      cntTodo: 0
    };
  }
  cntInCompleted = () => {
    const { todoList } = this.props;
    let cnt = 0;
    todoList.forEach((element) => {
      if (!element.isCompleted) {
        cnt++;
      }
    });
    this.setState({
      cntTodo: cnt,
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.todoList !== this.props.todoList) {
      this.cntInCompleted();
    }
  }
  render() {
    const { todoList } = this.props;
    const { cntTodo } = this.state;
    return (
      todoList.length > 0 && (
        <div className="Footer">
          <p>{this.state.cntTodo} items left</p>
          <div className="btns">
            <button className="btn" onClick={this.props.allTodo}>
              All
            </button>
            <button className="btn" onClick={this.props.todoInCompleted}>
              Active
            </button>
            <button className="btn" onClick={this.props.todoCompleted}>
              Completed
            </button>
          </div>
          {
              (todoList.length -  cntTodo) > 0 && (
                <button className="clear" onClick={this.props.deleteAllTodoItem}>
                  Clear completed
                </button>
              )
            }
        </div>
      )
    );
  }
}
