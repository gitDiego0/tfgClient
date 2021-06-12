import React from "react";
import { Link } from "gatsby";

export default function Footer({
  logo: { logo },
  title,
  telefono,
  email,
  direccion,
}) {
  return (
    <>
      <footer className="footer">
        <div className="content ">
          <div className="columns">
            <div className=" column logo">
              <img src={logo.fluid.srcWebp} />
            </div>
            <div className=" column contact">
              <div>
                <p>Contacto</p>
              </div>
              <div>
                <ul>
                  <li>{direccion}</li>
                  <li>{telefono}</li>
                  <li>{email}</li>
                </ul>
              </div>
            </div>
            <div className=" column">
              <div className="buttonContainer">
                <Link to="/hostal" className="button is-fullwidth">
                  {" "}
                  Reservar habitacion{" "}
                </Link>
                <Link to="/restaurante" className="button is-fullwidth">
                  Visita el restaurante
                </Link>
                <Link to="/sobre-nosotros" className="button is-fullwidth">
                  Sobre nosotros
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
