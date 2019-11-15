import React, {useState} from "react";
import "./Table.scss";
import Cell from "./Cell/Cell";
import {Button, Confirm, Icon} from "semantic-ui-react";
import ContentEditable from 'react-contenteditable';
import AddRow from "../AddRow/AddRow";
import {deletePerson, editPerson} from "../../../services/http";
import Snackbar from "@material-ui/core/Snackbar";

function Table({table, tableName, isLoading, changeName, delRow, update}) {
    const [state, setState] = useState({
        snackOpen: false,
        snackText: ''
    })

    const [hoverState, setHoverState] = useState({
        userId: null,
        isHover: false,
        popup: false
    });

    const handleHoverState = (userId) => {
        console.log('*** handle hover')
        let curId = hoverState.userId;
        if (curId === userId) {
            setHoverState({...hoverState, userId: null, isHover: false})
        } else {
            setHoverState({...hoverState, userId: userId, isHover: true})
        }
    }

    const deleteRow = async () => {
        await deletePerson(tableName, hoverState.userId);
        delRow(hoverState.userId)
        setHoverState({userId: null, popup: false, isHover: false});
        setState({...state, snackOpen: true, snackText: 'Строка удалена'})
    }

    const handleUserNameChange = (e, user) => {
        changeName(user.id, e.target.value);
        savePersonName(e.target.value, user);
    }

    const blurUserName = (e, user) => {
        console.log(e, user)
    }

    const savePersonName = async (name, user) => {
        let res = await editPerson(tableName, name, user.id, user.role);
        setState({...state, snackOpen: true, snackText: 'Строка сохранена'})
    }


    const renderTable = () => {
        if (isLoading === true) return null;
        else {

            let dates = table.dates.map(x  => {
                let y = new Date(x.date);

                return (
                        <td className="date-name" key={x.date}>
                            <p>{y.toLocaleDateString()}</p>
                        </td>
                );
            });

            let daysNumbers = table.dates.map((x, index) => <td key={index}>{index + 1}</td>)

            let cells = table.persons.map(user => {
                let values = table.dates.map(value => {
                    let r = value.values.findIndex(item => item.personId === user.id);
                    if (r === -1)
                        return (
                            <Cell
                                key={Math.random()}
                                tableName={tableName}
                                date={value.date}
                                personId={user.id}
                                user={user}
                            />
                        );
                    else
                        return (
                            <Cell
                                key={value.values[r]._id}
                                tableName={tableName}
                                valueId={value.values[r]._id}
                                content={value.values[r].data.value}
                                color={value.values[r].data.color}
                                date={value.date}
                                user={user}
                            />
                        );
                });
                return (
                    <tr key={user._id}>
                        <td
                            onClick={() => handleHoverState(user.id)}
                            className="fixed">
                                {user.role}
                            {hoverState.isHover && (user.id === hoverState.userId) &&
                            <Icon onClick={(e) => {
                                setHoverState({...hoverState, popup: true})
                                e.stopPropagation();
                            }} name='close' />}
                        </td>
                        <ContentEditable
                            html={user.name}
                            tagName='td'
                            onChange={(e) => handleUserNameChange(e, user)}
                            onBlur={(e) => blurUserName(e, user)}
                        />
                        {values}
                    </tr>
                );
            });

            return (
                <React.Fragment>
                    <thead>
                    <tr>
                        <td rowSpan={2}>Вид деятельности</td>
                        <td rowSpan={2}>Ответственный</td>
                        {dates}
                    </tr>
                    <tr>
                      {daysNumbers}
                    </tr>
                    </thead>
                    <tbody>{cells}</tbody>
                </React.Fragment>
            );
        }
    };

    return (
        <React.Fragment>
            <AddRow tableName={tableName} update={update} />
            <div className="table-container">
                <table className="table">{renderTable()}</table>
            </div>
            <Confirm
                open={hoverState.popup}
                onCancel={() => setHoverState({...hoverState, popup: false})}
                onConfirm={() => deleteRow()}
                content='Вы действительно хотите удалить строку?'
            />

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={state.snackOpen}
                autoHideDuration={1500}
                onClose={() => setState({...state, snackOpen: false, snackText: ''})}
                message={<span>{state.snackText}</span>}
            />
        </React.Fragment>
    );
}

export default Table;
