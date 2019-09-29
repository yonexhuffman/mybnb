import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import webConfig from './../../../../webConfig';
import classNames from 'classnames';

class BlogListItem extends Component {

    constructor(props) {
        super();
    }

    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }
    
    render() {
        let blogData = this.props.blogdata;
        return (    
            <div className="item">
              <div className="item-inner">
                  <a className="image-sq" href="article.html">
                      <span className="image-wrapper">
                          <span className="image-inner">
                              <img className="image-sq" src={blogData.imgsrc}  alt="" />        
                          </span>
                      </span>
                  </a>
                  <div className="typo-sq">
                    <p className="typo-label-sq" data-label-before={blogData.label_before} data-label-after={blogData.label_after}></p>
                    <p className="typo-title-sq">{blogData.title}</p>
                    <p className="typo-desc-sq">{blogData.summary}</p>
      
                      <a href="" className="read-more-sq">read more <i className="icon icon-arrow-right-122"></i></a>
                  </div>
              </div>
            </div>
        );
    }  
};

export default BlogListItem;