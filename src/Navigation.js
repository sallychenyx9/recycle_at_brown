import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
class Navigation extends Component{
    render(){
        return(
            <Navbar fixedTop bg = 'light'>
                <Navbar.Header>
                    <Navbar.Brand>
                        <img
                            src = ''
                            width = '30'
                            height = '30'
                            alt = ' '
                        />
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        );
    }
}

export default Navigation;