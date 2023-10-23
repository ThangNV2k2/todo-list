import React from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const options = {
  All: "All",
  Active: "Active",
  Completed: "Completed",
};
export { options };
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: [
        {id: uuidv4(), content: "Đi chợ", isCompleted: false},
        {id: uuidv4(), content: "Nấu cơm", isCompleted: false},
      ],
      myOption: options.All,
      clickUpdate: false,
      idClick: null,
      inputValue: "",
    };
    this.inputRef = React.createRef();
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
    const todo = todoList.find((todo) => todo.id === id);
    todo.content = content;
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
    const newList = todoList.filter((todo) => !todo.isCompleted);
    this.setState({
      todoList: newList,
    });
  };
  changeOption = (option) => {
    this.setState({
      myOption: option,
    });
  };
  requestUpdate = async (id) => {
    const { todoList } = this.state;
    const todo = todoList.find((todo) => todo.id === id);
    await this.setState({
      clickUpdate: true,
      idClick: id,
      inputValue: todo.content,
    });

    this.updateTodoItem();
  };
  updateTodoItem = () => {
    const { inputValue } = this.state;
    this.inputRef.current.value = inputValue;
    this.inputRef.current.focus();
  };
  updateContent = (content) => {
    const { todoList, idClick } = this.state;
    const todo = todoList.find((todo) => todo.id === idClick);
    todo.content = content;
    this.setState({
      todoList,
      clickUpdate: false,
    });
  };
  render() {
    const { todoList, myOption, clickUpdate } = this.state;
    return (
      <div className="container">
        <h1>todos</h1>
        <div className="main">
          <Header
            addTodo={this.addTodo}
            updateTodoItem={this.updateTodoItem}
            inputRef={this.inputRef}
            updateContent={this.updateContent}
            clickUpdate={clickUpdate}
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
    );
  }
}
export default App;
