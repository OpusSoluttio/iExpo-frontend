import React, { Component } from "react";
import Logo from "../../assets/img/logo.png";
// import TextField from '@material-ui/core/TextField';
// import TextInput from "react-materialize";
import Modal from "react-responsive-modal";
import ErrorModal from "../../components/ErrorModal"
import "./Login.css";
import Axios from 'axios';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/core";


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            senha: "",
            erro: false,
            mensagemRetorno: "",
            carregando: false,
        }
    }

    /// função chamada quando aperta o "X" do modal
    fecharModal = () => {
        this.setState({ erro: false });
    }

    atualizarInputs = (event) => {
        event.preventDefault();
        this.setState( {[event.target.name] : event.target.value })
    }

    efetuarLogin = (event) => {
        event.preventDefault();
        this.setState({ carregando: true })

        if (this.state.email === null || this.state.email === "") {
            this.setState({ erro: true });
            this.setState({ mensagemRetorno: "Preencha o campo de email corretamente" });
        } else if (this.state.senha === null || this.state.senha === "") {
            this.setState({ erro: true });
            this.setState({ mensagemRetorno: "Preencha o campo da senha corretamente" });
        } else {


            Axios.post("http://localhost:5000/api/login", {
                email: this.state.email,
                senha: this.state.senha
            })
                .then(response => {
                    this.setState({ carregando: false, })
                    if (response.status === 200) {
                        localStorage.setItem("usuario-iexpo", response.data.token);
                        this.props.history.push('/');
                        alert("deu certo")
                    } else if (response.status == 404) {
                        this.setState({ erro: true, mensagemRetorno: "Usuário ou Senha inválidos" });
                    } else {
                        console.log("Algo deu errado.");
                        this.setState({ erro: true, mensagemRetorno: "Ocorreu um erro inesperado! Por favor, tente novamente mais tarde" });

                    }
                })
                .catch(erro => {
                    this.setState({ carregando: false, })
                    if (erro.response.status == 404){
                        this.setState({ erro: true, mensagemRetorno: "Usuário ou Senha inválidos" });
                    } else{
                        this.setState({ erro: true, mensagemRetorno: "Ocorreu um erro inesperado! Por favor, tente novamente mais tarde" });
                    }
                    console.log(erro);
                });
        }
    }
    //TODO
    //preencher com url certinha da api e com qual rota vai ser redirecionado.
    //depois de testado retirar os console.log



    render() {
        return (
            <div className="Login">
                <ClimbingBoxLoader
                    loading={this.state.carregando}
                    size={"20px"}
                    color={"#FFF"}
                    css={override}
                />

                <main>

                    <Modal
                        className="error-alert"
                        open={this.state.erro}
                        onClose={this.fecharModal}
                        focusTrapped={false}
                        center={true}
                        children={<ErrorModal mensagemRetorno={this.state.mensagemRetorno} />}
                    />

                    <img src={Logo} className="logo" alt="Logo da iExpo" />
                    <p>Sistema de administradores</p>

                    <form className="login-form" onSubmit={this.efetuarLogin} method="POST">
                        <input type="email"
                            className="text-input efeito"
                            autoComplete="off"
                            onChange={this.atualizarInputs}
                            id="email"
                            name="email"
                            placeholder="Email"
                            maxLength={100}
                            required />

                        <span className="focus-border" />

                        <input type="password"
                            className="text-input efeito_2"
                            onChange={this.atualizarInputs}
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            minLength={6}
                            maxLength={60}
                            required />

                        <span className="focus-border_2" />
                        <input
                            type="submit"
                            className="submit"
                            value="Entrar" />
                    </form>
                </main>
            </div>
        )
    }
}

const override = css`
  display: block;
  background-color: #000000cc;
  position: absolute;
  width: 100%;
  height: 100%;
`;