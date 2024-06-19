import React, { Component } from 'react'
import HashLoader from "react-spinners/HashLoader";

export class Loader extends Component {
  render() {
    return (
      <div className='mt-5 d-block mx-auto '>
        <div className='d-flex justify-content-center '>
        <HashLoader color="#000" />
        </div>
      </div>
    )
  }
}

export default Loader