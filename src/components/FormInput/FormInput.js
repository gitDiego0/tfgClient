import React, { useReducer } from "react";
import ComponentList from "../../utils/ComponentList";

export default function FormInput(props) {
  const { inputs } = props;

  const handleChange = (event) => {
    props.onChange({ [event.target.name]: event.target.value });
  };
  return (
    <div className="field">
      {inputs.map((item, index) => {
        const Component = item.__typename;
        return Component === "ContentfulItemLabelTag" ? (
          <label id={item.name} className="label" key={index}>
            {item.text}
          </label>
        ) : item.type === "textarea" ? (
          item.required ? (
            <textarea
              id={item.title}
              className="textarea has-fixed-size"
              name={item.name}
              placeholder={item.placeholder}
              onChange={handleChange}
            ></textarea>
          ) : (
            <textarea
              id={item.title}
              className="textarea"
              name={item.name}
              placeholder={item.placeholder}
              onChange={handleChange}
            ></textarea>
          )
        ) : item.required ? (
          <input
            id={item.title}
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            className="input"
            onChange={handleChange}
            key={index}
            required
          />
        ) : (
          <input
            id={item.title}
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            className="input"
            onChange={handleChange}
            key={index}
          />
        );
      })}
    </div>
  );
}
