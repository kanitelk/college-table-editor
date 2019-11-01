import React from 'react';
import './TablesControl.scss';
import {Button, Input} from "semantic-ui-react";

export default function TablesControl ({tableName}) {
    console.log(tableName)
    return (
        <div className="tables-control">
            <div className="name">
                <h2>{tableName}</h2>
            </div>
            <div className="link">
                <Input
                    action={{
                        content: 'Перейти',
                        onClick: () => console.log(123)
                    }}
                    placeholder="Название таблицы..." type="text" />
            </div>
            <div className="actions">
                <Button color="red">
                    Выйти
                </Button>
            </div>
        </div>
    )
}
