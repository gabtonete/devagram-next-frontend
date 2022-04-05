import CabecalhoComAcoes from "../cabecalhoComAcoes";
import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import imgLogout from '../../public/imagens/logout.svg';
import Avatar from "../avatar";
import Botao from "../botao";
import { useEffect, useState } from "react";
import UsuarioService from "../../services/UsuarioService";
import { useRouter } from 'next/router';

const usuarioService = new UsuarioService();

export default function CabecalhoPerfil ({
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
        if (estaSeguindoOUsuario) {
            return 'Deixar de Seguir'
        };

        return 'Seguir';
    }

    const obterCorDoBotaoSeguir = () => {
        if (estaSeguindoOUsuario) {
            return 'invertido'
        };

        return 'primaria';
    }

    const manipularCliqueBotaoSeguir = async () => {
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



    return (
        <div className="cabecalhoPerfil largura30pctDesktop">
            <CabecalhoComAcoes iconeEsquerda={imgSetaEsquerda} titulo={usuario.nome} aoClicarAcaoEsquerda={console.log('b')}/>

            <hr className="bordaCabecalhoPerfil" />

            <div className="statusPerfil">
                <Avatar src={usuario.avatar} />
            
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