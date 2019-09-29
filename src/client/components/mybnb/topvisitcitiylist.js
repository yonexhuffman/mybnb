import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import webConfig from './../../../../webConfig';
import classNames from 'classnames';
import TopVisitCitiyItem from './topvisitcitiyitem';

class TopVisitCitiyList extends Component {

    constructor(props) {
        super();
    }

    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }
    
    render() {
        return this.props.citylist.map((cityitem , index) => {
            return(
                <TopVisitCitiyItem key={index} cityitem={cityitem}></TopVisitCitiyItem>
            )
        })
    }  
};

export default TopVisitCitiyList;