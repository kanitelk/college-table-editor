import React, { Component } from "react";
import "./NewTable.scss";

import { Input, Button } from "semantic-ui-react";

class NewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      startDate: "",
      endDate: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
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
