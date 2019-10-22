import React, { useState } from "react";
import { Button, Modal, Dropdown, Input } from "semantic-ui-react";
import "./Cell.scss";

function Cell({ content, color, date, valueId, user }) {
  let dateString = new Date(date);
  if (content === "RD") console.log(content, color, date, valueId, user);

  const [modalState, setModalState] = useState(false);

  const colorOptions = [
    { key: 1, text: "Красный", value: "red" },
    { key: 2, text: "Желтый", value: "yellow" },
    { key: 3, text: "Голубой", value: "blue" },
    { key: 4, text: "Серый", value: "gray" }
  ];

  const save = () => {};

  return (
    <React.Fragment>
      <td onClick={() => setModalState(!modalState)} className={color}>
        {content}
      </td>
      <Modal
        className="cell-edit-modal"
        size="mini"
        open={modalState}
        onClose={() => setModalState(false)}
      >
        <Modal.Content>
          <h3>
            {user.name}, {user.role} ({dateString.toLocaleDateString()})
          </h3>
          <div className="field">
            <h4>Цвет</h4>
            <Dropdown
              value={color}
              placeholder="Цвет"
              options={colorOptions}
              selection
            />
          </div>
          <div className="field">
            <h4>Примечание</h4>
            <Input type="text" value={content} placeholder="ВИ" maxLength="2" />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModalState(false)}>Отмена</Button>
          <Button onClick={save()} positive>
            Сохранить
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
}

export default Cell;
