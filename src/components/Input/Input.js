import React from "react";

export default function Label({ name, placeholder, type, required, title }) {
  return required ? (
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      className="input"
      required
    />
  ) : (
    <input id={name} type={type} placeholder={placeholder} className="input" />
  );
}
