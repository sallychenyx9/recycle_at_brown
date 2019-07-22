import React, {Component} from 'react';
import './ItemDetail.css';
import { Icon } from 'semantic-ui-react';


// each MaterialList represents a div/button that can be 
// toggled to show all items that fall under this category.

// has props called NAME that determines the name of the category
class ItemDetail extends Component {
    state = {
        visible: false,
        icon: "angle right",
        iconRotation: false,
    }

    toggleButton = () => {
        let newIcon = this.state.iconRotation ? "angle right" : "angle down";
        this.setState(prevState => ({
            visible: !prevState.visible,
            icon: newIcon, iconRotation: !prevState.iconRotation

        }))

    }

    renderContent = () => {
        return(
            <div className = 'content-wrapper'>
                <span className = 'material'>{this.props.material}</span>
                <span className = 'material'>{this.props.material2}</span>
                <div className = 'description'>{this.props.description}</div>
            </div>
        )
    }


    render(){
        return(
            <div className = 'item-wrapper'>
                <div className = "item-list">
                
                 <div className = "header" onClick = {this.toggleButton}>
                 {this.props.name}
                <Icon className = 'toggle-button' name={this.state.icon}  color='black' style={{ cursor: "pointer" }}/> 
                </div>
                    {this.state.visible &&  this.renderContent() }
                </div>
            </div>
            
    
        )
    }
    
}

export default ItemDetail;