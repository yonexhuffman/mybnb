import React , {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import webConfig from './../../../../webConfig';

var loadScript = function(src){
    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    document.getElementsByTagName('body').appendChild(tag);
}

class Footer extends Component {

    constructor(props) {
        super();
    }

    componentDidMount() {
        let external_library = [
            '/assets/graphics/library/jquery-2.2.0.min.js' , 
            '/assets/graphics/library/flexmenu.js' , 
            '/assets/graphics/library/nouislider.min.js' , 
            '/assets/graphics/library/wNumb.js' , 
            '/assets/graphics/library/jrespond.min.js' , 
            '/assets/graphics/library/scrollspy.min.js' , 
            '/assets/graphics/library/visibility.js' , 
            '/assets/graphics/library/accordion.js' , 
            '/assets/graphics/library/dropdown-custom.js' , 
            '/assets/graphics/library/sticky.js' , 
            '/assets/graphics/library/page-transition.js' ,
            '/assets/graphics/library/checkbox.js' ,
            '/assets/graphics/library/transition.js' ,
            '/assets/graphics/library/sidebar.js' ,
            '/assets/graphics/library/modal.js' ,
            '/assets/graphics/library/dimmer.js' ,
            '/assets/graphics/library/popup.js' ,
            '/assets/graphics/library/calendar.js' ,
            '/assets/graphics/library/slick.js' , 
            '/assets/graphics/library/header.js' ,
            '/assets/graphics/library/functions.js' , 
            // '/assets/graphics/library/back-to-top.js' , 
        ]
        let i = 0;
        for (i = 0 ; i < external_library.length ; i ++) {
            const script = document.createElement("script");
            script.src = webConfig.siteURL + external_library[i];
            script.async = false;
            document.body.appendChild(script);
        }
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <div id="footer">
               <div className="footer-top">
                   
                   <div className="ui grid container">
                       <div className="row">
                           <div className="ui six wide tablet four wide computer column">
                               <h5>Book Parking</h5>
                               
                               <ul className="list-default-sq">
                                   <li><a href="">San Francisco Parking</a></li>
                                   <li><a href="">Los Angeles Parking</a></li>
                                   <li><a href="">New York Parking</a></li>
                                   <li><a href="">Airport Parking</a></li>
                                   <li><a href="">Event Parking</a></li>
                                   <li><a href="">All Parking</a></li>
                                   <li><a href="">Nearby Parking</a></li>
                                   <li><a href="">Overnight Parking</a></li>
                               </ul>
                               
                           </div>
                           <div className="ui six wide tablet four wide computer column">
                               <h5>Useful Link</h5>
                               
                               <ul className="list-default-sq">
                                   <li><a href="">Aenean sit amet ipsum</a></li>
                                   <li><a href="">Sed mollis</a></li>
                                   <li><a href="">Aliquam porttitor</a></li>
                                   <li><a href="">Nulla vitae</a></li>
                               </ul>
            
                           </div>
                           <div className="ui six wide tablet four wide computer column">
                               <h5>Company</h5>
                               
                               <ul className="list-default-sq">
                                   <li><a href="">About Us</a></li>
                                   <li><a href="">Press</a></li>
                                   <li><a href="">Careers</a></li>
                                   <li><a href="">Blog</a></li>
                                   <li><a href="">Reviews</a></li>
                                   <li><a href="">Contact Us</a></li>
                                   <li><a href="">Faqs</a></li>
                                   <li><a href="">Terms & Conditions</a></li>
                                   <li><a href="">Privacy Policy</a></li>
                               </ul>
                           </div>
                           <div className="ui twelve wide tablet four wide computer column">
                               <h5>Title</h5>
                               
                               <p><em>In hac habitasse platea dictumst. Integer quis tortor enim. Integer et elit nec magna ultricies convallis. In venenatis eu erat et facilisis. Vestibulum congue enim nisl. Fusce arcu enim, porta a auctor vel, hendrerit a libero. Vivamus vel dapibus sem.</em></p>
                           </div>
                       </div>
                   </div>
               </div>
               
               <div className="footer-bottom">
                   <div className="ui grid container">
                       <div className="row">
                           <div className="ui twelve wide mobile eight wide computer column">
                                <Link className="footer-logo" to="/">
                                   <img src={`${webConfig.siteURL}/assets/graphics/images/logo-mybnb-transparent.png`} srcSet={`${webConfig.siteURL}/assets/graphics/images/logo-mybnb-transparent.png 1x,${webConfig.siteURL}/assets/graphics/images/logo-mybnb-transparent.png 2x`} alt="mybnb logo" />
                                   © Parqyt, Inc. 2019    
                                </Link>
                           </div>
                           <div className="ui twelve wide mobile four wide computer column">
                               <ul className="social-links-sq list-style-inline-sq list-default-sq">
                                    <li><a href="" className="fb"><i className="icon icon-logo-facebook2"></i></a></li>
            
                                    <li><a href="" className="tw"><i className="icon icon-logo-twitter-bird2"></i></a></li>
            
                                    <li><a href="" className="gp"><i className="icon icon-logo-circle-google-plus-22"></i></a></li>
                                </ul>
                           </div>
                       </div>
                   </div>    
               </div>
                
            </div>
        );
    }

}

// const Footer = () => {
//     loadScript('//cdnjs.com/some/library.js')
//     loadScript('//cdnjs.com/some/other/library.js')
//     return (
//         <div id="footer">
//            <div className="footer-top">
               
//                <div className="ui grid container">
//                    <div className="row">
//                        <div className="ui six wide tablet four wide computer column">
//                            <h5>Book Parking</h5>
                           
//                            <ul className="list-default-sq">
//                                <li><a href="">San Francisco Parking</a></li>
//                                <li><a href="">Los Angeles Parking</a></li>
//                                <li><a href="">New York Parking</a></li>
//                                <li><a href="">Airport Parking</a></li>
//                                <li><a href="">Event Parking</a></li>
//                                <li><a href="">All Parking</a></li>
//                                <li><a href="">Nearby Parking</a></li>
//                                <li><a href="">Overnight Parking</a></li>
//                            </ul>
                           
//                        </div>
//                        <div className="ui six wide tablet four wide computer column">
//                            <h5>Useful Link</h5>
                           
//                            <ul className="list-default-sq">
//                                <li><a href="">Aenean sit amet ipsum</a></li>
//                                <li><a href="">Sed mollis</a></li>
//                                <li><a href="">Aliquam porttitor</a></li>
//                                <li><a href="">Nulla vitae</a></li>
//                            </ul>
        
//                        </div>
//                        <div className="ui six wide tablet four wide computer column">
//                            <h5>Company</h5>
                           
//                            <ul className="list-default-sq">
//                                <li><a href="">About Us</a></li>
//                                <li><a href="">Press</a></li>
//                                <li><a href="">Careers</a></li>
//                                <li><a href="">Blog</a></li>
//                                <li><a href="">Reviews</a></li>
//                                <li><a href="">Contact Us</a></li>
//                                <li><a href="">Faqs</a></li>
//                                <li><a href="">Terms & Conditions</a></li>
//                                <li><a href="">Privacy Policy</a></li>
//                            </ul>
//                        </div>
//                        <div className="ui twelve wide tablet four wide computer column">
//                            <h5>Title</h5>
                           
//                            <p><em>In hac habitasse platea dictumst. Integer quis tortor enim. Integer et elit nec magna ultricies convallis. In venenatis eu erat et facilisis. Vestibulum congue enim nisl. Fusce arcu enim, porta a auctor vel, hendrerit a libero. Vivamus vel dapibus sem.</em></p>
//                        </div>
//                    </div>
//                </div>
//            </div>
           
//            <div className="footer-bottom">
//                <div className="ui grid container">
//                    <div className="row">
//                        <div className="ui twelve wide mobile eight wide computer column">
//                             <Link className="footer-logo" to="/">
//                                <img src={`${webConfig.siteURL}/assets/graphics/images/logo-mybnb-transparent.png`} srcSet={`${webConfig.siteURL}/assets/graphics/images/logo-mybnb-transparent.png 1x,${webConfig.siteURL}/assets/graphics/images/logo-mybnb-transparent.png 2x`} alt="mybnb logo" />
//                                © Parqyt, Inc. 2019    
//                             </Link>
//                        </div>
//                        <div className="ui twelve wide mobile four wide computer column">
//                            <ul className="social-links-sq list-style-inline-sq list-default-sq">
//                                 <li><a href="" className="fb"><i className="icon icon-logo-facebook2"></i></a></li>
        
//                                 <li><a href="" className="tw"><i className="icon icon-logo-twitter-bird2"></i></a></li>
        
//                                 <li><a href="" className="gp"><i className="icon icon-logo-circle-google-plus-22"></i></a></li>
//                             </ul>
//                        </div>
//                    </div>
//                </div>    
//            </div>
            
//         </div>
//     );  
// };

export default Footer;