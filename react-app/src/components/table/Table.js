import React from "react";
import { useParams } from "react-router-dom";
import "./Table.scss";

import TableData from "./data";

function Table() {
  let { id } = useParams();

  console.log(TableData);

  const renderHead = () => {
    let dates = TableData.dates.map(x => {
      let y = new Date(x.date);
      console.log(y.getFullYear());

      return (
        <td className="date-name" key={x.date}>
          <p>{x.date}</p>
        </td>
      );
    });
    return (
      <tr>
        <td>Вид деятельности</td>
        <td>Ответственный</td>
        {dates}
      </tr>
    );
  };

  const renderBody = () => {
    // let cells =
  };

  return (
    <div className="table">
      <h2>Table id: {id}</h2>
      <table>
        <thead>{renderHead()}</thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>456</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
