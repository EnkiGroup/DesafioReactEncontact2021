import React, { useCallback, useRef, useState } from "react";
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
  onDeleteItem: Function;
  editMode: boolean;
}

const ItemTodo: React.FC<PropsItemTodo> = (props) => {
  const refName = useRef(null);
  const [hoverItem, setHoverItem] = useState(false);

  const onMouseLeave = useCallback(() => {
    setHoverItem(false);
    props.onControllerEditMode(ACTION_EDIT_MODE.Remove);
  }, [props]);

  const onMouseEnter = useCallback(() => {
    setHoverItem(true);
  }, []);

  const selectAllText = (e: any) => {
    /* @ts-ignore */
    e.target.select();
  };

  return (
    <SCItemTODO
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onFocus={selectAllText}
      style={{ backgroundColor: props.editMode ? "#f1edec" : "#fff" }}
    >
      <input
        key={props.value.id}
        onClick={() => {
          props.onUpdateStatus(props.value);
        }}
        type="checkbox"
        onChange={() => {}}
        checked={props.value.isDone ? props.value.isDone : false}
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
            ref={refName}
            defaultValue={props.value.title}
            style={{ backgroundColor: props.editMode ? "#f1edec" : "#fff" }}
          />
          <button style={{ display: "none" }} type="submit">
            enviar
          </button>
        </SCForm>
      )}

      {hoverItem && (
        <FcEmptyTrash
          onClick={() => {
            props.onDeleteItem(props.value);
          }}
        />
      )}
    </SCItemTODO>
  );
};

export default ItemTodo;
