import Image from 'next/image';
import logoHorizontal from '../../public/imagens/logoHorizontal.svg';
import lupa from '../../public/imagens/lupa.svg'
import Navbar from './Navbar';
import ResultadoPesquisa from './ResultadoPesquisa';
import { useState } from 'react';


export default function Header() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState('');

    const aoPesquisar = (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);
        
        if(termoPesquisado.length < 3) {
            return;
        }
        setResultadoPesquisa([
            {
            avatar: '',
            nome: 'Usuário de teste',
            email: 'mockado1@mockado.com',
            _id: '123456'
            },
            {
            avatar: '',
            nome: 'mockado2_',
                email: 'mockado2@mockado2.com',
                _id: '3433434'
            },
            {
                avatar: '',
                nome: 'mockado3_',
                email: 'mockado3@mockado3.com',
                _id: '123123'
            },
        ])
    }

    const aoClicarResultadoPesquisa = (id) => {
        console.log('aoClicarResultadoPesquisa', id)

    }

    return (
        <header className="cabecalhoPrincipal">
            <div className="conteudoCabecalhoPrincipal">
                <div className="logoCabecalhoPrincipal">
                    <Image 
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