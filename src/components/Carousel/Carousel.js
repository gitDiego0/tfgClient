import React, { useEffect, useState } from "react";

export default function Carousel({ images }) {
  const [actual, setActual] = useState(0);
  const [images2, setImages] = useState(images);
  const length = images.length;

  const slideImage = () => {
    // setActual(actual === length - 1 ? 0 : actual + 1);
    setActual((actual + 1) % length);
  };

  useEffect(() => {
    setTimeout(() => {
      slideImage();
    }, 60000);
  });

  return (
    <>
      <section className="container">
        <div className="slider">
          {images2.map(({ image }, index) => {
            return (
              <div
                className={
                  index === actual ? "slide active fade" : "slide fade"
                }
                key={index}
              >
                {index > -1 && (
                  <img
                    className="slider-image"
                    src={image.fluid.srcWebp}
                    alt={image.title}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
