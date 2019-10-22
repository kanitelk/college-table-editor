import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Table.scss";
import { getTable } from "../../services/http";

function Table() {
  let { id } = useParams();

  const [state, setState] = useState({
    isLoading: true,
    table: null
  });

  useEffect(() => {
    async function fetchData() {
      let data = await getTable("5daddc4f2826441f80350439");
      console.log(data.data);

      setState({
        isLoading: false,
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
          if (r === -1) return <td key={Math.random()}></td>;
          else
            return (
              <td key={value.values[r]._id}>{value.values[r].data.value}</td>
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

  const renderBody = () => {
    if (state.isLoading === true) return null;
    else {
      let cells = state.table.persons.map((x, index) => {
        return (
          <tr key={x._id}>
            <td>{x.role}</td>
            <td>{x.name}</td>
          </tr>
        );
      });
      console.log();

      return cells;
    }
  };

  return (
    <React.Fragment>
      <div className="table-wrapper">
        <h2>Table id: {id}</h2>
        <h3>Loading: {state.isLoading ? "true" : "false"}</h3>
        <table className="table">{renderTable()}</table>
      </div>
    </React.Fragment>
  );
}

export default Table;
