import React from "react";

// core components
import {Row, Col} from "reactstrap";
import PropagateLoader from "react-spinners/PropagateLoader";
import LineChart from "components/Weather/LineChart.js";

// firestore
import firebase from "firebase/firestore.js";

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ids: [],
      weatherData: [],
      feelsLikeData: [],
    };

    this.getWeatherData();
  }

  getWeatherData() {
    const db = firebase.firestore();

    db.collection("WM")
      .limit(24)
      .get()
      .then((querySnapshot) => {
        let docs = querySnapshot.docs;
        let docs_data = docs.map((doc) => doc.data());

        this.setState({
          ids: docs.map((doc) => doc.id),
          weatherData: docs_data.map((data) => data["temp_max"]),
          feelsLikeData: docs_data.map((data) => data["feels_like"]),
        });
      });
  }

  render() {
    if (
      this.state.ids.length === 0 ||
      this.state.feelsLikeData.length === 0 ||
      this.state.weatherData.length === 0
    ) {
      return (
        <div className="content">
        <Row>
          <Col xs="12" className="text-center" style={{paddingTop: "30%", paddingLeft:"50%"}}>
            <PropagateLoader color={"#1E8AF7"}/>
          </Col>
        </Row>
      </div>
      );
    }
    return (
      <div className="content">
        <LineChart
          title="Weather"
          subtitle="Braga - Semana 13/04"
          labels={this.state.ids}
          weatherData={this.state.weatherData}
          feelsLikeData={this.state.feelsLikeData}
        />
      </div>
    );
  }
}

export default Weather;
