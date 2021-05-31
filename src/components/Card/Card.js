import React from "react";
import useWindowSize from "../../hooks/useWindowSize";

export default function Card({
  textLeft,
  textRight,
  imageAbove,
  image,
  content,
  header,
}) {
  const {width} = useWindowSize(); 
  console.log("Cards content", width);
  return (
    width >=768 ?
    <div className="card">
      {imageAbove ? (
        <>
          <div className="card-image">
            <div className="image is-3by1">
              <img alt="imagen" src={image.fluid.srcWebp} />
            </div>
          </div>
          {header ? (
            <div className="card-header">
              <p className=" title is-2 card-header-title is-centered">
                {header}
              </p>
            </div>
          ) : (
            <></>
          )}
          <div className="card-content">
            <div className="content is-center">
              <p>{content.content}</p>
            </div>
          </div>
        </>
      ) : textLeft ? (
        <>
          {header ? (
            <div className="card-header">
              <p className=" title is-2 card-header-title is-centered">
                {header}
              </p>
            </div>
          ) : (
            <></>
          )}
          <div className="card-content">
            <div className="content">
              <p>{content.content}</p>
            </div>
            {image ? (
              <div className="image">
                <img alt="imagen" src={image.fluid.srcWebp} />
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <>
          {header ? (
            <div className="card-header">
              <p className=" title is-2 card-header-title is-centered">
                {header}
              </p>
            </div>
          ) : (
            <></>
          )}
          <div className="card-content">
            {image ? (
              <div className="image">
                <img alt="imagen" src={image.fluid.srcWebp} />
              </div>
            ) : null}
            <div className="content">
              <p>{content.content}</p>
            </div>
          </div>
        </>
      )}
    </div>
    : width<768 ?
    <div className="card">

      <>
        <div className="card-image">
          <div className="image is-3by1">
            <img alt="imagen" src={image.fluid.srcWebp} />
          </div>
        </div>
        {header ? (
          <div className="card-header">
            <p className=" title is-4 card-header-title is-centered">
              {header}
            </p>
          </div>
        ) : (
          <></>
          )}
        <div className="card-content">
          <div className="content is-center">
            <p>{content.content}</p>
          </div>
        </div>
    </> 
          </div>
  : <p>adios</p> 
  );
}
