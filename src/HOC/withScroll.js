import React from "react";

let isGetting = false;
export const withScroll = (WrappedComponent, numberTodo) => {
  return class extends React.Component {
    constructor() {
      super();
      this.isScroll = React.createRef();
      this.state = {
        numberTodo: numberTodo,
        loadingState: false,
      };
    }
    componentDidMount() {
      this.isScroll.current?.addEventListener("scroll", () => {
        if (
          this.isScroll.current.scrollTop +
            this.isScroll.current.clientHeight >=
            this.isScroll.current.scrollHeight - 10 &&
          !isGetting
        ) {
          const { numberTodo } = this.state;
          isGetting = true;
          if (numberTodo >= this.props.todoList.length) {
            return;
          }
          this.setState({ loadingState: true });
          setTimeout(() => {
            isGetting = false;
            this.setState({
              numberTodo: numberTodo + 4,
              loadingState: false,
            });
          }, 1000);
        }
      });
    }
    render() {
      const { loadingState, numberTodo } = this.state;
      return (
        <WrappedComponent
          numberTodo={numberTodo}
          loadingState={loadingState}
          isScroll={this.isScroll}
          {...this.props}
        />
      );
    }
  };
};
