import { useEffect, useState } from 'react';
import Feed from '../../../componentes/feed';
import { useRouter } from 'next/router';
import comAutorizacao from '../../../hoc/comAutorizacao';
import CabecalhoPerfil from '../../../componentes/cabecalhoPerfil';
import UsuarioService from '../../../services/UsuarioService';


function Perfil({usuarioLogado}) {
    const [usuario, setUsuario] = useState({ nome: 'Usuário de teste'});
    const router = useRouter();

    return (
        <div className='paginaPerfil'>
            <CabecalhoPerfil
                usuarioLogado={usuarioLogado}
                usuario={usuario}
            />

            <Feed usuarioLogado={usuarioLogado}
            />
        </div>
    );
}

export default comAutorizacao(Perfil);