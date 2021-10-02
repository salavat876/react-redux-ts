import React from 'react';
import UserList from "./components/UserList";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
        <h1>React-redux application on ts</h1>
        <UserList/>
        <hr/>
        <TodoList/>
    </div>
  );
}

export default App;
