import React, { Component } from 'react';
import { createData } from '../utils/RecordAPI';

export default class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      title: "",
      amount: ""
    }
  }

  handleChange(event) {
    // let name, obj;
    const name = event.target.name;
    // this.setState((
    //   obj = {},
    //   obj[name] = event.target.value,
    //   obj
    // ))
    this.setState({
      [name]: event.target.value
    })
  }

  valid() {
    return this.state.date && this.state.title && this.state.amount
  }

  postData() {
    const { amount } = this.state;
    const data = {
      ...this.state,
      amount: parseInt(amount)
    }
    createData(data).then(res => res.data)
        .then(data => console.log("数据增加成功", data))
        .catch(err => console.log(err.message))
  }
  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Date" name="date" value={this.state.date} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Title" name="title" value={this.state.title} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" onChange={this.handleChange.bind(this)}  placeholder="Amount" name="amount" value={this.state.amount} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.postData.bind(this)} disabled={!this.valid()}>Create Record</button>
      </form>
    );
  }
}