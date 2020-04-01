import React from "react";
import Enzyme, {shallow, mount, render} from "enzyme";
import Login from "../pages/Login/Login";
import renderer from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe("Testa página de Login",() => {

    it("Compara componente ao snapshot",() => {
        const componente = renderer.create( <Login />).toJSON();
        expect(componente).toMatchSnapshot();
    });

    it("Testa estado inicial do componente",() => {
        const componente = mount( <Login />);
        expect(componente.state("carregando")).toEqual(false);
        expect(componente.state("erro")).toEqual(false);
        expect(componente.state("email")).toEqual("");
        expect(componente.state("senha")).toEqual("");
    });

    it("Testa mudança de estado dos inputs de email e senha",() =>{
        const componente = mount( <Login /> );
        
        // componente.find("#email").simulate("change",{
        //     target: {value : "email@email.com"}
        // });

        componente.find('input').at(0).simulate('change', { target: { name: 'email', value: "email@email.com" } });
        componente.find('input').at(1).simulate('change', { target: { name: 'senha', value: "12345678" } });

        expect(componente.state("email")).toEqual("email@email.com");
        expect(componente.state("senha")).toEqual("12345678");
    });

    it("Testa mudança de estado  para carregando ao clicar no submit",() =>{
        const componente = mount( <Login />);
        componente.setState({email : "email@email.com"});
        componente.setState({senha : "12345678"});

        componente.find("form").simulate("submit");

        expect(componente.state("carregando")).toEqual(true);
    })

})