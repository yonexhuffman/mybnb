import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { validate_loginForm as validate } from "./../../common/forms/validation";
import { renderLoginInput } from "./../../common/forms/input-types";
import webConfig from "./../../../../webConfig";
import TopSearchForm from "../../components/mybnb/topsearchform";
import TopVisitCitiyList from "../../components/mybnb/topvisitcitiylist";
import PlaceItem from "../../components/mybnb/placeitem";
import BlogCategoryItem from "../../components/mybnb/blogcategoryitem";
import BlogListItem from "../../components/mybnb/bloglistitem";
import { fetchToppageData } from "./../../actions";

import axios from "axios";

class HomePage extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedFiles: null
    };
  }

  componentDidMount() {
    this.props.fetchToppageData();
  }

  submit(data) {
    console.log(data);
    axios.post('/login', data).then(function (response) {
      alert(response.data.message);
      if (response.data.status == 2) {
        location.href = '/'
      }
    }).catch(function (error) {
      console.log(error);
    });

    // // IMAGE UPLOAD
    // const formData = new FormData();
    // formData.append("email", data.email);
    // formData.append("password", data.password);
    // formData.append("send_files", this.state.selectedFiles);
    // axios({
    //   url: "/uploadfile",
    //   method: "POST",
    //   data: formData
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  onChange(e) {
    this.setState({
      selectedFiles: e.target.files[0]
    });
  }

  head() {
    return (
      <Helmet bodyAttributes={{ class: "homePage" }}>
        <title>{`MyBNB`}</title>
      </Helmet>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="next-sq">
        {this.head()}
        <TopSearchForm />
        <div className="ui layout" id="top">
          <div className="ui grid container">
            <div className="row">
              <div className="ui twelve wide computer column">
                <div className="typo-section-sq bottom-big">
                  <div className="typo-section-header-sq">
                    <h2 className="text-align-center-sq">
                      Top Cities to visit
                    </h2>
                    <p className="text-align-center-sq">
                      Discover awesome experiences around the world.
                    </p>
                  </div>
                  <div className="magic-grid photo-sq hover-default hover-center">
                    {this.props.listtopvisitcities &&
                      this.props.listtopvisitcities.length > 0 ? (
                        <TopVisitCitiyList
                          citylist={this.props.listtopvisitcities}
                        />
                      ) : (
                        ""
                      )}
                  </div>
                  <a
                    className="more-trigger"
                    data-more="See All"
                    href="listing_page.html"
                  >
                    <i className="icon icon-arrow-down-122" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="promo-section">
            <div className="ui container grid centered">
              <div className="row">
                <div className="ui twelve wide mobile ten wide tablet eight wide computer six wide large screen six wide widescreen column">
                  <div className="promo-content style-01">
                    <h2>Explore the world</h2>
                    <p>
                      Spectacular natural wonders and astonishing man-made
                      structures. The list of great landmarks are often limited
                      to seven, but the world is filled with wonders.
                    </p>
                    <a
                      href="listing_page.html"
                      className="button-sq see-through-sq"
                    >
                      {" "}
                      See Map{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="image-wrapper">
              <div className="image-inner">
                <img
                  className="image-sq"
                  src={`${
                    webConfig.siteURL
                    }/assets/graphics/images/promo_section/promo_section_01.jpg`}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="ui grid container">
            <div className="row">
              <div className="ui column">
                <div className="typo-section-sq bottom-big">
                  <div className="typo-section-header-sq">
                    <h2 className="text-align-center-sq">Popular Places</h2>
                    <p className="text-align-center-sq">
                      Find the most visited places in entire world.
                    </p>
                  </div>
                  <div className="ui grid">
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
                  <a
                    href="listing_page.html"
                    className="more-trigger"
                    data-more="Discover All"
                  >
                    <i className="icon icon-arrow-down-122" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="promo-section">
            <div className="ui container grid centered">
              <div className="row">
                <div className="ui twelve wide mobile ten wide tablet eight wide computer six wide large screen six wide widescreen column">
                  <div className="promo-content style-02">
                    <h2>Beautiful Experiences</h2>
                    <p>
                      Few would argue that, despite the advancements of feminism
                      over the past three decades, women still face a double
                      standard when it comes to their behavior.{" "}
                    </p>

                    <a
                      href="listing_page.html"
                      className="button-sq see-through-sq"
                    >
                      {" "}
                      See Map{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="image-wrapper">
              <div className="image-inner">
                <img
                  className="image-sq"
                  src={`${
                    webConfig.siteURL
                    }/assets/graphics/images/promo_section/promo_section_02.jpg`}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="ui grid container">
            <div className="row">
              <div className="ui column">
                <div className="typo-section-sq bottom-big">
                  <div className="typo-section-header-sq">
                    <h2 className="text-align-center-sq">Top Interest</h2>
                    <p className="text-align-center-sq">
                      In hac habitasse platea dictumst. Integer quis tortor
                      enim. Integer et elit nec magna ultricies convallis.{" "}
                      <br /> In venenatis eu erat et facilisis. Vestibulum
                      congue enim nisl.
                    </p>
                  </div>
                  <div className="magic-grid category-sq special-sq hover-scale">
                    {this.props.blog_categories &&
                      this.props.blog_categories.length > 0
                      ? this.props.blog_categories.map(
                        (categoryData, index) => {
                          return (
                            <BlogCategoryItem
                              key={index}
                              categoryData={categoryData}
                            />
                          );
                        }
                      )
                      : ""}
                  </div>
                </div>

                <hr />

                <div className="typo-section-sq bottom-big">
                  <div className="typo-section-header-sq">
                    <h2 className="text-align-center-sq">News</h2>
                    <p className="text-align-center-sq">
                      {" "}
                      Nunc sit amet velit nibh. Proin consectetur, ante quis
                      tristique mattis, massa massa condimentum enim.
                    </p>
                  </div>

                  <div className="magic-grid article-sq hover-scale">
                    {this.props.blog_list && this.props.blog_list.length > 0
                      ? this.props.blog_list.map((blog, index) => {
                        return <BlogListItem key={index} blogdata={blog} />;
                      })
                      : ""}
                  </div>

                  <a
                    href="article_listing.html"
                    className="more-trigger"
                    data-more="View More"
                  >
                    <i className="icon icon-arrow-down-122" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Sign Up --> */}
        <div className="ui full modal" data-for="modal01">
          <div className="modal-full-background">
            <img
              src={`${
                webConfig.siteURL
                }/assets/graphics/images/modal/modal_background_001.jpg`}
              alt=""
            />
          </div>

          <i className="icon icon-close close-modal" />

          <div className="header center">Sign Up Now</div>

          <div className="content">
            <a
              href=""
              className="button-sq fullwidth-sq modal-ui-trigger"
              data-trigger-for="modal03"
            >
              <i className="icon icon-email-2" />
              <span>Sign Up with Email</span>
            </a>

            <a href="" className="button-sq fullwidth-sq facebook-button">
              <i className="icon icon-logo-facebook2" />
              <span>Sign Up with Facebook</span>
            </a>

            <a href="" className="button-sq fullwidth-sq google-button">
              <img
                src={`${
                  webConfig.siteURL
                  }/assets/graphics/images/icon-google-plus.svg`}
                alt=""
              />
              <span>Sign Up with Google</span>
            </a>
            <p>
              By signing up today you agree to the terms of service and privacy
              policy of Parqyt, inc.
            </p>
          </div>

          <div className="actions">
            <div className="border-container">
              <div
                className="button-sq link-sq modal-ui-trigger"
                data-trigger-for="modal02"
              >
                Already a member?
              </div>

              <div
                className="button-sq link-sq login-sq modal-ui-trigger"
                data-trigger-for="modal02"
              >
                Log In
                <i className="icon icon-person-lock-2" />
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Log In --> */}
        <div className="ui full modal" data-for="modal02">
          <div className="modal-full-background">
            <img
              src={`${
                webConfig.siteURL
                }/assets/graphics/images/modal/modal_background_001.jpg`}
              alt=""
            />
          </div>

          <i className="icon icon-close close-modal" />

          <div className="header center">Log In</div>

          <div className="content">
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit(this.submit.bind(this))}
            >
              <div className="div-c">
                <Field name="email" component={renderLoginInput} type="email" />
                <Field
                  name="password"
                  component={renderLoginInput}
                  type="password"
                />

                {/* <input
                  type="file"
                  name="send_file"
                  multiple
                  onChange={e => this.onChange(e)}
                /> */}
                {/* <input type="file" name="send_file" multiple onChange={(e) => this.onChange(e)} /> */}
                {/* <Field
                      name="send_file"
                      component={renderLoginInput}
                      type="file"
                    /> */}
                {/* <div className="divided-column">
                        <input type="email" name="email" placeholder="E-mail Adress" required defaultValue="yonexhuffman@hotmail.com" />
                    </div>
                    <div className="divided-column">
                        <input type="password" name="password" placeholder="Password" required minLength="8" maxLength="" />
                    </div> */}
              </div>
              <button className="button-sq fullwidth-sq">Sign Up</button>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur faucibus magna vel ex semper, in pharetra justo
                pulvinar.{" "}
              </p>
            </form>
          </div>

          <div className="actions">
            <div className="border-container">
              <div
                className="button-sq link-sq modal-ui-trigger"
                data-trigger-for="modal01"
              >
                Don’t have an account?
              </div>

              <div
                className="button-sq link-sq login-sq modal-ui-trigger"
                data-trigger-for="modal01"
              >
                Sign Up
                <i className="icon icon-person-add-1" />
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
    listtopvisitcities: state.homepageData.topVisitCities,
    popular_place_list: state.homepageData.topPopularPlaceList,
    blog_categories: state.homepageData.topBlogCategories,
    blog_list: state.homepageData.topBlogList
  };
}

function loadData(store) {
  return store.dispatch(fetchToppageData());
}

HomePage = reduxForm({
  form: "loginForm",
  validate,
  enableReinitialize: true
})(HomePage);

export default {
  loadData,
  component: connect(
    mapStateToProps,
    { fetchToppageData }
  )(HomePage)
};
