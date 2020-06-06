import React from 'react';
import './App.css';

import TableComponent from "./TableComponent/TableComponent"

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      headers: ['name', 'email', 'cell', 'gender', 'nationality'],
      data: null,
      includePhoto: 'name',
      // sortBy: 'email',
      // pixelBuffer: 10,
      // chunkSize: 1,
      // originalLines: 4,
      // columnWidth: 200
    }
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
      <div className="App" ref={this.element}>
          <TableComponent  
            sortBy={this.state.sortBy}
            includePhoto={this.state.includePhoto} 
            pixelBuffer={this.state.pixelBuffer}
            chunkSize={this.state.chunkSize}
            originalLines={this.state.originalLines}
            columnWidth={this.state.columnWidth}
            headers={this.state.headers}
            data={this.state.data} /> 
      </div>
    )
  }
}

export default App;
