import React from 'react';
import './Filterbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faRecycle } from '@fortawesome/free-solid-svg-icons'
import { faTshirt } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faBatteryThreeQuarters } from '@fortawesome/free-solid-svg-icons'

library.add(faTshirt)
library.add(faRecycle)
library.add(faTrash)
library.add(faBatteryThreeQuarters)

class filterbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleAll = this.handleAll.bind(this);
        this.handleBigBelly = this.handleBigBelly.bind(this);
        this.handleClothing = this.handleClothing.bind(this);
        this.handleEWaste = this.handleEWaste.bind(this);
    }

    handleAll() {
        this.props.markerFunc(0)
    }

    handleBigBelly() {
        this.props.markerFunc(1)
    }

    handleClothing() {
        this.props.markerFunc(2)
    }

    handleEWaste() {
        this.props.markerFunc(3)
    }

    render() {
        var colors = []
        for (var i=0; i<4; i++) {
            if (i === this.props.selected) {
                colors.push(['#69BE94', 'white'])
            } else {
                colors.push(['white', '#69BE94'])
            }
        }
        return(
            <div className = 'filter-bar'>
                <div className = 'filter-tip'>Filter recycling spots:</div>
                <div className='buttons-wrapper'>
                    <div className = 'filter-buttons'>
                        <button className = 'filter-button' onClick={this.handleAll} style={{backgroundColor: colors[0][0], color: colors[0][1]}}> All</button>
                        <button className = 'filter-button' onClick={this.handleBigBelly} style={{backgroundColor: colors[1][0], color: colors[1][1]}}><FontAwesomeIcon icon="recycle" /> BigBelly</button>
                        <button className = 'filter-button' onClick={this.handleClothing} style={{backgroundColor: colors[2][0], color: colors[2][1]}}><FontAwesomeIcon icon="tshirt" /> Clothing</button>
                        <button className = 'filter-button' onClick={this.handleEWaste} style={{backgroundColor: colors[3][0], color: colors[3][1]}}><FontAwesomeIcon icon="battery-three-quarters" /> E-Waste</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default filterbar;