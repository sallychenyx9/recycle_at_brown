import React from 'react';
import './SideDrawer.css';
import {Link} from 'react-router-dom';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faBookReader, faThList, faSeedling } from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faBookReader, faThList, faSeedling)

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses = 'side-drawer open';
    }

    return(
    <nav className = {drawerClasses}>
        <ul>
            <li className="home">
                <FontAwesomeIcon icon="home" color="#4e3629" className="icon"/>
                <Link to = '/' onClick = {props.closeDrawer}> Home</Link>
            </li>
            <li>
                <FontAwesomeIcon icon="book-reader" color="#4e3629" className="icon"/>
                <Link to = '/materials' onClick = {props.closeDrawer}> Browse by materials</Link>
            </li>
            <li>
                <FontAwesomeIcon icon="th-list" color="#4e3629" className="icon"/>
                <Link to = '/all' onClick = {props.closeDrawer}> View all recyclables</Link>
            </li>
            <li>
                <FontAwesomeIcon icon="seedling" color="#4e3629" className="icon"/>
                <span className = "redirect" rel="noopener noreferrer" onClick={props.redirect}>Sustainability @Brown</span>
            </li>
        </ul>
    </nav>)
};

export default sideDrawer;