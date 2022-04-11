import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Feed from '../../componentes/feed';
import comAutorizacao from '../../hoc/comAutorizacao';
import CabecalhoPerfil from '../../componentes/cabecalhoPerfil';
import UsuarioService from '../../services/UsuarioService';


const usuarioService = new UsuarioService();

function Perfil({ usuarioLogado }) {
    const [usuario, setUsuario] = useState({});

    const router = useRouter();

    const obterPerfil = async (idUsuario) => {
        try {
            let whoIs;
            if (estaNoPerfilPessoal()) {
                whoIs = usuarioLogado.id
            } else {
                whoIs = idUsuario
            }

            const { data } = await usuarioService.obterPerfil(whoIs)
            return data;
        } catch (e) {
            console.log("Não foi possível obter perfil")
        }
    }

    const estaNoPerfilPessoal = () => {
        if (router.query.id === 'eu' || router.query.id === usuarioLogado.id) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(async () => {
        setUsuario({})

        if (!router.query.id) {
            return;
        }

        const dadosPerfil = await obterPerfil(router.query.id);
        setUsuario(dadosPerfil);
    }, [router.query.id]);

    return (
        <div className='paginaPerfil'>
            <CabecalhoPerfil
                usuarioLogado={usuarioLogado}
                usuario={usuario}
                estaNoPerfilPessoal={estaNoPerfilPessoal()}
            />

            <Feed
                usuarioLogado={usuarioLogado}
                usuarioPerfil={usuario}
            />
        </div>
    );
}

export default comAutorizacao(Perfil);