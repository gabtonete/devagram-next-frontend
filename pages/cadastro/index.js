import React, { useState } from 'react';

import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';

import Input from "../../componentes/input";
import Botao from '../../componentes/botao';
import UploadImage from '../../componentes/uploadImagem';

import usuarioAtivo from '../../public/imagens/usuarioAtivo.svg';
import envelope from '../../public/imagens/envelope.svg';
import chave from '../../public/imagens/chave.svg';
import logo from '../../public/imagens/logo.svg';
import avatar from '../../public/imagens/avatar.svg';

import UsuarioService from '../../services/UsuarioService';

import { validarNome, validarEmail, validarSenha, validarConfirmacaoSenha } from '../../utils/validadores';

const usuarioService = new UsuarioService();


export default function Cadastro() {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [truePassword, setTruePassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const turnOnButtonSign = () => {
        return (
            validarEmail(email)
            && validarSenha(password)
            && validarNome(name)
            && validarConfirmacaoSenha(password, truePassword)
        )
    }

    const submitForm = async (e) => {
        e.preventDefault();

        if (!turnOnButtonSign()) {
            return;
        }

        setIsLoading(true);

        try {
            const payload = new FormData();
            payload.append("nome", name);
            payload.append("email", email);
            payload.append("senha", password);

            if (image?.arquivo) {
                payload.append("file", image.arquivo)
            }
            
            const result = await usuarioService.cadastro(payload);
            console.log(result)
            await usuarioService.login({
                login: email,
                senha: password
            })

            router.push('/');
        } catch (error) {
            console.log('falhou ao cadastrar', error)
        }

        setIsLoading(false);
    }

    return (
        <section className={`signup-page public-page`}>
            <div className="logo-container desktop">
                <Image
                    src={logo}
                    alt="logotipo"
                    className="logo"
                    width={300}
                    height={300}
                />
            </div>
            <div className="public-page-content">
                <form onSubmit={submitForm}>
                    <UploadImage
                        imagemPreviewClassName="avatar avatar-preview"
                        setImagem={setImage}
                        imagemPreview={image?.preview || avatar.src}
                    />
                    <Input
                        type="text"
                        image={usuarioAtivo}
                        value={name}
                        placeholder="Nome Completo"
                        changeValue={e => setName(e.target.value)}
                        validationMessage="O nome precisa de pelo menos 2 caractéres"
                        showValidationMessage={name && !validarNome(name)}
                    />
                    <Input
                        type="email"
                        image={envelope}
                        value={email}
                        placeholder="E-mail"
                        changeValue={e => setEmail(e.target.value)}
                        validationMessage="O email é inválido"
                        showValidationMessage={email && !validarEmail(email)}
                    />
                    <Input
                        type="password"
                        image={chave}
                        value={password}
                        placeholder="Senha"
                        changeValue={e => setPassword(e.target.value)}
                        validationMessage="A senha precisa de pelo menos 4 caractéres"
                        showValidationMessage={password && !validarSenha(password)}
                    />
                    <Input
                        type="password"
                        image={chave}
                        placeholder="Confirmação de senha"
                        value={truePassword}
                        changeValue={e => setTruePassword(e.target.value)}
                        validationMessage="As senhas precisam ser iguais"
                        showValidationMessage={password && truePassword && !validarConfirmacaoSenha(password, truePassword)}
                    />
                    <Botao
                        type="submit"
                        texto={isLoading? "... Carregando" : 'Cadastro'}
                        desabilitado={!turnOnButtonSign() || isLoading}
                    />
                </form>
                <div className="public-page-footer">
                    <p>Já possui uma conta?</p>
                    <Link href="/">
                        Faça seu login agora!
                    </Link>
                </div>
            </div>
        </section>
    )
}