import { useEffect, useState } from 'react';
import Feed from '../../../componentes/feed';
import { useRouter } from 'next/router';
import comAutorizacao from '../../../hoc/comAutorizacao';
import CabecalhoPerfil from '../../../componentes/cabecalhoPerfil';
import UsuarioService from '../../../services/UsuarioService';


const usuarioService = new UsuarioService();

function Perfil({usuarioLogado}) {
    const [usuario, setUsuario] = useState({ });

    const router = useRouter();

    const obterPerfil = async (idUsuario) => {
        try {
            const { data } = await usuarioService.obterPerfil(idUsuario);
            return data;
        } catch (e) {
            console.log("Não foi possível obter perfil")
        }
    }
    
    useEffect(async () => {
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
            />

            <Feed usuarioLogado={usuarioLogado} usuarioPerfil={usuario._id}
            />
        </div>
    );
}

export default comAutorizacao(Perfil);