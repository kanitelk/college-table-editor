import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./NewTable.scss";

import {Input, Button, Select, Dropdown} from "semantic-ui-react";
import {newTable} from "../../../services/http";

const subGroupOptions = [
  {key: '1', value: '1 пг', text: '1 пг'},
  {key: '2', value: '2 пг', text: '2 пг'},
  {key: '3', value: '3 пг', text: '3 пг'},
]

class NewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      startDate: "",
      endDate: "",
      subGroup: "",
      status: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleSubGroupChange = this.handleSubGroupChange.bind(this);
  }

  handleGroupChange(event) {
    this.setState({
      groupName: event.target.value
    });
  }

  handleStartDateChange(event) {
    this.setState({
      startDate: event.target.value
    });
  }

  handleEndDateChange(event) {
    this.setState({
      endDate: event.target.value
    });
  }

  handleSubGroupChange(event, {value}) {
    console.log(value)
    this.setState({
      subGroup: value
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    let res;
    try {
      res = await newTable(
        `${this.state.groupName} ${this.state.subGroup}`,
        this.state.startDate,
        this.state.endDate
      );
      this.setState({
        status: true
      });
    } catch (error) {
      alert("Имя уже используется");
    }
    console.log(res);
  }

  render() {
    if (this.state.status === true)
      return <Redirect to={`table/${this.state.groupName} ${this.state.subGroup}`} />;
    else
      return (
        <form className="new-table" onSubmit={this.handleSubmit}>
          <p className="title">Новый график</p>
          <div className="field">
            <label htmlFor="">Группа</label>
            <Input
              type="text"
              value={this.state.groupName}
              onChange={this.handleGroupChange}
            />
          </div>
          <div className="field">
            <label>Подгруппа</label>
            <Dropdown
                placegolder="Подгруппа.."
                options={subGroupOptions}
                onChange={this.handleSubGroupChange}
                selection
            />
          </div>
          <div className="field">
            <label htmlFor="">Начальная дата</label>
            <Input
              type="date"
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              value={this.state.startDate}
              onChange={this.handleStartDateChange}
              icon="calendar"
            />
          </div>
          <div className="field">
            <label htmlFor="">Конечная дата</label>
            <Input
              type="date"
              value={this.state.endDate}
              onChange={this.handleEndDateChange}
              icon="calendar"
            />
          </div>
          <Button type="submit" primary>
            Создать
          </Button>
        </form>
      );
  }
}

export default NewTable;
