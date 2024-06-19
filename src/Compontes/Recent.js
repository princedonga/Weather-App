import React, { Component } from 'react'

export class Recent extends Component {
  constructor(props) {
    super(props)

    this.props = props

  }
  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='d-block mx-auto text-center mt-4 '>
                <h1>Recent Data</h1>
                <div className=''>
                  <ul className='text-left list-unstyled '>
                    {
                      this.props.recent.map((data, index) => {
                        return <li key={index} onClick={() => this.props.research(data.lat , data.lon)} className='btn btn-primary '>{data.city}</li>
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Recent