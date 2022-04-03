import Image from 'next/image';
import logoHorizontal from '../../public/imagens/logoHorizontal.svg';
import lupa from '../../public/imagens/lupa.svg'
import Navbar from './Navbar';
import ResultadoPesquisa from './ResultadoPesquisa';
import { useState } from 'react';
import UsuarioService from '../../services/UsuarioService';
import { useRouter } from 'next/router';

const usuarioService = new UsuarioService();

export default function Header() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState('');
    const router = useRouter();

    let cabecalhoClassName = '';
    if(window && window.location.pathname !== '/') {
        cabecalhoClassName = 'desktop'
    }
    
    const aoPesquisar = async (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);
        
        if(e.target.value.length < 3 || termoPesquisado.length == '') {
            return;
        }
        
        try {     
            const { data } = await usuarioService.pesquisar(termoPesquisado);
            setResultadoPesquisa(data);

        }catch (error){
            console.log("Erro ao pesquisar usuário: ", error?.response?.data?.erro);
        }
    }

    const aoClicarResultadoPesquisa = (id) => {
        setTermoPesquisado('');
        setResultadoPesquisa([]);
        router.push(`/perfil/${id}`);
    }

    const redirecionarParaHome = () => {
        router.push('/');
    }

    return (
        <header className={`cabecalhoPrincipal ${cabecalhoClassName}`}>
            <div className="conteudoCabecalhoPrincipal">
                <div className="logoCabecalhoPrincipal">
                    <Image 
                        onClick={() => redirecionarParaHome()}
                        src={logoHorizontal}
                        alt="logo horizontal"
                        layout='fill'
                    />
                </div>
                <div className="barraPesquisa">
                    <div className="containerImagemLupa">
                        <Image 
                            src={lupa}
                            alt="icone lupa"
                            layout='fill'
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Pesquisar"
                        value={termoPesquisado}
                        onChange={(e) => aoPesquisar(e)}
                    />
                </div>
                <Navbar className="desktop"/>
            </div>
            {resultadoPesquisa.length > 0 && 
            (
                <div className="resultadoPesquisaContainer">
                    {
                        resultadoPesquisa.map(r => (
                        <ResultadoPesquisa 
                            avatar={r.avatar}
                            nome={r.nome}
                            email={r.email}
                            key={r._id}
                            id={r._id}
                            aoClicar={aoClicarResultadoPesquisa}
                        />))
                    }
                </div>
            )
            }
        </header>
    );
}