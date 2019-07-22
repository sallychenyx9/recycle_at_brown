import React, { Component } from 'react';
import './App.css';
import ItemDetail from './components/ItemDetail/ItemDetail'

const url = 'http://ec2-18-217-251-13.us-east-2.compute.amazonaws.com:8080/'; //url of the static hosted website



class All extends Component{
    isUnmounted = false;
    constructor(props){
        super(props);
        this.state = {
            all: []
        }

        this.fetchHandler();
    }
    
    componentDidMount() {
        this.isUnmounted = false;
      }
    
      componentWillUnmount() {
        this.isUnmounted = true;
      }

    fetchHandler = () =>{
        fetch(url + 'getall/atoz')
        .then(
            res => res.json()
        ).then(data =>{
            if (this.isUnmounted) {
                return;
              }
            this.setState({
                all: data
            })
        })
    
        .catch(err => {
            console.log(err);
        })


    }

    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render(){
        return(
            <div>
                {this.state.all.map(function(item, i){
                    return <div key = {i}>
                        <ItemDetail  name = {this.capitalize(item.name)} 
                        material = {this.capitalize(item.material1)} 
                        material2 = {this.capitalize(item.material2)}
                        description = {item.description}/>
                        </div>
                        
                    }, this)}
            </div>
        )
    }
}

export default All;