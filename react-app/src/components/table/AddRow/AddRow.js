import React, {useState} from 'react';
import {Button, Dropdown, Input, Modal} from "semantic-ui-react";
import {addPerson} from "../../../services/http";

export default function AddRow ({tableName}) {
    const [state, setState] = useState({
        isOpen: false,
        userName: '',
        role: ''
    })

    const save = async () => {
        let res = await addPerson(tableName, state.userName, state.role);
        setState({ userName: '', role: '', isOpen: false });
        console.log(res)
    }

    return (
        <React.Fragment>
            <Button onClick={() => setState({...state, isOpen: true})} color='green'>Добавить строку</Button>
            <Modal
                className="cell-edit-modal"
                size="mini"
                open={state.isOpen}
                onClose={() =>
                    setState({ userName: '', role: '', isOpen: false })
                }
            >
                <Modal.Content>
                    <h3>
                        Добавить строку
                    </h3>
                    <div className="field">
                        <h4>Вид деятельности</h4>
                        <Input
                            type="text"
                            onChange={e => setState({ ...state, role: e.target.value })}
                            value={state.role}
                            placeholder="Вид деятельности"
                            maxLength="20"
                        />
                    </div>
                    <div className="field">
                        <h4>Ответственный</h4>
                        <Input
                            type="text"
                            onChange={e => setState({ ...state, userName: e.target.value })}
                            value={state.userName}
                            placeholder="Ответственный"
                            maxLength="20"
                        />
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        onClick={() =>
                            setState({ userName: '', role: '', isOpen: false })
                        }
                    >
                        Отмена
                    </Button>
                    <Button onClick={save} positive>
                        Добавить
                    </Button>
                </Modal.Actions>
            </Modal>
        </React.Fragment>

    )
}
