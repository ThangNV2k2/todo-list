import React from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import Theme from "./components/Theme";
import { ThemeContext } from "./components/ThemeProvider";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

export const options = {
  All: "All",
  Active: "Active",
  Completed: "Completed",
};
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: [
        { id: uuidv4(), content: "Đi chợ", isCompleted: false },
        { id: uuidv4(), content: "Nấu cơm", isCompleted: false },
      ],
      myOption: options.All,
    };
    this.headerRef = React.createRef();
  }
  // thêm 1 todo vào todoList
  addTodo = (todo) => {
    const { todoList } = this.state;
    const newList = [todo, ...todoList];
    this.setState({
      todoList: newList,
    });
  };
  // xóa 1 todo khỏi todoList
  deleteTodoItem = (id) => {
    const { todoList } = this.state;
    const newList = todoList.filter((todo) => todo.id !== id);
    this.setState({
      todoList: newList,
    });
  };
  // sửa 1 todo trong todoList
  editTodoItem = (id, content) => {
    const { todoList } = this.state;
    const todo = todoList.find((todo) => todo.id === id);
    todo.content = content;
    this.setState({
      todoList,
    });
  };
  // thay đổi trạng thái hoàn thành của 1 todo trong todoList
  changeIsCompleted = (id) => {
    const { todoList } = this.state;
    const newList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.setState({
      todoList: newList,
    });
  };
  // xóa tất cả các todo đã hoàn thành
  deleteAllTodoItem = () => {
    const { todoList } = this.state;
    const newList = todoList.filter((todo) => !todo.isCompleted);
    this.setState({
      todoList: newList,
    });
  };
  // thay đổi option
  changeOption = (option) => {
    this.setState({ myOption: option });
  };

  // sửa content của 1 todo
  requestUpdate = (id) => this.headerRef.current.changeIdUpdate(id);
  contentTodo = (id) => {
    const todo = this.state.todoList.find((todo) => todo.id === id);
    return todo.content;
  };
  render() {
    const { todoList, myOption } = this.state;
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={`container ${theme}`}>
            <Theme />
            <h1>todos</h1>
            <div className="main">
              <Header
                addTodo={this.addTodo}
                ref={this.headerRef}
                requestUpdate={this.requestUpdate}
                editTodoItem={this.editTodoItem}
                contentTodo={this.contentTodo}
              />
              <TodoList
                todoList={todoList}
                myOption={myOption}
                deleteTodoItem={this.deleteTodoItem}
                editTodoItem={this.editTodoItem}
                changeIsCompleted={this.changeIsCompleted}
                requestUpdate={this.requestUpdate}
              />
              <Footer
                todoList={todoList}
                myOption={myOption}
                changeOption={this.changeOption}
                deleteAllTodoItem={this.deleteAllTodoItem}
              />
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
export default App;
