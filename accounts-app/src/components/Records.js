import React, { Component } from 'react';
import Record from './Record';
import { getAllData } from '../utils/RecordAPI';
import RecordForm from './RecordForm';
import AmountBox from './AmountBox';

class Records extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: []
    }
  }

  componentDidMount() {
    // axios.get("http://localhost:3004/records").then(
    //   response => this.setState({
    //     records: response.data,
    //     isLoaded: true
    //   })
    // ).catch(
    //   error => this.setState({
    //     isLoaded: true,
    //     error
    //   })
    // )

    getAllData().then( res => res.data)
    .then(
        response => this.setState({
            records: response,
            isLoaded: true
        })
    )
    .catch(
      error => this.setState({
        isLoaded: true,
        error
      })
    )
  }

  setDataTable(data) {
    const records = [
      ...this.state.records,
      data
    ];
    this.setState({
      records
    })
  }

  updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map( (item, index) => {
      if(index !== recordIndex) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...data
      };
    });
    this.setState({
      records: newRecords
    });
  }

  deleteRecord(id) {
    const newRecords = this.state.records.filter( (item) => item.id !== id);
    this.setState({
      records: newRecords
    });
  }

  credits() {
    let credits = this.state.records.filter((record) => {
      return record.amount >= 0;
    })

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  debits() {
    let debits = this.state.records.filter((record) => {
      return record.amount < 0;
    })

    return debits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  balance() {
    return this.credits() + this.debits();
  }

  render() {
    const { error, isLoaded, records } = this.state;
    let content = "";
    if (error) {
      content =  (<div>Error: {error.message}</div>);
    } else if (!isLoaded) {
      content =  (<div>Loading...</div>);
    } else {
      content =  (
        <div>
          <h2>Records</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => 
                <Record key={record.id} 
                  record={record} 
                  handleEditRecord={this.updateRecord.bind(this)}
                  handleDeleteRecord={this.deleteRecord.bind(this)}
                />)}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div>
          <h2>Records</h2>
          <div className="row mb-3">
            <AmountBox text="Credit" type="success" amount={this.credits()} />
            <AmountBox text="Debit" type="danger" amount={this.debits()} />
            <AmountBox text="Balance" type="info" amount={this.balance()} />
          </div>
          <RecordForm reload={this.setDataTable.bind(this)}/>
          {content}
      </div>
    );
  }
}

export default Records;