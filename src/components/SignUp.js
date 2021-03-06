import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import signUpUser from "../Store/Actions/SignUpActions";
import Footer from "../components/Footer";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      picture: "",
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      isSignUp: false,
      isError: false,
      logginSuccess: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target; // this is the target element
    let value = target.value;
    let name = target.name; // name attribute of the input, so we know what changes if the email or the password
    // whenever the input change we restate the state :
    this.setState({
      // set user information in the state
      [name]: value
    });
    console.log(this.state);
  }

  handleSubmit(e) {
    // when we have all the information in the state we want to pass it to the back end
    e.preventDefault(); // stops the page from refreshing on submit

    const user = this.state;

    if (
      user.username !== "" &&
      user.password !== "" &&
      user.passwordRepeat !== "" &&
      user.email !== ""
    ) {
      if (user.passwordRepeat !== user.password) {
        alert("Your password are not matching");
      } else {
        this.props.signUpUser(user);
        this.setState({ logginSuccess: true });
      }
    } else {
      alert("You missed a field");
    }
  }
  loginSuccesRender = (
    <div>
      <p>Thank you, you are now a queer member!</p>
      <Link to="/logIn">
        <p>Log in</p>
      </Link>
    </div>
  );

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        {this.state.logginSuccess ? (
          this.loginSuccesRender
        ) : (
          <div className="FormCenter">
            <form className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">
                  User Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="FormField__Input"
                  placeholder="Enter your User Name"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">
                  Email adress
                </label>
                <input
                  type="email"
                  id="name"
                  className="FormField__Input"
                  placeholder="Enter your email adress"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="FormField__Input"
                  placeholder="Enter your password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">
                  Repeat Password
                </label>
                <input
                  type="passwordRepeat"
                  id="passwordRepeat"
                  className="FormField__Input"
                  placeholder="Enter your password again"
                  name="passwordRepeat"
                  value={this.state.passwordRepeat}
                  onChange={this.handleChange}
                />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="picture">
                  Picture
                </label>
                <input
                  type="text"
                  id="picture"
                  className="FormField__Input"
                  placeholder="Enter your picture url"
                  name="picture"
                  value={this.state.picture}
                  onChange={this.handleChange}
                />
              </div>

              <div className="FormField">
                <button
                  className="FormField__Button mr-20"
                  onClick={this.handleSubmit}
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        )}
        <React.Fragment>
          <Footer></Footer>
        </React.Fragment>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  signUpUser: user => dispatch(signUpUser(user)) // Passing user onformation to the store
});
export default connect(null, mapDispatchToProps)(SignUp);
