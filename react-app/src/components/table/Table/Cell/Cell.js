import React, { useState } from "react";
import { Button, Modal, Dropdown, Input } from "semantic-ui-react";
import "./Cell.scss";
import {setCell} from "../../../../services/http";
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from "@material-ui/core/Snackbar";

const colorOptions = [
  { key: 1, text: "Занятие", value: "red" },
  { key: 2, text: "Дедлайн", value: "yellow" },
  { key: 3, text: "В работе", value: "blue" },
  { key: 4, text: "В ожидании", value: "gray" },
  { key: 5, text: "Нет", value: "white" }
];

const statusOptions = [
  { key: 1, text: "Дизайн (Д)", value: "Д" },
  { key: 2, text: "Варианты использования (ВИ)", value: "ВИ" },
  { key: 3, text: "Требования (ТР)", value: "ТР" },
  { key: 4, text: "Архитектура (АР)", value: "АР" },
  { key: 5, text: "Алгоритмы (АЛ)", value: "АЛ" },
  { key: 6, text: "Разработка тестов (РТ)", value: "РТ" },
  { key: 7, text: "Тестирование (Т)", value: "Т" },
  { key: 8, text: "Кодирование (К)", value: "К" },
  { key: 9, text: "Руководство пользователя (РП)", value: "РП" },
  { key: 10, text: "Проект (П)", value: "П" },
  { key: 11, text: "Нет", value: "" },
];

function Cell({ tableName, content = "", color = "gray", date, valueId, user }) {
  let dateString = new Date(date);

  const [state, setState] = useState({
    isDisabled: dateString.toString().split(' ')[0] === 'Sun',
    visible: false,
    color: user.role === "Оформление результатов" ? "blue" : color,
    content: content,
    snackOpen: false,
    snackText: ''
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
    setState({ ...state, visible: false, snackOpen: true, snackText: 'Ячейка сохранена' });
  };

  if (state.isDisabled) {
    return (
        <td className={'white inactive'}></td>
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
            <Dropdown
                value={state.content}
                placeholder="ВИ"
                options={statusOptions}
                onChange={(e, data) => setState({ ...state, content: data.value })}
                selection
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

      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={state.snackOpen}
          autoHideDuration={1000}
          onClose={() => setState({...state, snackOpen: false, snackText: ''})}
          message={<span>{state.snackText}</span>}
      />
    </React.Fragment>
  );
}

export default Cell;
