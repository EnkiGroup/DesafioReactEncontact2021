import React, { useCallback, useState } from "react";
import { ACTION_EDIT_MODE } from "../app";

import { ITodo } from "../domain/Todo";
import { SCFormEdit, SCItemTODO } from "../styles/appStyle";
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
  const [hoverItem, setHoverItem] = useState(false);

  const onMouseLeave = useCallback(() => {
    setHoverItem(false);
    props.onControllerEditMode(ACTION_EDIT_MODE.Remove);
  }, [props]);

  const onMouseEnter = useCallback(() => {
    setHoverItem(true);
  }, []);

  return (
    <SCItemTODO
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      id={props.editMode ? "editMode" : ""}
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

      <div style={{ width: "100%", flex: 1 }}>
        {!props.editMode && (
          <label
            style={{
              textDecoration: props.value.isDone ? "line-through" : "none",
            }}
          >
            {props.value.title}
          </label>
        )}

        {props.editMode && (
          <SCFormEdit
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
              id={props.editMode && "edited"}
            />
            <button style={{ display: "none" }} type="submit">
              enviar
            </button>
          </SCFormEdit>
        )}
      </div>

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
