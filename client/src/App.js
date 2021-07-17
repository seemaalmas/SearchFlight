import './App.css';
import React from 'react';
import DropDown from './components/Dropdown';
import { getData } from './actions/index'
import {connect} from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownView: {
        color: 'grey',
        position: 'top',

      },
      label: "Source",
      data: [
        {
          id: 'BAN',
          value: "Banglore"
        }, {
          id: 'MUM',
          value: "Mumbai"
        }, {
          id: 'PUN',
          value: "PUNE"
        }, {
          id: "HYD",
          value: "Hyderabad"
        }, {
          id: 'DEL',
          value: "Delhi"
        }, {
          id: 'PAT',
          value: "Patna"
        },

      ],
      sourceCity : "",
      DestCity: "",
      city: [],
      travel: '',
      return: '',
      dataPresent: false,
      rows: [        
        { id: 'flightNumber',field: 'flightNumber', headerName: 'Flight Number', width: 200 },
        { id: 'name',field: 'name', headerName: 'Airline', width: 200 },
        { id: 'departureAndArrivalTime',field: 'departureAndArrivalTime', width: 200, headerName: 'Departure and Arrival Time', valueGetter: (params) =>
            `${params.getValue(params.id, 'departure') || ''} and ${
              params.getValue(params.id, 'arrival') || ''
            }`, },
        { id: 'duration',field: 'duration', headerName: 'Duration', width: 200 },
        { id: 'stops',field: 'stops', headerName: 'Stops', width: 200 },
        { id: 'price', field: 'price', headerName: 'Price', width: 200 }],
      columns:[],
    }
    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSelectChange(value) {
    this.setState(state => {
      const city = [...state.city, value];
      return {
        city
      };
    });
    console.log(this.state.city);


  }

  handleDate(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit (e) {
    
    const formData = {
      source: (this.state.city[0].source !== undefined)  ? this.state.city[0].source :  this.state.city[1].source,
      dest: (this.state.city[1].dest !== undefined)  ? this.state.city[1].dest :  this.state.city[0].dest,
      travel: this.state.travel,
      return: this.state.return,
    };
    console.log(formData)
    e.preventDefault()
    this.props.getData(formData);

    //getData(formData)
  }

  render() {
    return (
      <div className="App">
        <div className='container'>
          <div className='inner-container'>
            <label>Source city : </label>
            <DropDown data={this.state.data} onSelectChange={this.onSelectChange} name='source' />
          </div>
          <div className='inner-container'>
            <label>Destination city :</label>
            <DropDown data={this.state.data} onSelectChange={this.onSelectChange} name='dest' />
          </div>
        </div>
        <div className='container relative-container'>
          <div className='inner-container '>
            <label>Travel Date :</label>
            <input type="date" id="travel" name="travel" onChange={this.handleDate} required/>
          </div>
          <div className='inner-container '>
            <label>Return Date:</label>
            <input type="date" id="return" name="return" onChange={this.handleDate} />
          </div>
          <button onClick={this.onSubmit}> Search</button>
        </div>
        {this.props.columns && 
        <div style={{ height: 400, width: '100%' }}>
            <div>Total number of results: {this.props.columns.length}</div>
            <DataGrid
              rows={this.props.columns}
              columns={this.state.rows}
              pageSize={5}
            />
          </div>}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return { columns: state.columnData  };
};

const Form = connect(
  mapStateToProps,
  { getData }
)(App);
export default Form;
