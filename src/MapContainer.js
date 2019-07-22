import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import bigBellyData from './data/BigbellyData'
import clothingData from './data/ClothingData'
import eWasteData from './data/EWasteData'
import './App.css';

import icCurrLoc from './images/currLoc.png'
import icBigBelly from './images/bigBelly.png'
import icClothing from './images/clothing.png'
import icEWaste from './images/eWaste.png'

const containerStyle = {
  width: '100%',
  top: '190px'
};

const infoWindowStyle = {
  width: '250px',
  height: '200px'
};

const styles = require('./mapStyles.json')

export class MapContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentLatLng: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      bigBellies: bigBellyData,
      clothing: clothingData,
      eWaste: eWasteData,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  componentWillUpdate(){
  }

  componentDidMount() {
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }};

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  displayMarkers() {
    const markers = [];
    switch(this.props.markerType) {
      case 0:
        this.addBigBelly(markers);
        this.addClothing(markers);
        this.addEWaste(markers);
        break;
      case 1:
        this.addBigBelly(markers);
        break;
      case 2:
        this.addClothing(markers);
        break;
      case 3:
        this.addEWaste(markers);
        break;
        
      default:
        this.addBigBelly(markers);
        this.addClothing(markers);
        this.addEWaste(markers);
    }
    return markers;
  }

  addBigBelly(markers) {
    const {google} = this.props;
    markers.push(this.state.bigBellies.map((bin) => {
      return(
        <Marker
          onClick={this.onMapClicked}
          key = {bin.name}
          name = {bin.name}
          position={{lat: bin.latitude, lng: bin.longitude}}
          icon={{
            url: icBigBelly,
            anchor: new google.maps.Point(12,32),
            scaledSize: new google.maps.Size(24,64)
          }}/>
      )
    }));
  }

  addClothing(markers) {
    const {google} = this.props;
    markers.push(this.state.clothing.map((bin) => {
      return(
        <Marker
          onClick={this.onMarkerClick}
          type='clothing'
          key = {bin.name}
          name = {bin.name}
          position={{lat: bin.latitude, lng: bin.longitude}}
          icon={{
            url: icClothing,
            anchor: new google.maps.Point(12,32),
            scaledSize: new google.maps.Size(24,64)
          }}/>
      )
    }));
  }

  addEWaste(markers) {
    const {google} = this.props;
    markers.push(this.state.eWaste.map((bin) => {
      return(
        <Marker
          onClick={this.onMarkerClick}
          type='eWaste'
          description={bin.description}
          key = {bin.name}
          name = {bin.name}
          image = {bin.image}
          position={{lat: bin.latitude, lng: bin.longitude}}
          icon={{
            url: icEWaste,
            anchor: new google.maps.Point(12,32),
            scaledSize: new google.maps.Size(24,64)
          }}/>
      )
    }));
  }

  displayInfoWindow(selectedPlace) {
    if (selectedPlace.type === 'clothing') {
      return(
        <div className="info-window">
          <b className="infowindow-title">GoodWill Bin @{selectedPlace.name}</b>
          <div className="infowindow-tips">
            We accept all kinds of fabrics as long as they are dry and ordorless.
            <br/><b>Put it all in a bag and put the bag in the bin.</b>
          </div>
        </div>
      );
    } else {
      return(
        <div className="info-window">
          <b className="infowindow-title">E-Waste Bin @{selectedPlace.name}</b>
          <div className="infowindow-locinfo">
            <div className="infowindow-img-wrapper">
              <img className="infowindow-img" src={selectedPlace.image} alt = "infowindow"/>
            </div>
            <p className="infowindow-description">{selectedPlace.description}</p>
          </div>
          <div className="infowindow-tips">
            <b>What we accept:</b>
              <div>1. Small electronics</div>
              <div>2. Printer ink cartridges</div>
              <div>3. Small batteries</div>
          </div>
        </div>
      );
    }
  }

  render() {
    const {google} = this.props;
    return (
      <Map
        google={this.props.google}
        zoom={17}
        minZoom={15}
        maxZoom={19}
        style={containerStyle}
        styles={styles}
        initialCenter={{
          lat: this.state.currentLatLng.lat,
          lng: this.state.currentLatLng.lng
        }}
        disableDefaultUI={true}
        onClick={this.onMapClicked}>
        {this.displayMarkers()}
        <Marker 
          onClick={this.onMapClicked}
          name={'currLoc'}
          position={{lat: this.state.currentLatLng.lat, lng: this.state.currentLatLng.lng}}
          visible={this.props.center}
          icon={{
            url: icCurrLoc,
            anchor: new google.maps.Point(10,32),
            scaledSize: new google.maps.Size(20,64)
          }}/>
        <InfoWindow
          marker={this.state.activeMarker}
          style={infoWindowStyle}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
            {this.displayInfoWindow(this.state.selectedPlace)}
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDsjmjYlwfYYMGQ8nJweUmc_wldCRNz0ac'
})(MapContainer);