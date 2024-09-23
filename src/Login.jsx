import React from "react";
import { useInputValidation } from "./useInputValidation";
import { supabase } from "./supabaseClient";

export const Login = () => {
  const email = useInputValidation();
  const password = useInputValidation();

 
  const handleLogin = async () => {
    // Validar los campos de email y password
    email.validate();
    password.validate();

    if (email.isInvalid || password.isInvalid) {
      return; // Si hay algún campo inválido, no se procede
    }

    try {
      console.log(password.value, email.value);

      // Realiza la consulta a la tabla `users` usando solo el email
      const { data: user, error } = await supabase
        .from("users")
        .select("email")
        .eq("email", email.value.trim())
        .single();

      if (error) {
        // Si ocurre un error en la consulta, se maneja aquí
        console.error("Error logging in:", error);
        alert("Email incorrecto.");
        return;
      }

      if (user) {
        // Si se encontró un usuario, procede con el login
        console.log("Email encontrado", user);
        // Aquí puedes realizar alguna acción adicional como redirigir al dashboard
      }
    } catch (err) {
      // Manejo de errores inesperados
      console.error("Unexpected error:", err);
      alert("Ocurrió un error inesperado. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center mx-suto bg-gray-100">
      <div className="w-full lg:w-6/12 flex flex-col items-center p-4 mt-10 lg:mt-0 order-1 lg:order-2">
        <form
          className="bg-white rounded-md shadow-lg p-8 w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                email.isInvalid ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              onChange={(e) => email.setValue(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                password.isInvalid ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
              onChange={(e) => password.setValue(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-blue-600 transition-colors hover:bg-red-600 p-2 text-white rounded-md"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
