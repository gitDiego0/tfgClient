import React from "react";

export default function Label({ name, text, title }) {
  return (
    <label id={name} className="label">
      {text}
    </label>
  );
}
