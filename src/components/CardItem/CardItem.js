import React from "react";

export default function CardItem({ imagen, precio, nombre }) {
  console.log("nombre: ", nombre);
  return (
    <div className="column is-one-quarter">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title ">{nombre}</p>
        </header>
        <div className="card-content">
          <div className="content">
            <img
              className="image"
              style={{ maxHeight: 72 + "px" }}
              src={imagen}
            />
          </div>
        </div>
        <footer className="card-footer">
          <p className="card-footer-item">{precio}€</p>
        </footer>
      </div>
    </div>
  );
}
