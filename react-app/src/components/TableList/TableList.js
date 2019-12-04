import React, {useState, useEffect} from 'react';
import './TableList.scss';
import {deleteTable, getAllTables, getTable} from "../../services/http";
import {Confirm, Icon, Loader} from "semantic-ui-react";

export default function TableList () {
    const [state, setState] = useState({
        isLoading: false,
        error: null,
        tables: null,
        showConfirm: false,
        toDelete: null
    });

    useEffect(() => {
        fetchTables()
    },[])

    async function fetchTables() {
        let data;
        try {
            data = await getAllTables()
            setState({
                isLoading: false,
                error: false,
                tables: data.data
            });
        } catch (error) {
            setState({
                isLoading: false,
                error: error,
                tables: null
            })
            alert('При загрузке таблиц произошла ошибка')
        }
    }

    const delTable = async () => {
        let res = await deleteTable(state.toDelete);
        setState({...state, showConfirm: false})
        await fetchTables();
        alert(`Таблица ${state.toDelete} удалена`)
    }

    const getTables = () => state.tables.map(x =>
        <div className="table-item" key={x.name}>
            <a href={`./table/${x.name}`}>
            {x.name}
        </a>
            <Icon name="close" onClick={() => {
                setState({...state, showConfirm: true, toDelete: x.name})
            }} />
        </div>
    )

    return (
        <React.Fragment>
            <Loader active={state.isLoading} />
            {state.isLoading === false && state.tables !== null && <div className="table-list">{getTables()}</div>}

            <Confirm
                open={state.showConfirm}
                onCancel={() => setState({...state, showConfirm: false})}
                onConfirm={() => delTable()}
                content='Вы действительно хотите удалить таблицу?'
            />

        </React.Fragment>
    )
}
