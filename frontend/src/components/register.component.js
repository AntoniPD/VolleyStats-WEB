import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { register } from "../actions/auth";
import { clearMessage } from "../actions/message";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const username = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid username.
      </div>
    );
  }
};

const vname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 8 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 8 and 40 characters.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      name: "",
      username: "",
      password: "",
      roles: [],
      successful: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(clearMessage);
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(
            this.state.name,
            this.state.username,
            this.state.password,
            this.state.roles
          )
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required, vname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="email"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, username]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="statistcheck"
                    checked={this.state.roles.includes("Statist")}
                    onChange={(event) => {
                      if (!event.target.checked) {
                        const newRoles = this.state.roles.filter(
                          (role) => role !== "Statist"
                        );
                        this.setState({
                          roles: newRoles,
                        });
                      } else {
                        this.setState({
                          roles: [...this.state.roles, "Statist"],
                        });
                      }
                    }}
                  />
                  <label for="role">Statist</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="playercheck"
                    checked={this.state.roles.includes("Player")}
                    onChange={(event) => {
                      if (!event.target.checked) {
                        const newRoles = this.state.roles.filter(
                          (role) => role !== "Player"
                        );
                        this.setState({
                          roles: newRoles,
                        });
                      } else {
                        this.setState({
                          roles: [...this.state.roles, "Player"],
                        });
                      }
                    }}
                  />
                  <label for="role">Player</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="fancheck"
                    checked={this.state.roles.includes("Fan")}
                    onChange={(event) => {
                      console.log(event.target.checked);
                      if (!event.target.checked) {
                        const newRoles = this.state.roles.filter(
                          (role) => role !== "Fan"
                        );
                        this.setState({
                          roles: newRoles,
                        });
                      } else {
                        this.setState({
                          roles: [...this.state.roles, "Fan"],
                        });
                      }
                    }}
                  />
                  <label for="role">Fan</label>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
