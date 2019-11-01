import React, {useState, useEffect} from 'react';
import TablesControl from "./TablesControl/TablesControl";
import Table from "./Table/Table";
import './TableWrapper.scss';
import {getTable} from "../../services/http";
import {useParams} from "react-router-dom";
import {Loader} from "semantic-ui-react";

export default function TableWrapper () {
    let {tableName} = useParams();

    const [state, setState] = useState({
        isLoading: true,
        error: false,
        table: null
    });

    useEffect(() => {
        async function fetchData() {
            let data = await getTable(tableName);
            console.log(data.status);
            setState({
                isLoading: false,
                error: false,
                table: data.data
            });
        }

        fetchData();
    }, []);

    return (
        <div className="table-wrapper">
            <Loader active={state.isLoading} />
            {!state.isLoading && <TablesControl tableName={tableName} />}
            {!state.isLoading && <Table isLoading={state.isLoading} table={state.table} tableName={tableName} />}
        </div>
    )
}
