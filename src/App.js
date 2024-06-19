import React, { Component } from 'react'
import Header from './Compontes/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Wether from './Pages/Wether'
import Result from './Pages/Result'

export class App extends Component {

  render() {
    return (
      <div>

        <Header></Header>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='wether' element={<Wether></Wether>}></Route>
          <Route path='/result' element={<Result></Result>}></Route>
        </Routes>
      </div>
    )
  }
}

export default App