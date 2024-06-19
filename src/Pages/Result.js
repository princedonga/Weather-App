import React, { Component } from "react";
import Loader from "../Compontes/Loader";

export class Result extends Component {
  constructor(props) {
    super(props);

    this.props = props;
  }
  render() {
    const ktoc = (k) => {
      return (k - 273.15).toFixed(2) + " °C";
    };
    const getTime = (time) => {
      const date = new Date(time * 1000);
      return date.toLocaleTimeString();
    };
    let { datasubmit: wdata } = this.props;
    console.log("wdata", wdata);
    let showdata;

    if (this.props.datasubmit === null) {
      if (this.props.loading === true) {
        showdata = <Loader></Loader>;
      } else {
        showdata = "";
      }
    } else {
      showdata = (
        <div className="container background">
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${wdata.weather[0].icon}@2x.png`}
              className="logo mt-5 "
              alt="N"
            ></img>
            <div>
              <h2>{wdata.weather[0].description}</h2>
            </div>
          </div>
          <div>
            <table>
              <caption>Utran Haze Weather Info</caption>
              <tbody>
                <tr>
                  <th className="col-lg-7">Feels Like:</th>
                  <td className="col-lg-5">{ktoc(wdata.main.feels_like)}</td>
                </tr>
                <tr>
                  <th>Min. Temp:</th>
                  <td>{ktoc(wdata.main.temp_min)}</td>
                </tr>
                <tr>
                  <th>Max. Temp:</th>
                  <td>{ktoc(wdata.main.temp_max)}</td>
                </tr>
                <tr>
                  <th>Sun Rise:</th>
                  <td>{getTime(wdata.sys.sunrise)}</td>
                </tr>
                <tr>
                  <th>Sun Set:</th>
                  <td>{getTime(wdata.sys.sunset)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return <>{showdata}</>;
  }
}

export default Result;
