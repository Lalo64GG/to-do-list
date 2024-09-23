export const Task = ({ todo, toggleComplete, deleteTodo }) => {
    return (
      <div className="rounded-lg shadow-md bg-gray-700 w-64 h-auto p-5 text-gray-300 flex flex-col justify-between">
        <div>
          <h2 className={`text-xl font-semibold mb-2 ${todo.completed ? 'text-green-400' : 'text-red-400'}`}>
            {todo.completed ? 'Tarea completada' : 'Tarea pendiente'}
          </h2>
          <p className="mb-4 truncate">
            <span className="font-light">Descripción:</span> {todo.text}
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-light">Tarea creada por:</span> {todo.creator || 'Anónimo'}
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className={`px-4 py-2 rounded-md shadow-md text-white ${todo.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            onClick={toggleComplete}
          >
            {todo.completed ? 'Desmarcar' : 'Completar'}
          </button>
          <button
            className="px-4 py-2 rounded-md shadow-md bg-red-500 hover:bg-red-600 text-white"
            onClick={deleteTodo}
          >
            Eliminar
          </button>
        </div>
      </div>
    );
  };
  