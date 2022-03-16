import Image from 'next/image';
import logoHorizontal from '../../public/imagens/logoHorizontal.svg';
import lupa from '../../public/imagens/lupa.svg'
import Navbar from './Navbar';
export default function Header() {
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
                    value={''}
                    onChange={() => console.log('pesquisando')}
                />
            </div>

            <Navbar className="desktop"/>
        </header>
    );
}