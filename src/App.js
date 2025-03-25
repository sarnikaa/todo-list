// src/App.js
import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyle } from "./GlobalStyle";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Confetti from "react-confetti";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  max-width: 600px;
  margin: 30px auto;
  background: ${({ theme }) => theme.background};
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ToggleButton = styled.button`
  padding: 8px 12px;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const FilterButton = styled.button`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.background};
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  color: ${({ theme }) => theme.text};

  ${({ $active, theme }) =>
    $active &&
    `
      background-color: ${theme.primary};
      color: #fff;
    `}

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
  }
`;

const ClearCompleted = styled.div`
  margin-top: 20px;
  text-align: center;

  button {
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.primary};
    border: none;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.buttonHover};
    }
  }
`;

function App() {
  // Lazy initialize todos from localStorage:
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    console.log("Loaded todos:", storedTodos);
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [isDark, setIsDark] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showConfetti, setShowConfetti] = useState(false);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    console.log("Saving todos:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  // Display confetti for 5 seconds when a task is completed
  const triggerCelebration = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const toggleComplete = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          if (!todo.completed) {
            triggerCelebration();
          }
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const getFilteredTodos = () => {
    if (filter === "active") return todos.filter(todo => !todo.completed);
    if (filter === "completed") return todos.filter(todo => todo.completed);
    return todos;
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}
      <Container>
        <Header>
          <h2>Todo List</h2>
          <ToggleButton onClick={toggleTheme}>
            {isDark ? (
              <FontAwesomeIcon icon={faSun} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faMoon} size="lg" />
            )}
          </ToggleButton>
        </Header>
        <TodoInput addTodo={addTodo} />
        <TodoList
          todos={getFilteredTodos()}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
        <Filters>
          <FilterButton onClick={() => setFilter("all")} $active={filter === "all"}>
            All
          </FilterButton>
          <FilterButton onClick={() => setFilter("active")} $active={filter === "active"}>
            Active
          </FilterButton>
          <FilterButton onClick={() => setFilter("completed")} $active={filter === "completed"}>
            Completed
          </FilterButton>
        </Filters>
        <ClearCompleted>
          <button onClick={clearCompleted}>Clear Completed</button>
        </ClearCompleted>
      </Container>
    </ThemeProvider>
  );
}

export default App;
