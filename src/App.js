import React from "react"
import {Switch, Route} from "react-router-dom"
import Nav from"./componet/nav"
import Beranda from "./page/beranda"
import Cart from "./page/cart"
class App extends React.Component{
  render(){
      return(
          <div>
              <Nav />
              <Switch>
                  <Route exact path="/" component={Beranda} />
                  <Route path="/cart" component={Cart} />
              </Switch>
          </div>
      )
  }
}

export default App;
