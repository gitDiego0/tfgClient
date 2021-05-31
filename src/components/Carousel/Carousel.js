import React, { useEffect, useState } from "react";

export default function Carousel({ images }) {
  console.log("images", images);
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
      console.log("hola");
    }, 60000);
  });

  return (
    <>
      <section className="container">
        <div className="slider">
          {images2.map(({ image }, index) => {
            console.log("image1", image);
            return (
              <div
                className={
                  index === actual ? "slide active fade" : "slide fade"
                }
                key={index}
              >
                {index > -1 &&
                  (console.log("image", image),
                  (
                    <img
                      className="slider-image"
                      src={image.fluid.srcWebp}
                      alt={image.title}
                    />
                  ))}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
