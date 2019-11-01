import React, { useState } from "react";
import { Button, Modal, Dropdown, Input } from "semantic-ui-react";
import "./Cell.scss";
import {setCell} from "../../../../services/http";

const colorOptions = [
  { key: 1, text: "Красный", value: "red" },
  { key: 2, text: "Желтый", value: "yellow" },
  { key: 3, text: "Голубой", value: "blue" },
  { key: 4, text: "Серый", value: "gray" },
  { key: 5, text: "Белый", value: "white" }
];

function Cell({ tableName, content = "", color = "", date, valueId, user }) {
  let dateString = new Date(date);

  // if (content === "13") {
  //   console.log(content, color, date, valueId, user);
  // }

  const [state, setState] = useState({
    isDisabled: dateString.toString().split(' ')[0] === 'Sun',
    visible: false,
    color: color,
    content: content
  });

  const save = async () => {
    console.log(tableName, date, user.id, state.color, state.content);

    let res = await setCell(
      tableName,
      date,
      user.id,
      state.color,
      state.content
    );
    console.log(res);
    setState({ ...state, visible: false });
  };

  if (state.isDisabled) {
    return (
        <td className={'red'}></td>
    )
  } else
  return (
    <React.Fragment>
      <td
        onClick={() => setState({ ...state, visible: true })}
        className={state.color}
      >
        {state.content}
      </td>
      <Modal
        className="cell-edit-modal"
        size="mini"
        open={state.visible}
        onClose={() =>
          setState({ color: color, content: content, visible: false })
        }
      >
        <Modal.Content>
          <h3>
            {user.name}, {user.role} ({dateString.toLocaleDateString()})
          </h3>
          <div className="field">
            <h4>Цвет</h4>
            <Dropdown
              value={state.color}
              placeholder="Цвет"
              options={colorOptions}
              onChange={(e, data) => setState({ ...state, color: data.value })}
              selection
            />
          </div>
          <div className="field">
            <h4>Примечание</h4>
            <Input
              type="text"
              onChange={e => setState({ ...state, content: e.target.value })}
              value={state.content}
              placeholder="ВИ"
              maxLength="2"
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() =>
              setState({ color: color, content: content, visible: false })
            }
          >
            Отмена
          </Button>
          <Button onClick={save} positive>
            Сохранить
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
}

export default Cell;
