import React, { createContext, useReducer } from "react";

export const roomContext = createContext({
  numeroHabitacion: "",
  precio: 0,
  fechaEntrada: "",
  fechaSalida: "",
});

export const generalContext = createContext({
  header: "",
  footer: "",
});
