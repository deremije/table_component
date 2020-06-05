import React from 'react';
import './App.scss';

import TableComponent from "./TableComponent/TableComponent"

class App extends React.Component {
  state = {
    headers: ['name', 'photo', 'email', 'cell', 'gender', 'nationality'],
    data: null
  }
  
  componentDidMount() {
    fetch("https://randomuser.me/api/?results=500")
      .then(response => response.json())
      .then(response => response.results.map(entry => {
        return {
          photo: entry.picture.thumbnail,
          name: `${entry.name.last}, ${entry.name.first}`,
          email: entry.email,
          cell: entry.cell,
          gender: entry.gender,
          nationality: entry.nat,
          id: entry.login.uuid
        }
      }))
      .then(results => this.setState({ data: results }))
      .catch(error => console.log(error))
  }


  render() {
    return (
      <div className="App">
        {this.state.data ? 
          <TableComponent headers={this.state.headers} data={this.state.data} /> :
          <div>Loading Table...</div>
        }
      </div>
    )
  }
  
}

export default App;
