import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import webConfig from "./../../../../webConfig";
import TopSearchForm from "../../components/mybnb/topsearchform";
import PlaceItem from "../../components/mybnb/placeitem";
import { fetchCitypageData } from "./../../actions";
import axios from "axios";

// import MapWithAMarker from "../../components/mybnb/mybnbgooglemap";

class CityPage extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.fetchCitypageData(this.props.match.params.cityid);
    // document.getElementById('main_header').style.display = 'none';
    document.getElementById('footer').style.display = 'none';

    // const scriptmap = document.createElement("script");
    // scriptmap.src = webConfig.siteURL + '/assets/graphics/library/map.js';
    // scriptmap.async = false;
    // document.body.appendChild(scriptmap);

    // const script = document.createElement("script");
    // script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAFGjWRN0ddQwopal_6VZNmz-9PJCX-caI&callback=initMap';
    // script.async = true;
    // script.defer = true;
    // document.body.appendChild(script);
  }

  head() {
    return (
      <Helmet bodyAttributes={{ class: "CityPage" }}>
        <title>{`MyBNB - CityPage`}</title>
      </Helmet>
    );
  }

  thishead() {
    return (
      <header className="header-section mhs header-sticky header-fullwidth header-isnt-tablet header-isnt-mobile">
        <div className="header-content">
          <div className="ui container grid">
            <div className="header-item header-left">
            </div>

            <div className="header-item header-center ">
            </div>

            <div className="header-item header-right flex-align-left flex-grow-true">

              <div className="item menu-default burger-mobile-modal burger-tablet-modal search-visible flex-grow-true" data-burger="menu02">

                <a href="" className="modal-trigger hamburger hamburger-spin item" data-trigger-for="menu02">
                  <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                  </span>
                </a>

                <ul>
                  <li className="inline-flat-sq">
                    <div className="fltp item" id="rangestart">
                      <input type="text" className="filter" value="" required placeholder="Enter Date" />
                      <label className="placeholder" data-big-placeholder="Check In Date" data-little-placeholder="Check In"></label>
                    </div>

                    <i className="icon icon-little-arrow item hidden-mobile hidden-tablet"></i>

                    <div className="fltp item" id="rangeend">
                      <input type="text" className="filter" value="" required placeholder="Enter Date" />
                      <label className="placeholder" data-big-placeholder="Check Out Date" data-little-placeholder="Check Out"></label>
                    </div>
                  </li>

                  <li>
                    <div className="fltp item flat-sq">
                      <select name="dropdown" defaultValue="0" size="13" className="dropdown" tabIndex="0" required>
                        <option value="0">Guests</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                      <label className="placeholder">Guests</label>
                    </div>
                  </li>

                  <li>
                    <div className="fltp item modal-icons three-columns flat-sq">
                      <select name="dropdown" defaultValue="0" size="4" className="dropdown" required>
                        <option value="0" >Entire Room</option>
                        <option value="1" data-icon="icon-home-3">Entire Room</option>
                        <option value="2" data-icon="icon-door-simple">Private Room</option>
                        <option value="3" data-icon="icon-bed-single">Shared Room</option>
                      </select>
                      <label className="placeholder">Room Type</label>
                    </div>
                  </li>

                  <li className="flex-grow-desktop-true flex-grow-large-desktop-true">
                    <div className="price-range-slider mobile-big item flex-grow-desktop-true flex-grow-large-desktop-true">

                      <label className="placeholder hidden-desktop hidden-large-desktop">Price Range</label>

                      <div id="price-range-slider" className="price-range-slider-base"></div>
                    </div>
                  </li>

                  <li className="has-submenu has-megamenu open-inside-modal filters-dropdown overlay-dropdown">

                    <a href="#" className="item hidden-tablet hidden-mobile">
                      <i className="icon icon-filter"></i>
                      <span className="">Filters</span>
                    </a>

                    <ul className="submenu megamenu special-sq">
                      <li className="item">
                        <div className="content">

                          <div className="div-c inline-3">
                            <div className="divided-column">
                              <label>Bedrooms</label>
                              <select name="dropdown" className="dropdown item">
                                <option value="0">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                                <option value="4">5</option>
                                <option value="5">6</option>
                                <option value="6">7</option>
                                <option value="7">8</option>
                                <option value="8">9</option>
                                <option value="9">10</option>
                              </select>
                            </div>

                            <div className="divided-column">
                              <label>Number of beds</label>
                              <select name="dropdown" className="dropdown item">
                                <option value="0">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                                <option value="4">5</option>
                                <option value="5">6</option>
                                <option value="6">7</option>
                                <option value="7">8</option>
                                <option value="8">9</option>
                                <option value="9">10</option>
                              </select>
                            </div>

                            <div className="divided-column">
                              <label>Bathrooms</label>
                              <select name="dropdown" className="dropdown item">
                                <option value="0">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                                <option value="4">5</option>
                                <option value="5">6</option>
                                <option value="6">7</option>
                                <option value="7">8</option>
                                <option value="8">9</option>
                                <option value="9">10</option>
                              </select>
                            </div>
                          </div>

                          <hr />

                          <div className="div-c inline-3">

                            <div className="divided-column">
                              <label>Instant Booking</label>
                              <input type="checkbox" id="extra01" />
                              <label htmlFor="extra01">Instant Booking</label>
                            </div>
                            <div className="divided-column">
                              <label>Super Host</label>
                              <input type="checkbox" id="extra02" />
                              <label htmlFor="extra02">Super Host</label>
                            </div>
                          </div>

                          <hr />

                          <div className="ui accordion more-sq">
                            <div className="title">
                              <a className="accordion-trigger more-trigger" data-more="More" data-less="Less"><i className="icon icon-arrow-down-122"></i></a>

                              <div className="div-c inline-3 one-label">
                                <label>Amenities</label>
                                <div className="divided-column">
                                  <input type="checkbox" id="checkbox1" />
                                  <label htmlFor="checkbox1">Wireless Internet</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="checkbox2" />
                                  <label htmlFor="checkbox2">Laptop friendly workspace</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="checkbox3" />
                                  <label htmlFor="checkbox3">Iron</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="checkbox4" />
                                  <label htmlFor="checkbox4">Hangers</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="checkbox5" />
                                  <label htmlFor="checkbox5">Hair Dry</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="checkbox6" />
                                  <label htmlFor="checkbox6">Washer</label>
                                </div>

                              </div>

                            </div>
                            <div className="content">
                              <div className="div-c inline-3">
                                <div className="divided-column">
                                  <input type="checkbox" id="checkbox7" />
                                  <label htmlFor="checkbox7">Shampoo</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="checkbox8" />
                                  <label htmlFor="checkbox8">TV</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="checkbox9" />
                                  <label htmlFor="checkbox9">Kitchen</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="checkbox10" />
                                  <label htmlFor="checkbox10">Essentials</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="checkbox11" />
                                  <label htmlFor="checkbox11">Heating</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="checkbox12" />
                                  <label htmlFor="checkbox12">Items</label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <hr />

                          <div className="ui accordion more-sq">
                            <div className="title">
                              <a className="accordion-trigger more-trigger" data-more="More" data-less="Less">
                                <i className="icon icon-arrow-down-122"></i>
                              </a>

                              <div className="div-c inline-3 one-label">
                                <label>Host Language</label>
                                <div className="divided-column">
                                  <input type="checkbox" id="lang1" />
                                  <label htmlFor="lang1">Afrikanns</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="lang2" />
                                  <label htmlFor="lang2">Albanian</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="lang3" />
                                  <label htmlFor="lang3">Arabic</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="lang4" />
                                  <label htmlFor="lang4">Armenian</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="lang5" />
                                  <label htmlFor="lang5">Basque</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="lang6" />
                                  <label htmlFor="lang6">Bengali</label>
                                </div>

                              </div>

                            </div>
                            <div className="content">
                              <div className="div-c inline-3">
                                <div className="divided-column">
                                  <input type="checkbox" id="lang7" />
                                  <label htmlFor="lang7">Bulgarian</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="lang8" />
                                  <label htmlFor="lang8">Catalan</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="lang9" />
                                  <label htmlFor="lang9">Cambodian</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="lang10" />
                                  <label htmlFor="lang10">Chinese (Mandarin)</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="lang11" />
                                  <label htmlFor="lang11">Croation</label>
                                </div>

                                <div className="divided-column">
                                  <input type="checkbox" id="lang12" />
                                  <label htmlFor="lang12">Czech</label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <hr />

                          <div className="div-c inline-3 one-label">
                            <label>House Rules</label>
                            <div className="divided-column">
                              <input type="checkbox" id="rules01" />
                              <label htmlFor="rules01">Pets allowed</label>
                            </div>
                            <div className="divided-column">
                              <input type="checkbox" id="rules02" />
                              <label htmlFor="rules02">Smoking allowed</label>
                            </div>
                            <div className="divided-column">
                              <input type="checkbox" id="rules03" />
                              <label htmlFor="rules03">Suitable for events</label>
                            </div>
                          </div>

                        </div>

                        <div className="footer">
                          <div className="div-c inline-2">
                            <div className="divided-column">
                              <div className="applied-filters">
                                <div className="filters-icon-container">
                                  <i className="icon icon-filter"></i>
                                </div>
                                <a className="remove-all">
                                  Remove All<i className="icon icon-close"></i>
                                </a>
                                <a className="">
                                  Applied Filter<i className="icon icon-close"></i>
                                </a>
                              </div>
                            </div>

                            <div className="divided-column">
                              <a href="" className="float-right-sq button-sq modal-button font-weight-bold-sq">Apply</a>

                              <a className="float-right-sq button-sq cancel-sq hidden-tablet hidden-mobile" href="">Cancel</a>

                            </div>
                          </div>

                        </div>
                      </li>
                    </ul>


                  </li>

                </ul>

              </div>

            </div>

          </div>
        </div>
      </header>
    )
  }

  render() {
    // console.log('render selected', this.props.selected_citydata)
    return (
      <div className="next-sq">
        {this.head()}
        {this.thishead()}
        {/* <TopSearchForm /> */}
        <div className="ui layout">
          <div className="ui grid container fluid">
            <div className="row">
              <div className="ui half-layout">
                <div className="switch-view-controller">
                  <a href="" id="only-list-trigger" className="item">
                    <i className="icon icon-list"></i>
                    <span>List</span>
                  </a>
                  <a href="" id="both-trigger" className="item active hidden-mobile">
                    <i className="icon icon-both"></i>
                    <span>Both</span>
                  </a>

                  <a href="" id="only-map-trigger" className="item">
                    <i className="icon icon-map"></i>
                    <span>Map</span>
                  </a>

                  <a href="" className="modal-trigger item hidden-desktop hidden-large-desktop" data-trigger-for="menu02">
                    <i className="icon icon-filter"></i>
                    <span>Filters</span>
                  </a>
                </div>
                <div className="ui column map">
                  <div id="map">
                    {/* <MapWithAMarker
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `400px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    /> */}
                  </div>
                </div>
                <div className="ui column variable">
                  <div className="ui grid narrow-sq">
                    <div className="row">
                      {this.props.popular_place_list &&
                        this.props.popular_place_list.length > 0
                        ? this.props.popular_place_list.map(
                          (placeitem, index) => {
                            return (
                              <PlaceItem key={index} placeitem={placeitem} />
                            );
                          }
                        )
                        : ""}
                      {this.props.popular_place_list &&
                        this.props.popular_place_list.length > 0
                        ? this.props.popular_place_list.map(
                          (placeitem, index) => {
                            return (
                              <PlaceItem key={index} placeitem={placeitem} />
                            );
                          }
                        )
                        : ""}
                      {this.props.popular_place_list &&
                        this.props.popular_place_list.length > 0
                        ? this.props.popular_place_list.map(
                          (placeitem, index) => {
                            return (
                              <PlaceItem key={index} placeitem={placeitem} />
                            );
                          }
                        )
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    popular_place_list: state.citypageData.topPopularPlaceList,
    selected_citydata: state.citypageData.selected_citydata
  };
}

function loadData(store) {
  return store.dispatch(fetchCitypageData());
}

export default {
  loadData,
  component: connect(
    mapStateToProps,
    { fetchCitypageData }
  )(CityPage)
};
