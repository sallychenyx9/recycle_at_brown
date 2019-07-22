import React, {Component} from 'react';
import '../MaterialList/MaterialList.css';
import { Icon } from 'semantic-ui-react';

// each MaterialList represents a div/button that can be 
// toggled to show all items that fall under this category.

class MaterialItem extends Component {
    constructor(props) {
    super(props);
    this.state = {
        visible: false,
        icon: "angle right",
        iconRotation: false,
    }
}

    toggleButton = () => {
        let newIcon = this.state.iconRotation ? "angle right" : "angle down";
        this.setState(prevState => ({
            visible: !prevState.visible,
            icon: newIcon, iconRotation: !prevState.iconRotation

        }))
    }


    render(){
        return(
            
            <div className = "material-item-list">
                <div className = "item-header" onClick = {this.toggleButton}>
                {this.props.name}
                <Icon className = 'toggle-button' name={this.state.icon}   color='black'
                style={{ cursor: "pointer" }}/> 
                </div>
            {this.state.visible && <div className = "item-content">{this.props.description}</div>}
            </div>

            
        )

    }
}

export default MaterialItem;