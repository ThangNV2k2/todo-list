import React from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      myOption: "All",
    };
  }
  addTodo = (todo) => {
    const { todoList } = this.state;
    const newList = [todo, ...todoList];
    this.setState({
      todoList: newList,
    });
  };
  deleteTodoItem = (id) => {
    const { todoList } = this.state;
    const newList = todoList.filter((todo) => todo.id !== id);
    this.setState({
      todoList: newList,
    });
  };
  editTodoItem = (id, content) => {
    const { todoList } = this.state;
    const newTodo = todoList.find((todo) => todo.id === id);
    newTodo.content = content;
    this.setState({
      todoList,
    });
  };
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
  deleteAllTodoItem = () => {
    const { todoList } = this.state;
    const newList = todoList.filter((todo) => todo.isCompleted === false);
    this.setState({
      todoList: newList,
    });
  };
  changeOption = (option) => {
    this.setState({
      myOption: option,
    });
  };
  render() {
    const { todoList, myOption } = this.state;
    return (
      <div className="container">
        <h1>todos</h1>
        <div className="main">
          <Header addTodo={this.addTodo} />
          <TodoList
            todoList={todoList}
            myOption={myOption}
            deleteTodoItem={this.deleteTodoItem}
            editTodoItem={this.editTodoItem}
            changeIsCompleted={this.changeIsCompleted}
          />
          <Footer
            todoList={todoList}
            changeOption={this.changeOption}
            deleteAllTodoItem={this.deleteAllTodoItem}
          />
        </div>
      </div>
    );
  }
}
export default App;
