import React, { Component } from "react";
import "../pages/Login/Login.css";

export default class ErrorModal extends Component {

    render() {
        return (
            <div className="error-modal">
                <p className="error-title">Oops!</p>
                <p className="error-description">{this.props.mensagemRetorno}</p>
            </div>
        )
    }
}