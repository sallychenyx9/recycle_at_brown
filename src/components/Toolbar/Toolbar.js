import React from 'react';
import './Toolbar.css';
import '../SideDrawer/Hamburger.css';
import brownLogo from '../../images/brown-logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faBars)

const toolbar = props => (
    <header className = 'toolbar'>
        <nav className = 'toolbar__nav'>
            <FontAwesomeIcon className = "drawerIcon" onClick = {props.drawerClickHandler} icon="bars" size={'2x'} style={{color: 'white', padding:'2px'}}/>
            <div className = 'spacer'/>
            <div className = 'toolbar__title__wrapper'>
                <div className = 'toolbar__title'>Recycle@Brown</div>
            </div>    
            <div className = 'spacer'/>        
            <div className = 'toolbar__logo'>
                <a href = "http://www.brown.edu" target="_blank" rel="noopener noreferrer">
                    <img src = {brownLogo}width = '100%' height = '100%' alt = "searchicon"/>
                </a>
            </div>
        </nav>
    </header>
);


export default toolbar;