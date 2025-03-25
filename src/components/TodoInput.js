// src/components/TodoInput.js
import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  background-color: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 10px 20px;
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

const TodoInput = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    addTodo(text);
    setText("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a task..."
      />
      <Button type="submit">Add</Button>
    </Form>
  );
};

export default TodoInput;
