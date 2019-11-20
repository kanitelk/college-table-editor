import React, {useState, useEffect} from 'react';
import './TableList.scss';
import {getAllTables, getTable} from "../../services/http";
import {Loader} from "semantic-ui-react";

export default function TableList () {
    const [state, setState] = useState({
        isLoading: false,
        error: null,
        tables: null,
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

    const getTables = () => state.tables.map(x => <a href={`./table/${x.name}`} key={x.name}>
                {x.name}
            </a>
    )

    return (
        <React.Fragment>
            <Loader active={state.isLoading} />
            {state.isLoading === false && state.tables !== null && <div className="table-list">{getTables()}</div>}
        </React.Fragment>
    )
}
