import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from "../button.component";

import { connect } from "react-redux";
import { clearMessage } from "../../actions/message";

import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import authHeader from "../../services/auth-header";
import { Redirect } from "react-router";
import { startMatch } from "../../actions/match";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
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

class StartMatch extends Component {
  constructor(props) {
    super(props);
    // console.log(localStorage.getItem("teamId"));

    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChecked = this.onChecked.bind(this);

    this.state = {
      name: "",
      token: authHeader(),
      check: false,
      successful: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChecked() {
    this.setState({
      check: true,
    });
  }

  componentDidMount() {
    this.props.dispatch(clearMessage);
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
          startMatch(
            this.state.name,
            JSON.parse(localStorage.getItem("teamId")),
            this.state.token
          )
        )
        .then(() => {
          this.setState({
            successful: true,
          });
          //   this.props.history.push("/profile");
        })
        .catch(() => {
          this.setState({
            successful: true,
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
            <div>
              <div className="form-group">
                <label htmlFor="name">Opponent</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeName}
                  validations={[required, vname]}
                />
              </div>
              {!this.state.successful ? (
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Check</button>
                </div>
              ) : null}

              {this.state.successful ? (
                <Link to="/match">
                  <div className="form-group">
                    <button className="btn btn-primary btn-block">
                      Start Match
                    </button>
                  </div>
                </Link>
              ) : null}
            </div>

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
  console.log(message);
  return {
    message,
  };
}

export default connect(mapStateToProps)(StartMatch);
