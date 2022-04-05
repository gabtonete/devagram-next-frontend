import { useRouter } from 'next/router';
import Image from 'next/image';

import { useEffect, useState } from "react";

import CabecalhoComAcoes from "../cabecalhoComAcoes";

import Avatar from "../avatar";
import Botao from "../botao";

import UsuarioService from "../../services/UsuarioService";

import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import imgLogout from '../../public/imagens/logout.svg';

const usuarioService = new UsuarioService();

export default function CabecalhoPerfil ({
    estaNoPerfilPessoal = false,
    usuario
}) {
    const [estaSeguindoOUsuario, setEstaSeguindoOUsuario] = useState(false);
    const [seguidores, setSeguidores] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if(!usuario) {
            return;
        }

        setEstaSeguindoOUsuario(usuario.segueEsseUsuario);
        setSeguidores(usuario.seguidores);
    }, [usuario]);

    const obterTextoBotaoSeguir = () => {
        if (estaNoPerfilPessoal) {
            return 'Editar Perfil'
        }

        if (estaSeguindoOUsuario) {
            return 'Deixar de Seguir'
        };

        return 'Seguir';
    }

    const obterCorDoBotaoSeguir = () => {
        if (estaNoPerfilPessoal || estaSeguindoOUsuario) {
            return 'invertido'
        };

        return 'primaria';
    }

    const manipularCliqueBotaoSeguir = async () => {
        if(estaNoPerfilPessoal) {
            return router.push(`/perfil/editar`)
        }
        
        try {
            await usuarioService.alternarSeguir(usuario._id);
            setEstaSeguindoOUsuario(!estaSeguindoOUsuario); 
            setSeguidores(
                estaSeguindoOUsuario 
                    ? seguidores - 1
                    : seguidores + 1
                    
            )
        }catch (e) {
            console.log("Erro ao seguir/desseguir");
        }
    }

    const aoClicarSetaEsquerda = () => {
        router.push('/');
    }

    const logout = () => {
        usuarioService.logout();
        router.push('/');
    }

    const obterElementoDireita = () => {
        if (estaNoPerfilPessoal) {
            return (
                    <Image
                            src={imgLogout}
                            alt='icone logout'
                            onClick={logout}
                            width={25}
                            height={25}
                    />
            )
        }

        return null;
    }

    return (
        <div className="cabecalhoPerfil largura30pctDesktop">
            
            <CabecalhoComAcoes 
                iconeEsquerda={estaNoPerfilPessoal ? null : imgSetaEsquerda} 
                titulo={usuario?.nome} 
                aoClicarAcaoEsquerda={aoClicarSetaEsquerda} 
                elementoDireita={obterElementoDireita()}
            />

            <hr className="linhaDivisoria" />

            <div className="statusPerfil">
                <Avatar src={usuario?.avatar} />
            
                <div className="informacoesPerfil">
                    <div className="statusContainer">
                        <div className="status">
                            <strong>{usuario.publicacoes}</strong>
                            <span>Publicações</span>
                        </div>
                        <div className="status">
                            <strong>{seguidores}</strong>
                            <span>Seguidores</span>
                        </div>
                        <div className="status">
                            <strong>{usuario.seguindo}</strong>
                            <span>Seguindo</span>
                        </div>
                    </div>

                    <Botao
                        texto={obterTextoBotaoSeguir()}
                        cor={obterCorDoBotaoSeguir()}
                        manipularClique={manipularCliqueBotaoSeguir}
                    />
                </div>
            </div>
        </div>
    )
}