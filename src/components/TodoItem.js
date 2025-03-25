// src/components/TodoItem.js
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const TodoText = styled.span`
  flex: 1;
  font-size: 16px;
  text-decoration: ${({ $completed }) => ($completed ? 'line-through' : 'none')};
  color: ${({ theme, $completed }) => ($completed ? theme.border : theme.text)};
`;

const DueDateLabel = styled.span`
  margin-left: 10px;
  font-size: 0.9em;
  color: ${({ dueSoon, theme }) => (dueSoon ? "red" : theme.text)};
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.secondary || "#dc3545"};
  cursor: pointer;
  font-size: 16px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.buttonHover || "#a71d2a"};
  }
`;

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  // Check if the todo has a due date and if it is within the next 24 hours.
  let dueSoon = false;
  if (todo.dueDate) {
    const dueDate = new Date(todo.dueDate);
    const now = new Date();
    const timeDiff = dueDate - now;
    // If due date is within the next 24 hours (and not in the past)
    dueSoon = timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 1000;
  }

  return (
    <ItemContainer>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        style={{ marginRight: '10px' }}
      />
      <TodoText $completed={todo.completed}>{todo.text}</TodoText>
      {todo.dueDate && (
        <DueDateLabel dueSoon={dueSoon}>
          {new Date(todo.dueDate).toLocaleDateString()}
        </DueDateLabel>
      )}
      <DeleteButton onClick={() => deleteTodo(todo.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </DeleteButton>
    </ItemContainer>
  );
};

export default TodoItem;
