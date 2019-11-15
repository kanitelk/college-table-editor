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
                table: data.data
            });
        } catch (error) {
            setState({
                isLoading: false,
                error: error,
                table: null
            })
            alert('При загрузке таблиц произошла ошибка')
        }
    }

    const getTables = () => state.tables.map(x => <div>
            {x.name}
            {x.persons}
        </div>
    )

    return (
        <React.Fragment>
            <div className="table-list">
                <Loader active={state.isLoading} />
                {/*{!state.isLoading && !state.error && getTables()}*/}
            </div>
        </React.Fragment>
    )
}
