import React from "react";
import { Link } from "gatsby";
import useWindowSize from "../../hooks/useWindowSize";

export default function CardRoom({
  image,
  descripcion: { descripcion },
  aireAcondicionado,
  television,
  vistasAlMar,
  title,
  camas,
  wifi,
  numeroHabitacion,
  precio,
}) {
  const { width } = useWindowSize();
  const roomInfo = {
    numeroHabitacion: `${numeroHabitacion}`,
    precio: `${precio}`,
  };
  console.log("card room", precio);
  return width >= 992 ? (
    <div className="card">
      <header className="">
        <h1 className="title is-2">
          {title} - {precio}$
        </h1>
      </header>
      <div id="RoomContent" className="card-content">
        <div id="roomDescription" className="content">
          <div>
            <p>{descripcion}</p>
          </div>
          <hr></hr>
          <div id="roomAssets" className="">
            <p>Camas:&nbsp; {camas} </p>
            <p>Aire Acondicionado:&nbsp; {aireAcondicionado ? "Si" : "No"}</p>
            <p>Vistas al mar:&nbsp; {vistasAlMar ? "Si" : "No"}</p>
            <p>Television:&nbsp; {television ? "Si" : "No"}</p>
            <p>WiFi:&nbsp; {wifi ? "Si" : "No"}</p>
          </div>
        </div>
        <div id="RoomImage" className="image">
          <picture>
            <img src={image.fluid.srcWebp} />
          </picture>
        </div>
      </div>
      <div className="center">
        <Link
          to={`/formulario-reserva/reserva`}
          state={roomInfo}
          className="button green"
        >
          Reservar
        </Link>
      </div>
    </div>
  ) : (
    <div className="card">
      <header className="">
        <h1 className="title is-4">
          {title} - {precio}$
        </h1>
      </header>
      <div id="RoomImage" className="image is-5by3">
        <picture>
          <img src={image.fluid.srcWebp} />
        </picture>
      </div>
      <div id="RoomContent" className="card-content">
        <div id="roomDescription" className="content is-full-width">
          <div>
            <p>{descripcion}</p>
          </div>
          <hr></hr>
          <div id="roomAssets" className="">
            <p>Camas:&nbsp; {camas} </p>
            <p>Aire Acondicionado:&nbsp; {aireAcondicionado ? "Si" : "No"}</p>
            <p>Vistas al mar:&nbsp; {vistasAlMar ? "Si" : "No"}</p>
            <p>Television:&nbsp; {television ? "Si" : "No"}</p>
            <p>WiFi:&nbsp; {wifi ? "Si" : "No"}</p>
          </div>
        </div>
      </div>
      <div className="center">
        <Link
          to={`/formulario-reserva/reserva`}
          state={roomInfo}
          className="button green"
        >
          Reservar
        </Link>
      </div>
    </div>
  );
}
