import React from "react";
import { ACTION_EDIT_MODE } from "../app";

import { ITodo } from "../domain/Todo";
import { SCForm, SCItemTODO } from "../styles/appStyle";
import Input from "./input";

import { FcEmptyTrash } from "react-icons/fc";

interface PropsItemTodo {
  value: ITodo;
  onUpdateStatus: Function;
  onUpdateTitle: Function;
  onControllerEditMode: Function;
  editMode: boolean;
}

const ItemTodo: React.FC<PropsItemTodo> = (props) => {
  return (
    <SCItemTODO
      style={{ backgroundColor: props.editMode ? "#f8f3f2" : "#fff" }}
    >
      <input
        key={props.value.id}
        onClick={() => {
          props.onUpdateStatus(props.value);
        }}
        type="checkbox"
        checked={props.value.isDone}
        value={props.value.title}
      />
      <label
        style={{
          display: props.editMode ? "none" : "block",
          textDecoration: props.value.isDone ? "line-through" : "none",
        }}
      >
        {props.value.title}
      </label>
      {props.editMode && (
        <SCForm
          onSubmit={(data: { id: string; title: string }) => {
            props.onUpdateTitle({
              id: props.value.id,
              title: data.title,
            });
            props.onControllerEditMode(ACTION_EDIT_MODE.Remove);
          }}
        >
          <Input
            name="id"
            type="text"
            defaultValue={props.value.id}
            style={{ display: "none" }}
          />
          <Input
            name="title"
            type="text"
            defaultValue={props.value.title}
            style={{ backgroundColor: props.editMode ? "#f8f3f2" : "#fff" }}
          />
          <button style={{ display: "none" }} type="submit">
            enviar
          </button>
        </SCForm>
      )}

      <FcEmptyTrash />
    </SCItemTODO>
  );
};

export default ItemTodo;
