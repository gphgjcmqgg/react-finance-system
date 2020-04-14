import React, { Component } from 'react';
import Record from './Record';
import { getAllData } from '../utils/RecordAPI';
import RecordForm from './RecordForm';

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
              </tr>
            </thead>
            <tbody>
              {records.map((record) => <Record key={record.id} {...record} />)}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div>
          <h2>Records</h2>
          <RecordForm reload={this.setDataTable.bind(this)}/>
          {content}
      </div>
    );
  }
}

export default Records;