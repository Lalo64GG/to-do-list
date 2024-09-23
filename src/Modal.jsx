import React, { useState } from "react";

export const Modal = ({ isOpen, onClose, onAdd, input, setInput }) => {
  if (!isOpen) return null;

  const [creatorName, setCreatorName] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const newTask = {
      description: input,
      creator: creatorName, 
    };

    onAdd(newTask); 
    setInput(''); 
    setCreatorName(''); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Agregar Nueva Tarea</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
            placeholder="Descripción de la tarea"
            required
          />
          <input
            type="text"
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
            placeholder="Tu nombre"
            required
          />
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-400 text-white rounded-md p-2 hover:bg-gray-500"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
