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
      filterTodoList: [],
      check: false,
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
    const newList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          content,
        };
      }
      return todo;
    });
    this.setState({
      todoList: newList,
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
  todoInCompleted = () => {
    const { todoList } = this.state;
    const newList = todoList.filter((todo) => todo.isCompleted === false);
    this.setState({
      filterTodoList: newList,
      check: false,
    });
  };
  todoCompleted = () => {
    const { todoList } = this.state;
    const newList = todoList.filter((todo) => todo.isCompleted === true);
    this.setState({
      filterTodoList: newList,
      check: true,
    });
  };
  allTodo = () => {
    this.setState({
      filterTodoList: [],
      check: false,
    });
  };
  deleteAllTodoItem = () => {
    const { todoList } = this.state;
    const newList = todoList.filter((todo) => todo.isCompleted === false);
    this.setState({
      todoList: newList,
    });
  }
  render() {
    const { todoList } = this.state;
    const { filterTodoList } = this.state;
    return (
      <div className="container">
        <h1>todos</h1>
        <div className="main">
          <Header addTodo={this.addTodo} />
          {filterTodoList.length > 0 || this.state.check === true ? (
            <TodoList
              todoList={filterTodoList}
              deleteTodoItem={this.deleteTodoItem}
              editTodoItem={this.editTodoItem}
              changeIsCompleted={this.changeIsCompleted}
            />
          ) : (
            <TodoList
              todoList={todoList}
              deleteTodoItem={this.deleteTodoItem}
              editTodoItem={this.editTodoItem}
              changeIsCompleted={this.changeIsCompleted}
            />
          )}
          <Footer
            todoList={todoList}
            todoInCompleted={this.todoInCompleted}
            todoCompleted={this.todoCompleted}
            allTodo={this.allTodo}
            deleteAllTodoItem={this.deleteAllTodoItem}
          />
        </div>
      </div>
    );
  }
}
export default App;
