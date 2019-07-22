import React, {Component} from 'react';
import './MaterialList.css';
import { Icon } from 'semantic-ui-react';
import MaterialItem from '../MaterialItem/MaterialItem';
// each MaterialList represents a div/button that can be 
// toggled to show all items that fall under this category.
// has props called NAME that determines the name of the category

const url = 'http://ec2-18-217-251-13.us-east-2.compute.amazonaws.com:8080/'; //url of the static hosted website
class MaterialList extends Component {

    constructor(props){
        super(props);

        this.state = {
            visible: false,
            icon: "angle right",
            iconRotation: false,
            items: [] //format: name (for now)
        }
        this.getItems();
    }

    toggleButton = () => {
        let newIcon = this.state.iconRotation ? "angle right" : "angle down";
        this.setState(prevState => ({
            visible: !prevState.visible,
            icon: newIcon, iconRotation: !prevState.iconRotation

        }))

    }
    getItems = () => {
        const m_url = url +'getitems/' + this.props.name;
        fetch(m_url)
        .then(res => res.json())
        .then(data => {
          this.setState({items: data});
    
        })
        .catch(err => {
          console.log(err)
        });
    }


    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render(){
        return(
            
            <div className = 'material-list'>
                <div className = "materialpg-header" onClick = {this.toggleButton}>
                {this.capitalize(this.props.name)}
                <Icon className = 'toggle-button' name={this.state.icon}   color='black'
                style={{ cursor: "pointer" }}/> 
                </div>
                {this.state.visible && 
                    this.state.items.map(function(item, i){
                        return (<MaterialItem key = {i} name = {this.capitalize(item.name)} 
                            description = {item.description}></MaterialItem>)
                    },this)

                }
            
            </div>
            
    
        )

    }
}

export default MaterialList;