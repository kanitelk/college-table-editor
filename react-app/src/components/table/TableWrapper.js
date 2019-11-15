import React, {useState, useEffect} from 'react';
import TablesControl from "./TablesControl/TablesControl";
import Table from "./Table/Table";
import './TableWrapper.scss';
import {getTable} from "../../services/http";
import {useParams} from "react-router-dom";
import {Loader} from "semantic-ui-react";
import Snackbar from "@material-ui/core/Snackbar";

export default function TableWrapper () {
    let {tableName} = useParams();

    const [state, setState] = useState({
        isLoading: true,
        error: null,
        table: null,
        snackOpen: false,
        snackText: ''
    });

    const changeUserName = (userId, name) => {
        let t = state.table;
        let personIndex = t.persons.findIndex(x => x.id === +userId);
        if (personIndex === -1) return;
        else {
            t.persons[personIndex].name = name;

            setState({...state, t})
        }
    }

    const deleteRowSetState = (userId) => {
        let t = state.table;
        let personIndex = t.persons.findIndex(x => x.id === +userId);
        if (personIndex === -1) return;
        else {
            let res = t.persons.splice(personIndex, 1);
            setState({...state, t})
        }
    }

    async function fetchData() {
        let data;
        try {
            data = await getTable(tableName);
            setState({
                isLoading: false,
                error: false,
                table: data.data
            });
        } catch (error) {
            setState({
                isLoading: false,
                error: error,
                table: null,
                snackOpen: true,
                snackText: 'Ошибка при загрузке таблицы'
            })
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <div className="table-wrapper">
                <Loader active={state.isLoading} />
                {!state.isLoading && !state.error && <TablesControl tableName={tableName} />}
                {!state.isLoading && !state.error && <Table
                    isLoading={state.isLoading}
                    table={state.table}
                    tableName={tableName}
                    changeName={changeUserName}
                    delRow={deleteRowSetState}
                    update={fetchData}
                />}
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
        </React.Fragment>

    )
}
