import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Searchbar from './components/Searchbar/Searchbar';
import Filterbar from './components/Filterbar/Filterbar';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Map from './MapContainer'
import MaterialList from './components/MaterialList/MaterialList';
import backgroundImage from './images/background.png';
import MetaTags from 'react-meta-tags';
import SearchResult from './SearchResult';
import All from './All.js';
import './App.css';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkedAlt, faLocationArrow, faStreetView } from '@fortawesome/free-solid-svg-icons'

library.add(faMapMarkedAlt, faLocationArrow, faStreetView)

const url = 'http://ec2-18-217-251-13.us-east-2.compute.amazonaws.com:8080/'; //url of the static hosted website


class App extends Component {
  isUnmounted = false;
  constructor(props){
    super(props)
    this.state = {
      sideDrawerOpen: false,
      materials: [],
      currentLatLng: {
        lat: 41.8268,
        lng: -71.4026
      },
      displayMarker: 0,
      centerUser: true
    }
    this.handleFilterBar = this.handleFilterBar.bind(this);
    this.getMaterialList();
  }

  componentWillUpdate(){
  }

  componentDidMount() {
    this.isUnmounted = false;
    this.getGeoLocation()
  }
  
  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleFilterBar(selected) {
    this.setState({
      displayMarker: selected
    }); 
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState)=>{
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }


  closeDrawerHandler = () => {
    this.setState({sideDrawerOpen: false})
  }

  redirectPage = () => {
    this.setState({sideDrawerOpen: false})
    window.open('https://www.brown.edu/sustainability/home','_blank')
  }

  getMaterialList = () => {
    const m_url = url + 'get/material';
    fetch(m_url)
    .then(res => res.json())
    .then(data => {
      this.setState({materials: data});
    })
    .catch(err => {
      console.log(err)
    });
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                // console.log("Getting current location");
                if (this.isUnmounted) {
                  return;
                }
                this.setState(prevState => ({
                    currentLatLng: {
                        ...prevState.currentLatLng,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }))
            }
        )
    } 
  }

  resetCenter = () => {
    if (this.state.centerUser) {
      this.setState({
        currentLatLng: {
          lat: 41.8268,
          lng: -71.4026
        },
        centerUser: false
      });
    } else {
      this.getGeoLocation();
      this.setState({centerUser: true});
    }
  }

  floatButton() {
    if (this.state.centerUser) {
      return(
        <div className="floating-button">
          <FontAwesomeIcon icon="location-arrow" size="sm" color="#4E3629"></FontAwesomeIcon>
          <div className="floating-button-text">Brown</div>
        </div>
      );
    } else {
      return(
        <div className="floating-button">
          <FontAwesomeIcon icon="street-view" size="lg" color="#dd5252"></FontAwesomeIcon>
          <div className="floating-button-text">You</div>
        </div>
      );
    }
  }

  render() {
    var backdrop;

    if (this.state.sideDrawerOpen){
      backdrop = <Backdrop clickHandler = {this.backdropClickHandler}></Backdrop>
    }

    return (
      <BrowserRouter>
      {/* height of the overall div is set to conveniently display side drawer to full height */}
      <div style = {{height: '100%'}}>
        <MetaTags>
            <title>Recycle@Brown</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </MetaTags>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler}></Toolbar>

        <SideDrawer show = {this.state.sideDrawerOpen} closeDrawer = {this.closeDrawerHandler} redirect={this.redirectPage}></SideDrawer>
        {backdrop}
        <Switch>
          {/* Route for the home page */}
          <Route exact path = "/" component = {
            (props) =>
            <div className="map-page">
              <Searchbar ></Searchbar>
              <Filterbar selected={this.state.displayMarker} markerFunc={this.handleFilterBar}></Filterbar>
              <div onClick={this.resetCenter}>{this.floatButton()}</div>
              <div className='map-wrapper' style={{width: '100%', height:'100%'}}>
                <Map className='map' markerType={this.state.displayMarker} center={this.state.centerUser} lat={this.state.currentLatLng.lat} lng={this.state.currentLatLng.lng}/>
              </div>
            </div>}
          />

          {/* MATERIAL */}
          {/* Route for the browse by material page */}
          <Route path = "/materials" component = {
            (props) =>
            <div className = 'page-wrapper'>
              <img className = "backgroundimg" src = {backgroundImage}  alt = "bgimg"/>
              <div className = "page-title">Browse By Materials</div>
              <div className = "material-list-wrapper">
                {this.state.materials.map(function(item, i){
                  return <MaterialList key = {i} name = {item} />
                })}
              </div>
              {/* <Bottom></Bottom> */}
            </div>
          } />

          {/* All */}
          {/* Route for the all trash page */}
          <Route path = "/all" component = {
            (props) => 
              <div className = 'page-wrapper'>
              <img className = "backgroundimg" src = {backgroundImage}  alt = "bgimg"/>
              <div className = "page-title">All Recyclables</div>
              <div className = "item-list-wrapper">
                <All></All>
              </div>
            </div>
            }/>

          <Route exact path="/search/:searchstr" component={SearchResult} />
        </Switch>
      </div>

      </BrowserRouter>
      
    );
  }
}

export default App;
