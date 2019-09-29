import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import webConfig from './../../../../webConfig';
import classNames from 'classnames';

class Header extends Component {

    constructor(props) {
        super();
        this.state = {
            vPos: 0,
            mobileToggle: false
        }
        this.listenScrollEvent = this.listenScrollEvent.bind(this);
    }

    listenScrollEvent(event) {
        this.setState({
            vPos: event.target.body.scrollTop
        });
    }

    toggleMobileNav() {
        this.setState({
            mobileToggle: !this.state.mobileToggle
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenScrollEvent);
    }

    render() {

        return (
            <header className="header-section ths header-shadow header-sticky header-slide-up equal-tablet-header-items equal-mobile-header-items header-transparent is-sticky flexMenuActive reverse is-transparent" id="main_header">
                <div className="header-content">
                    <div className="ui container grid">
                        <div className="header-item header-left flex-order-tablet-second flex-order-mobile-second flex-grow-tablet-true flex-grow-mobile-true">

                            <Link className="logo item" to="/">
                                <img src={`${webConfig.siteURL}/assets/graphics/images/logo-mybnb-transparent.png`} srcSet={`${webConfig.siteURL}/assets/graphics/images/logo-mybnb-transparent.png 1x,${webConfig.siteURL}/assets/graphics/images/logo-mybnb-transparent.png 2x`} alt="mybnb logo" className="logo-transparent" />
                                <img src={`${webConfig.siteURL}/assets/graphics/images/logo-mybnb.png`} srcSet={`${webConfig.siteURL}/assets/graphics/images/logo-mybnb.png 1x,${webConfig.siteURL}/assets/graphics/images/logo-mybnb.png 2x`} alt="mybnb logo" />
                            </Link>

                        </div>

                        <div className="header-item header-center flex-align-left flex-order-tablet-first flex-order-mobile-first flex-grow-large-desktop-true flex-grow-desktop-true flex-grow-tablet-false flex-grow-mobile-false">

                        </div>

                        <div className="header-item header-right flex-order-tablet-third flex-order-mobile-third flex-shrink-true flex-align-right">

                            {/* <!-- Sidemenu Trigger --> */}
                            <a className="sidemenu-trigger close-sq hamburger hamburger-spin item hidden-desktop hidden-large-desktop" data-trigger-for="menu01">

                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </a>

                            {/* <!-- Include Menu --> */}

                            {/* <!-- Header Menu--> */}

                            <div className="item menu-default burger-mobile-sidemenu burger-tablet-sidemenu sidemenu-open-right icons-left profile-priority slide-out-sq dimmed flexMenu dropdown-open-right" data-burger="menu01">

                                <ul className="main-menu">

                                    <li><a href="become_a_vendor.html" className="item">
                                        <span>Become a Vendor</span>
                                    </a>
                                    </li>

                                    <li className="has-submenu">
                                        <a href="#" className="item">
                                            <span>Features</span>
                                        </a>
                                        <ul className="submenu">
                                            <li><a href="../features/fts_default_grid.html" className="item"><span>Default Grid</span></a></li>
                                            <li><a href="../features/fts_divided_container.html" className="item"><span>Divided Container</span></a></li>
                                            <li><a href="../features/fts_magic_grid.html" className="item"><span>Magic Grid</span></a></li>
                                            <li>
                                                <hr />
                                            </li>
                                            <li><a href="../features/fts_header.html" className="item"><span>Header</span></a></li>
                                            <li><a href="../features/fts_menu.html" className="item"><span>Menu Default</span></a></li>
                                            <li><a href="../features/fts_dashboard_menu.html" className="item"><span>Dashboard Menu</span></a></li>
                                            <li><a href="../features/fts_logo.html" className="item"><span>Logo</span></a></li>
                                            <li><a href="../features/fts_buttons.html" className="item"><span>Buttons</span></a></li>
                                            <li><a href="../features/fts_icons.html" className="item"><span>Icons</span></a></li>
                                            <li><a href="../features/fts_form_elements.html" className="item"><span>Form Elements</span></a></li>
                                            <li><a href="../features/fts_floating_placeholder.html" className="item"><span>Floating Placeholder</span></a></li>
                                            <li><a href="../features/fts_sticky_element.html" className="item"><span>Sticky Element</span></a></li>
                                            <li><a href="../features/fts_property_items.html" className="item"><span>Property Items</span></a></li>
                                            <li><a href="../features/fts_articles.html" className="item"><span>Articles</span></a></li>
                                            <li><a href="../features/fts_promo_section.html" className="item"><span>Promo Sections</span></a></li>
                                            <li><a href="../features/fts_modals.html" className="item"><span>Modals</span></a></li>
                                            <li><a href="../features/fts_accordion.html" className="item"><span>Accordion</span></a></li>
                                            <li><a href="../features/fts_hero_search_horizontal.html" className="item"><span>Hero Search Horizontal</span></a></li>
                                            <li><a href="../features/fts_hero_search_vertical.html" className="item"><span>Hero Search Vertical</span></a></li>
                                            <li><a href="../features/fts_slick_carousel.html" className="item"><span>Slick Carousel</span></a></li>
                                            <li><a href="../features/fts_slick_hero_big.html" className="item"><span>Slick Hero Big</span></a></li>
                                            <li><a href="../features/fts_slick_full_page_search.html" className="item"><span>Slick Full Page Search</span></a></li>
                                            <li><a href="../features/fts_charts.html" className="item"><span>Charts</span></a></li>
                                            <li><a href="../features/fts_progressbar.html" className="item"><span>Progressbar</span></a></li>
                                            <li><a href="../features/fts_hamburger_icon.html" className="item"><span>Hamburger Icon</span></a></li>
                                            <li><a href="../features/fts_calendar.html" className="item"><span>Calendar</span></a></li>
                                            <li><a href="../features/fts_price_range_slider.html" className="item"><span>Price Range Slider</span></a></li>
                                            <li>
                                                <hr />
                                            </li>
                                            <li><a href="../features/fts_typography.html" className="item"><span>Typography</span></a></li>
                                            <li><a href="../features/fts_code.html" className="item"><span>Code</span></a></li>
                                            <li><a href="../features/fts_image.html" className="item"><span>Image</span></a></li>
                                            <li><a href="../features/fts_image_gallery.html" className="item"><span>Image Gallery</span></a></li>
                                            <li><a href="../features/fts_table.html" className="item"><span>Table</span></a></li>

                                        </ul>
                                    </li>

                                    <li><a href="#" className="item modal-ui-trigger" data-trigger-for="modal01">
                                        <span>Sign Up</span>
                                    </a>
                                    </li>

                                    <li><a href="#" className="item modal-ui-trigger" data-trigger-for="modal02">
                                        <span>Log In</span>
                                    </a>
                                    </li>

                                </ul>
                            </div>

                            {/* <!-- End of Header Menu--> */}


                        </div>
                    </div>

                </div>
            </header>
        );
    }
};

export default Header;