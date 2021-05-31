import React, { useReducer } from "react";
import ComponentList from "../../utils/ComponentList";

export default function FormInput({ inputs }, props) {
  console.log(props)
  return (
    <div className="field">
      {/* {inputs.map((input, index) => {
        const Component = ComponentList[input.__typename];
        return Component ? <Component key={index} {...input} /> : null;
      })} */}

      {inputs.map((item, index) => {
        const Component = item.__typename;
        console.log("item form: ", item);
        return Component === "ContentfulItemLabelTag" ? (
          <label id={item.name} className="label">
            {item.text}
          </label>
        ) : (
          <input
            id={item.name}
            type={item.type}
            placeholder={item.placeholder}
            className="input"
            onChange={(event) => props.onChange(event.target.value)}
          />
        );
      })}
    </div>
  );
}
