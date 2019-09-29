import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import webConfig from './../../../../webConfig';
import classNames from 'classnames';

class BlogCategoryItem extends Component {

    constructor(props) {
        super();
    }

    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }
    
    render() {
        let categoryData = this.props.categoryData;
        return (     
            <div className="item">
                <div className="item-inner">                                  
                    <div className="image-sq">
                        <div className="image-wrapper">
                            <div className="image-inner">
                                <img className="image-sq" src={categoryData.imgsrc}  alt="" />                  
                            </div>
                        </div>
                    </div>
                    <a href="article_listing.html" className="typo-sq">
                        <p className="typo-title-sq">{categoryData.title}</p>
                    </a>
                </div>
            </div>
        );
    }  
};

export default BlogCategoryItem;