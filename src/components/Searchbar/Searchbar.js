import React, {Component} from 'react';
import './Searchbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from "react-router-dom";

library.add(faSearch)


class Searchbar extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          value: '',
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

    handleClick(){
 

    }

    handleChange(event){
        
        this.setState({value: event.target.value});
        
    }

    handleClick= (event) => {
        event.preventDefault();
        var filteredStr = this.state.value.trim().replace(/[^\w\s]|_/g, "");
        this.setState({
            value: filteredStr 
      
        });
        if (filteredStr !== ''){
            this.props.history.push('/search/' + this.state.value);
            this.setState({value: ""});

        }
            
        return false;
    }


    render(){
        return(
        <div className = 'search-bar-wrapper'>
            <div className="search-bar">
                <form onSubmit={this.handleClick}>
                    <input className = "search-input" value = {this.state.value} onChange = {this.handleChange} placeholder="Search for recyclables..."/>

                </form>
                <FontAwesomeIcon className = "search-btn" icon="search" alt = "search" size={'lg'} color='black' onClick = {this.handleClick}/> 
            </div>
        </div>
        )
        
    }
    
 
        
    
}
export default withRouter(Searchbar);



