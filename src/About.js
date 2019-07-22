import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import './index.css';
import Backdrop from './components/Backdrop/Backdrop';
// import Searchbar from './components/Searchbar/Searchbar';
// import Filterbar from './components/Filterbar/Filterbar';

class About extends Component {
  state = {
    sideDrawerOpen: false
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState)=>{
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  render() {
    var backdrop;

    if (this.state.sideDrawerOpen){
      backdrop = <Backdrop clickHandler = {this.backdropClickHandler}></Backdrop>
    }

    return (
      // height of the overall div is set to conveniently display side drawer to full height
      <div style = {{height: '100%'}}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler}></Toolbar>
        <SideDrawer show = {this.state.sideDrawerOpen}></SideDrawer>
        {backdrop}
        <main style = {{marginTop: '66px', marginLeft: '20px'}}>
          <p>Ah you found me </p>
        </main>
      </div>
    );
  }
}

export default About;
