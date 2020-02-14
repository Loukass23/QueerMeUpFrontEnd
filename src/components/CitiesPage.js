import React, { Component } from "react";
import { Form, Row } from "react-bootstrap";
import Cities from "./Cities";

export default class CitiesPage extends Component {
  state = {
    cities: [], // creamos un empty array, cada vez que el state varia, se render la funcióndentro de render con la información modificada
    fileterdCities: [],
    input: ""
  };

  fetchCities() {
    // fetching data
    fetch("http://localhost:5000/cities/all") // fetch data of list of cities
      .then(res => res.json())
      .then(data => {
        this.setState({ cities: data }); // set state con la información de cities
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.fetchCities(); // Cuando la web está "montada", es cuando generamos la función fetchcities, con la información de cities (lista), por lo tanto el state varia y se render la función render de nuevo pero con la información modificada
  }

  render() {
    const { cities } = this.state;
    let cityFilter = this.state.input;

    let filteredCities = cities.filter(city => {
      let cityName = city.name.toLowerCase();
      return cityName.indexOf(cityFilter.toLowerCase()) !== -1;
    });
    console.log(filteredCities);
    return (
      <div>
        <Form>
          <Form.Control
            type="text"
            placeholder="Search City"
            className="mr-sm-2"
            value={this.state.input}
            onChange={event => {
              this.setState({ input: event.target.value });
            }}
          />
        </Form>
        <Row>
          {this.state.input === "" ? ( // if the input is empty show all the cities
            // we are just maping one elemet (city), if we mapped more than one should be {this.state.cities.map((cities )=>
            // map to get the information we need of all cities, but one by one. That's why we put "city" in the parentesis
            <Cities citiesData={cities} />
          ) : (
            <Cities citiesData={filteredCities} />
          )}
        </Row>
      </div>
    );
  }
}