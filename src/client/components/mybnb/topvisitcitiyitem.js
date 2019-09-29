import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import webConfig from './../../../../webConfig';
import classNames from 'classnames';

class TopVisitCitiyItem extends Component {

    constructor(props) {
        super();
        // console.log('cityitem' , props.cityitem);
    }

    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }
    
    render() {
        let cityItem = this.props.cityitem;
        return (      
            <div className="item">
                <div className="item-inner">
                    <div className="image-sq">
                        <div className="image-wrapper">
                            <div className="image-inner">
                                <img className="image-sq" src={cityItem.imgsrc}  alt="" />
                            </div>
                        </div>
                    </div>
                    <a href={'/city/' + cityItem.id} className="typo-sq">
                        <span className="typo-whitespace"></span>
                        <p className="typo-label-sq" data-label-before={cityItem.label_before} data-label-after={cityItem.label_after}></p>
                        <p className="typo-title-sq">{cityItem.city_title}</p>
                    </a>
                </div>
            </div>
        );
    }  
};

export default TopVisitCitiyItem;