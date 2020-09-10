import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { clearMessage } from "../../actions/message";

import authHeader from "../../services/auth-header";
import { Redirect } from "react-router-dom";

import SimpleSelect from "./dropdown";
import { createPlayer } from "../../actions/player";

export const playerConstraints = {
  NUMBER_PATTERN: /^[0-9\b]+$/,
};

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

const vnumber = (value) => {
  if (!value.match(playerConstraints.NUMBER_PATTERN)) {
    return (
      <div className="alert alert-danger" role="alert">
        This field must be number.
      </div>
    );
  } else if (value.length < 1 || value.length > 2) {
    return (
      <div className="alert alert-danger" role="alert">
        The number must be with one or two digits.
      </div>
    );
  }
};
const vheight = (value) => {
  if (!value.match(playerConstraints.NUMBER_PATTERN)) {
    return (
      <div className="alert alert-danger" role="alert">
        This field must be number.
      </div>
    );
  } else if (value.length !== 3) {
    return (
      <div className="alert alert-danger" role="alert">
        The height must be with 3 digits.
      </div>
    );
  }
};
const vweight = (value) => {
  if (!value.match(playerConstraints.NUMBER_PATTERN)) {
    return (
      <div className="alert alert-danger" role="alert">
        This field must be number.
      </div>
    );
  } else if (value.length < 2 || value.length > 3) {
    return (
      <div className="alert alert-danger" role="alert">
        The number must be with two or three digits.
      </div>
    );
  }
};

class CreatePlayer extends Component {
  constructor(props) {
    super(props);
    console.log("innn");
    console.log(localStorage.getItem("teamId"));

    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);

    this.state = {
      name: "",
      position: "",
      number: 0,
      height: 0,
      weight: 0,
      token: authHeader(),
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

  onChangePosition(e) {
    this.setState({
      position: e.target.value,
    });
  }

  onChangeNumber(e) {
    this.setState({
      number: e.target.value,
    });
  }
  onChangeWeight(e) {
    this.setState({
      weight: e.target.value,
    });
  }
  onChangeHeight(e) {
    this.setState({
      height: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();
    const { dispatch, history } = this.props;
    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          createPlayer(
            this.state.name,
            this.state.number,
            this.state.position,
            this.state.height,
            this.state.weight,
            JSON.parse(localStorage.getItem("teamId")),
            this.state.token
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
          history.push("/teams");
          window.location.reload();
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
                  <label htmlFor="number">Number</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="number"
                    value={this.state.number}
                    onChange={this.onChangeNumber}
                    validations={[required, vnumber]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="height">Height</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="height"
                    value={this.state.height}
                    onChange={this.onChangeHeight}
                    validations={[required, vheight]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Weight</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="weight"
                    value={this.state.weight}
                    onChange={this.onChangeWeight}
                    validations={[required, vweight]}
                  />
                </div>
                <div className="form-group">
                  <SimpleSelect
                    value={this.state.position}
                    onChange={this.onChangePosition}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">
                    Create Player
                  </button>
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
  console.log(message);
  return {
    message,
  };
}

export default connect(mapStateToProps)(CreatePlayer);
