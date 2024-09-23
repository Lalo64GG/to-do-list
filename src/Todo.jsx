import React, { useState, useEffect } from 'react';
import { Task } from './Task';
import { Modal } from './Modal';
import { supabase } from './supabaseClient'; // Importa tu cliente Supabase

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) {
        console.error('Error fetching tasks:', error);
      } else {
        setTodos(data);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (input.trim()) {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ text: input, completed: false }]);
      
      if (error) {
        console.error('Error adding task:', error);
      } else {
        setInput('');
        setIsModalOpen(false);
        setSuccessMessage("Tarea agregada correctamente, recargue la pagina"); // Muestra el mensaje de éxito
        setTimeout(() => setSuccessMessage(''), 3000); // Oculta el mensaje después de 3 segundos
      }
    }
  };

  const toggleComplete = async (index) => {
    const todo = todos[index];
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !todo.completed })
      .eq('id', todo.id);
    
    if (error) {
      console.error('Error updating task:', error);
    } else {
      const updatedTodos = todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
    }
  };

  const deleteTodo = async (index) => {
    const todo = todos[index];
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', todo.id);
    
    if (error) {
      console.error('Error deleting task:', error);
    } else {
      setTodos(todos.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full py-10 bg-gray-900 px-5">
      <div className="bg-gray-800 shadow-lg h-full rounded-lg p-6 w-full">
        <h1 className="text-center text-2xl font-bold text-gray-300 mb-4">To-Do List</h1>
        
        {/* Mostrar el mensaje de éxito */}
        {successMessage && (
          <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}

        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 rounded-md shadow-md p-2 hover:bg-blue-700 text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Add Task
          </button>
        </div>

        <div className="mt-2 flex flex-wrap justify-center items-center gap-4">
          {todos.map((todo, index) => (
            <Task 
              key={todo.id} // Cambia a usar el ID de Supabase
              todo={todo} 
              toggleComplete={() => toggleComplete(index)} 
              deleteTodo={() => deleteTodo(index)}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() =>{ window.location.reload(); }}
        onAdd={addTodo}
        input={input}
        setInput={setInput}
      />
    </div>
  );
};