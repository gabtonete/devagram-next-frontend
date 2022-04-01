import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Avatar from "../avatar";

import imgCurtir from '../../public/imagens/curtir.svg';
import imgCurtido from '../../public/imagens/curtido.svg';

import imgComentarioCinza from '../../public/imagens/comentarioCinza.svg';
import imgComentarioAtivo from '../../public/imagens/comentarioAtivo.svg';
import { FazerComentario } from "./FazerComentario";

const tamanhoLimiteDescricao = 90;

export default function Postagem ({
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado
}) {
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
                        src={imgCurtir}
                        alt="Icone curtr"
                        width={20}
                        height={20}
                        onClick={() => console.log("Curtido!")}
                    />

                    <Image
                        src={imgComentarioCinza}
                        alt="Icone comentar"
                        width={20}
                        height={20}
                        onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
                    />

                    <span className="quantidadeDeCurtidas">
                        Curtido por <strong>32 pessoas</strong>
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
                    {comentarios.map((comentario, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeDoUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>
            </div>

            {deveExibirSecaoParaComentar && 
                <FazerComentario usuarioLogado={usuarioLogado}/>
            }
        </div>
    )
}