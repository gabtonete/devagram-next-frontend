import comAutorizacao from '../../hoc/comAutorizacao';
import CabecalhoComAcoes from '../../componentes/cabecalhoComAcoes';
import UploadImagem from '../../componentes/uploadImagem';
import { useRouter } from 'next/router';
import { useState } from 'react';
import imgAvatarPadrao from '../../public/imagens/avatar.svg'
import Image from 'next/image';
import imgLimpar from '../../public/imagens/limpar.svg'
import { useEffect } from 'react';
import UsuarioService from '../../services/UsuarioService';
import { validarNome } from '../../utils/validadores';

const usuarioService = new UsuarioService();

function EditarPerfil ({ usuarioLogado }) {
    const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));
    const [inputAvatar, setInputAvatar] = useState(null);
    const [nome, setNome] = useState('');
    const router = useRouter()
    
    const aoClicarElementoEsquerda = () => {
        router.push('/perfil/eu');
    }

    const abrirSeletorDeArquivos = () => {
        inputAvatar?.click();
    }

    useEffect(() => {
        if(!usuarioLogado) {
            return;
        }
        setNome(usuarioLogado.nome);
        setAvatar({ preview : usuarioLogado.avatar })
    }, [])

    const atualizarPerfil = async () => {
        try {
            if (!validarNome(nome)) {
                return console.log("Nome inválido")
            }

            const corpoRequisicao = new FormData();
            corpoRequisicao.append('nome', nome);
            
            if(avatar.arquivo) {
                corpoRequisicao.append('file', avatar.arquivo)
            }

            await usuarioService.atualizarPerfil(corpoRequisicao);
            localStorage.setItem('nome', nome)
            
            if(avatar.arquivo) {
                localStorage.setItem('avatar', avatar.preview);
            }
            
            router.push('/perfil/eu')
        } catch (e) {
            console.log("erro ao editar perfil: ", e?.response?.data?.erro)
        }
    }

    return (
        <div className="paginaEditarPerfil largura30pctDesktop">
            <div className="conteudoPaginaEditarPerfil">
                <CabecalhoComAcoes 
                    aoClicarAcaoEsquerda={() => aoClicarElementoEsquerda()}
                    titulo={'Editar Perfil'}
                    textoEsquerda={'Cancelar'}
                    elementoDireita={'Concluir'}
                    aoClicarElementoDireita={atualizarPerfil}
                />
                <hr className="linhaDivisoria" />

                <div className="edicaoAvatar">
                    <UploadImagem 
                        setImagem={setAvatar}
                        imagemPreviewClassName='avatar'
                        imagemPreview={avatar?.preview || imgAvatarPadrao.src}
                        aoSetarAReferencia={setInputAvatar}
                        usuarioLogado={usuarioLogado.avatar}
                    />

                    <span onClick={abrirSeletorDeArquivos}>Alterar foto do perfil</span>
                </div>

                <hr className="linhaDivisoria" />

                <div className="edicaoNome">
                    <label>Nome</label>
                    <input 
                        type="text"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />

                    <Image 
                        src={imgLimpar}
                        alt="ícone limpar"
                        width={16}
                        height={16}
                        onClick={() => setNome('')}
                    />
                </div>
                <hr className="linhaDivisoria" />
            </div>
        </div>
    )
}

export default comAutorizacao(EditarPerfil); 