import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Table.scss";
import { getTable } from "../../services/http";
import Cell from "./Cell";
import { Loader } from "semantic-ui-react";

function Table() {
  let { id } = useParams();

  const [state, setState] = useState({
    isLoading: true,
    error: false,
    table: null
  });

  useEffect(() => {
    async function fetchData() {
      let data = await getTable(id);
      console.log(data.status);
      setState({
        isLoading: false,
        error: false,
        table: data.data
      });
    }
    fetchData();
  }, []);

  const renderTable = () => {
    if (state.isLoading === true) return null;
    else {
      let dates = state.table.dates.map(x => {
        let y = new Date(x.date);

        return (
          <td className="date-name" key={x.date}>
            <p>{y.toLocaleDateString()}</p>
          </td>
        );
      });

      let cells = [];

      cells = state.table.persons.map(user => {
        let values = state.table.dates.map(value => {
          let r = value.values.findIndex(item => item.personId === user.id);
          if (r === -1)
            return (
              <Cell
                key={Math.random()}
                date={value.date}
                personId={user.id}
                user={user}
              />
            );
          else
            return (
              <Cell
                key={value.values[r]._id}
                valueId={value.values[r]._id}
                content={value.values[r].data.value}
                color={value.values[r].data.color}
                date={value.date}
                user={user}
              />
            );
        });
        return (
          <tr key={user.id}>
            <td className="fixed">{user.role}</td>
            <td>{user.name}</td>
            {values}
          </tr>
        );
      });

      return (
        <React.Fragment>
          <thead>
            <tr>
              <th className="fixed">Вид деятельности</th>
              <th>Ответственный</th>
              {dates}
            </tr>
          </thead>
          <tbody>{cells}</tbody>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <div className="table-wrapper">
        <h2>{id}</h2>
        <Loader active={state.isLoading && !state.error} />
        <table className="table">{renderTable()}</table>
      </div>
    </React.Fragment>
  );
}

export default Table;
