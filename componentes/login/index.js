import React, { useState } from 'react';

import Image from 'next/image';
import Link from "next/link";

import Input from "../input";
import Botao from '../botao';

import envelope from '../../public/imagens/envelope.svg';
import chave from '../../public/imagens/chave.svg';
import logo from '../../public/imagens/logo.svg';

import UsuarioService from '../../services/UsuarioService';


import { validarEmail, validarSenha } from '../../utils/validadores'; 


const usuarioService = new UsuarioService()

export default function Login({ aposAutenticacao }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginFail, setLoginFail] = useState('');

    const turnOnButton = () => {
        return (
            validarEmail(email) 
            && validarSenha(password)
        )     
    }

    const submitForm = async (e) => {
        e.preventDefault();

        if(!turnOnButton){
            return;
        }

        setIsLoading(true);

        try {
            await usuarioService.login({
                login: email,
                senha: password
            })

            if(aposAutenticacao) {
                aposAutenticacao();
            }
        } catch (error) {
            console.log('falhou ao logar', error)
        }

        setIsLoading(false);
    }
    
    return (
        <section className={`signup-page public-page`}>
            <div className="logo-container">
                <Image
                    src={logo}
                    alt="logotipo"
                    layout="fill"
                />
            </div>
            <div className="public-page-content">
                <form onSubmit={submitForm}>
                    <Input
                        type="email"
                        image={envelope}
                        value={email}
                        placeholder="E-mail"
                        changeValue={e => setEmail(e.target.value)}
                        /*
                        validationMessage="O endereço informado é inválido!"
                        showValidationMessage={email && !validarEmail(email)}
                        */
                    />
                    <Input
                        type="password"
                        image={chave}
                        value={password}
                        placeholder="Senha"
                        changeValue={e => setPassword(e.target.value)}
                        /*
                        validationMessage="Usuário ou senha inválidos"
                        showValidationMessage={password && !validarSenha(password)}
                        */
                    />
                    <Botao
                        type="submit"
                        texto="Login"
                        desabilitado={!turnOnButton() || isLoading}
                    />
                </form>
                <div className="public-page-footer">
                    <p>Não possui uma conta?</p>
                    <Link href="/cadastro">
                        Faça seu cadastro agora!
                    </Link>
                </div>
            </div>
        </section>
    )
}