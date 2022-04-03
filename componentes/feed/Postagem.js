import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Avatar from "../avatar";

import imgCurtir from '../../public/imagens/curtir.svg';
import imgCurtido from '../../public/imagens/curtido.svg';

import imgComentarioCinza from '../../public/imagens/comentarioCinza.svg';
import imgComentarioAtivo from '../../public/imagens/comentarioAtivo.svg';

import { FazerComentario } from "./FazerComentario";
import FeedService from "../../services/FeedService";

const tamanhoLimiteDescricao = 90;
const feedService = new FeedService();

export default function Postagem ({
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado,
    id,
    curtidas
}) {
    const [curtidasPostagem, setCurtidasPostagem] = useState(curtidas);
    const [comentariosPostagem, setComentariosPostagem] = useState(comentarios);
    const [deveExibirSecaoParaComentar, setDeveExibirSecaoParaComentar] = useState(false);
    const [tamanhoAtualDaDescricao, setTamanhoAtualDaDescricao] = useState(tamanhoLimiteDescricao);

    const obterDescricao = () => {
        let mensagem = descricao.substring(0, tamanhoAtualDaDescricao);

        if(descricaoMaiorQueLimite()) {
            mensagem += '...';
        }

        return mensagem;
    }

    const descricaoMaiorQueLimite = () => {
        return descricao.length > tamanhoAtualDaDescricao;
    }

    const exibirDescricaoCompleta = () => {
        setTamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER);
    }

    const obterImagemComentario = () => {
        if(deveExibirSecaoParaComentar) {
            return imgComentarioAtivo
        } else if (deveExibirSecaoParaComentar === false) {
            return imgComentarioCinza
        }
    }

    const comentar = async (comentario) => {
        try {
            await feedService.adicionarComentario(id, comentario);
            setDeveExibirSecaoParaComentar(false);
            setComentariosPostagem([
                ...comentariosPostagem,
                {
                    nome: usuarioLogado.nome,
                    mensagem: comentario
                }
            ])
        } catch (e) {
            console.log("Erro ao fazer comentário: " + e?.response?.data?.erro);
            return false;
        }
    }

    const usuarioLogadoCurtiuPostagem = () => {
        return curtidasPostagem.includes(usuarioLogado.id);
    }

    const alterarCurtida = async () => {
        try {
            await feedService.alterarCurtida(id);
            const estaCurtido = usuarioLogadoCurtiuPostagem();

            if(estaCurtido) {
                setCurtidasPostagem(
                    curtidasPostagem.filter(idUsuarioQueCurtiu => idUsuarioQueCurtiu !== usuarioLogado.id)
                    );
            } else {
                setCurtidasPostagem([
                    ...curtidasPostagem,
                    usuarioLogado.id
                ]);
            }
                
        } catch (e) {
            console.log("Não foi possível curtir." + e?.response?.data?.erro)
        }
    }

    const obterImagemCurtida = () => {
        return usuarioLogadoCurtiuPostagem() ? imgCurtido : imgCurtir        
    }

    return (
        <div className="postagem">
            <Link href={`/perfil/${usuario.id}`}>
                <section className="cabecalhoPostagem">
                    <Avatar src={usuario.avatar} />
                    <strong>{usuario.nome}</strong>
                </section>
            </Link>
 
            <div className="fotoDaPostagem">
                <img src={fotoDoPost} alt='Foto da postagem'/>
            </div>

            <div className="rodapeDaPostagem">
                <div className="acoesDoRodapeDaPostagem">
                    <Image
                        src={obterImagemCurtida()}
                        alt="Icone curtr"
                        width={20}
                        height={20}
                        onClick={alterarCurtida}
                    />

                    <Image
                        src={obterImagemComentario()}
                        alt="Icone comentar"
                        width={20}
                        height={20}
                        onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
                    />

                    <span className="quantidadeDeCurtidas">
                        Curtido por <strong>{curtidasPostagem.length} pessoas</strong>
                    </span>
                </div>
                <div className="descricaoDaPostagem">
                    <strong className="nomeDoUsuario">{usuario.nome}</strong>
                    <p className="descricao">
                        {obterDescricao()}
                        {descricaoMaiorQueLimite() && (
                            <span className="exibirDescricaoCompleta" onClick={exibirDescricaoCompleta}>mais</span>
                        )}
                    </p>
                </div> 

                <div className="comentariosDaPublicacao">
                    {comentariosPostagem.map((comentario, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeDoUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>
            </div>

            {deveExibirSecaoParaComentar && 
                <FazerComentario comentar={comentar} usuarioLogado={usuarioLogado}/>
            }
        </div>
    )
}