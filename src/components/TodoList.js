import React from 'react';
import TodoItem from './TodoItem';
import { AnimatePresence, motion } from 'framer-motion';

const TodoList = ({ todos, toggleComplete, deleteTodo }) => {
  return (
    <AnimatePresence>
      {todos.length === 0 ? (
        <p>No tasks yet. Add one!</p>
      ) : (
        todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: -20 }} // Start state
            animate={{ opacity: 1, y: 0 }}    // Animate to visible
            exit={{ opacity: 0, y: 20 }}      // Exit animation
            transition={{ duration: 0.3 }}
          >
            <TodoItem todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          </motion.div>
        ))
      )}
    </AnimatePresence>
  );
};

export default TodoList;
