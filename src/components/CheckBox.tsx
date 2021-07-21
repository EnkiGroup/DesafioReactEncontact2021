import React from "react";
import { ITodo } from "../domain/Todo";

export const CheckBox: React.FC<ITodo> = (props) => {
  return (
    <li>
      <input
        key={props.id}
        onClick={() => {}}
        type="checkbox"
        checked={props.isDone ? props.isDone : false}
        value={props.title}
      />
      {props.title}
    </li>
  );
};

export default CheckBox;
