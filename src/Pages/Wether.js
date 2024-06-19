import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Result from './Result'
import Recent from '../Compontes/Recent'

export class Wether extends Component {
  constructor(props) {
    super(props)

    this.state = {

      lon: '',
      lat: '',
      city: '',
      datasubmit: null,
      loading:false,
      recent:[]
    }
  }

  dataChangeHandler = (e) => {
    const name = e.target.name
    if (name === "city") {
      this.setState({
        city: e.target.value
      })
    }
    else if (name === "lat") {
      this.setState({
        lat: e.target.value
      })
    }
    else if (name === "lon") {
      this.setState({
        lon: e.target.value
      })
    }
    else {
      console.log("name not valid");
    }
  }
  secarchHandler = (e) => {
    e.preventDefault()
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=839174749f810943c2e41994f2f606c6`).then((res) => {
      console.log(res);
      this.setState({
        city: res.data.name,
        datasubmit: res.data
      }, () => {
        this.recentDataHandler();
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
  locationHandler = (e) => {
    e.preventDefault();
    this.setState({
      loading:true
    })

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          setTimeout(() => {
            this.setState({
              lat: res.coords.latitude,
              lon: res.coords.longitude
            }, () =>{
              this.recentDataHandler();
              })

            const { latitude , longitude } = res.coords

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=839174749f810943c2e41994f2f606c6`).then((res) => {
              this.setState({
                city: res.data.name,
                datasubmit: res.data,
                loading: false
              })
            }).catch((err) => {
              console.log(err);
            })
          }, 1000)
        },
        (err) => {
          console.log(err);
        }
      )
    }
    else {
      console.log("Geoloaction not suppport....");
    }
  }

 recentDataHandler = () => {
  const Recent = this.state.recent
  console.log(Recent);
  Recent.push({
    city:this.state.city,
    lat : this.state.lat,
    lon:this.state.lon
  })
  this.setState({Recent})
 }
 
     researchHandler = (lat,lon) => {
  this.setState({
    lat:lat,
    lon:lon
  })
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=839174749f810943c2e41994f2f606c6`).then((res) => {
      console.log(res);
      this.setState({
        city:res.data.name,
        datasubmit:res.data,
        loading:false
      })
    }).catch((err) =>{
      console.log((err));
    })
 }
  render() {
    console.log(this.state);
    return (
      <div >
        <section className>
          <div className='container pt-5 back'>
            <div className='row '>
              <div className='col-lg-5'>
                <div>
                  <label className='form-lable '>Enter City Name</label>
                  <input type='text' className='form-control' name="city" value={this.state.city}></input>
                </div>
              </div>
              <div className='col-lg-1'>
                <div>
                  <h3 className='ms-4'>OR</h3>
                </div>
              </div>
              <div className='col-lg-5'>
                <div className=''>
                  <h5 className='mb-3 '>Get Co-ordinate <Link to="" onClick={this.locationHandler}><i class="fa-solid fa-location-crosshairs  ms-2 text-dark"></i></Link></h5>

                  <label className='form-lable'>Lat</label>
                  <input type='number' className='form-control' placeholder="Enter Latitude" onChange={this.dataChangeHandler} value={this.state.lat} name="lat"></input>

                  <label className='form-lable'>Lon</label>
                  <input type='number' className='form-control' placeholder="Enter Logitude" onChange={this.dataChangeHandler} value={this.state.lon} name="lon"></input>

                  <h5 className='mt-4 '>Serch <i class="fa-solid fa-magnifying-glass" onClick={this.secarchHandler}></i></h5>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Result loading={this.state.loading } datasubmit={this.state.datasubmit}></Result>
        <Recent recent={this.state.recent} research={this.researchHandler}></Recent>
      </div>
    )
  }
}

export default Wether