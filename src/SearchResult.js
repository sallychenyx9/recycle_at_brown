import React, {Component} from 'react';
import './SearchResult.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import Searchbar from './components/Searchbar/Searchbar';
import { faRecycle } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';


import { faSadTear } from '@fortawesome/free-solid-svg-icons'

const url = 'http://ec2-18-217-251-13.us-east-2.compute.amazonaws.com:8080/'; //url of the static hosted website
library.add(faSadTear)
library.add(faRecycle)


export default class SearchResult extends Component{
    
    constructor(props) {
        super(props);
        var cursearch = this.props.match.params.searchstr.replace(/[^\w\s]|_/g, "") ;
        this.state = {
          suggest: [],
          noResultDisplay: 'none',
          resultDisplay: 'none',
          suggestDisplay: 'none',
          name: '',
          description: '',
          searchstr: cursearch   
        }
        this.fetchresult();

      }


    
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.searchstr !== this.props.match.params.searchstr) {

          const currentSearchstr= nextProps.match.params.searchstr.replace(/[^\w\s]|_/g, "")


          this.setState({
            suggest: [],
            noResultDisplay: 'none',
            resultDisplay: 'none',
            suggestDisplay: 'none',
            name: '',
            description: '',
            searchstr: currentSearchstr   
      
          }, () => this.fetchresult());
        }
      }

    fetchresult(){


        const s_url = url +  this.state.searchstr;
        fetch(s_url)
        .then(res => res.json())
        .then(data => {

          if (data.length === 0){
            this.setState({noResultDisplay: ''});
          } else if (data[0].name === this.props.match.params.searchstr){
            this.setState({
              resultDisplay: '',
              name: data[0].name,
              description: data[0].description
            });
          } else {
            if (data.length > 5){
              data = data.slice(0, 5);
            }
            this.setState({
              suggestDisplay: '',
              suggest: data
            });
          }

        })
        .catch(err => {
          console.log(err);
        });

    }


    render(){
        var noResultDisplay = this.state.noResultDisplay;
        var resultDisplay = this.state.resultDisplay;
        var suggestDisplay = this.state.suggestDisplay;

        return(
        <div className = 'main'>
          <Searchbar/>
          <div className = 'no-result' style = {{display: noResultDisplay }}>
            <FontAwesomeIcon className = 'sadIcon' icon="sad-tear" size = '2x' color = '#a7a8a8'/>
            <p className = 'no-result-text'>No results found:(</p>
              <p className = 'no-result-text'>(PS:If the item you are looking for is not here,</p>
              <p className = 'no-result-text'>it is probably not recyclable)</p>
          </div>
          <div className = 'result' style = {{display: resultDisplay}}>
            <div className = 'result-name-wrapper'>
              <p className = "result-name" >{this.state.name}</p>
            </div>
            <div className = 'recyclable'>
              <p className = "recyclable-text" >recyclable</p>
              <FontAwesomeIcon className = 'recycleicon' icon="recycle" color = '#69BE94' />
            </div>
            <p className = "result-description" >{this.state.description}</p>


              
          </div>
          <div className = 'suggest' style = {{display: suggestDisplay}}>
            <p className = 'hint'>Are you looking for...</p>
            {this.state.suggest.map(function(item, i){
                    return <Link key = {i} to = {'/search/' + item.name} ><p className = 'suggest-item'>{item.name}</p></Link>
                })
            }
            <p className = 'hint'>(PS:If the item you are looking for is not here,it is probably not recyclable)</p>
          </div>

        
        </div>
        )
        
    }
    
 
        
    
}


