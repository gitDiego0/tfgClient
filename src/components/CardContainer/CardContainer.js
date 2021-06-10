import React from "react";
import Card from "../Card/Card";
import ComponentList from "../../utils/ComponentList";

export default function CardContainer({ cards }) {
  return (
    <div className="container">
      {cards.map((card, index) => {
        const Component = ComponentList[card.__typename];
        return Component ? <Component key={index} {...card} /> : null;
      })}
    </div>
  );
}
