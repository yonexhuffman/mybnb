import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import webConfig from './../../../../webConfig';
import classNames from 'classnames';

class PlaceItem extends Component {

    constructor(props) {
        super();
    }

    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }
    
    render() {
        let placedata = this.props.placeitem;
        return (     
            <div className="ui twelve wide mobile four wide tablet four wide computer column">
                <div className="property-item">
                    <div className="property-item-inner">
                      <div className="price-tag-sq">{placedata.price} &euro; <span>/ night</span></div>
                      <a className="add-wishlist modal-ui-trigger" href="" data-trigger-for="wishlist">
                          <i className="icon icon-add-wishlist"></i>
                      </a>
      
                      <a className="image-sq" href="property_page.html">
                          <span className="image-wrapper">
                              <span className="image-inner">
                                  <img src={placedata.imgsrc}  alt="" />
                              </span>
                          </span>
                      </a>
        
                        <div className="main-details">
                          <div className="title-row">
                              <a href="property_page.html" className="title-sq">{placedata.place_name}</a>
                              <a href="vendor_details.html" className="avatar-sq">
                                  <img src={placedata.avatar_imgsrc}  alt="" />
                              </a>
                          </div>
        
                          <div className="icons-row">
                              <div className="icons-column">
                                  <i className="icon icon-heart"></i> {placedata.heart}
                              </div>
                              <div className="icons-column">
                                  <i className="icon icon-account-group-5"></i> x {placedata.account_group}
                              </div>
                              <div className="icons-column">
                                  <i className="icon icon-door-simple"></i> x {placedata.door_simple}
                              </div>
                              <div className="icons-column">
                                  <i className="icon icon-bed-double"></i> x {placedata.bed_double}
                              </div>
                          </div>
                        </div>
        
                    </div>
                </div>
            </div>   
        );
    }  
};

export default PlaceItem;