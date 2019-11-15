import React, {useState} from 'react';
import './TablesControl.scss';
import {Button, Confirm, Input} from "semantic-ui-react";
import Snackbar from "@material-ui/core/Snackbar";

export default function TablesControl ({tableName}) {
    const [state, setState] = React.useState({
        snackOpen: false,
        snackText: '',
        confirm: false
    })

    const exit = () => {
        document.location.href = '/'
    }

    return (
        <React.Fragment>
            <div className="tables-control">
                <div className="name">
                    <h2>{tableName}</h2>
                </div>
                <div className="link">
                    <Input
                        value={document.location.href}
                        placeholder="Название таблицы..." type="text" />
                </div>
                <div className="actions">
                    <Button onClick={() => setState({...state, snackOpen: true, snackText: 'Изменения сохранены'})} color="blue">
                        Сохранить
                    </Button>
                    <Button onClick={() => setState({...state, confirm: true})} color="red">
                        Выйти
                    </Button>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={state.snackOpen}
                autoHideDuration={3000}
                onClose={() => setState({...state, snackOpen: false, snackText: ''})}
                message={<span>{state.snackText}</span>}
            />
            <Confirm
                open={state.confirm}
                onCancel={() => setState({...state, confirm: false})}
                onConfirm={() => exit()}
                content='Вы действительно хотите выйти?'
            />
        </React.Fragment>

    )
}
