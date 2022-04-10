import { useRouter } from "next/router";
import { useState, useEffect } from "react"
import FeedService from "../../services/FeedService";
import Postagem from "./Postagem";

const feedService = new FeedService();

export default  function Feed ({ usuarioLogado, usuarioPerfil }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);
    const router = useRouter();

    useEffect(async () => {
        setListaDePostagens([]);

        console.log('usuarioPerfil?.id: ', usuarioPerfil?._id)
        const { data } = await feedService.carregarPostagens(usuarioPerfil?._id);
        console.log('postagens carregadas: ', data)

        if(usuarioPerfil?._id !== undefined) {
            data.map(postagem => {
                if(postagem.idUsuario !== usuarioPerfil._id){
                    data.splice(postagem)
                }
            })
        }

        console.log(data)

        const postagensFormatadas = await data.map(postagem => ({
            id: postagem._id,
            usuario: {
                id: postagem?.idUsuario,
                nome: postagem?.usuario?.nome || usuarioPerfil?.nome,
                avatar: postagem?.usuario?.avatar || usuarioPerfil?.avatar
            },
            fotoDoPost: postagem.foto,
            descricao: postagem.descricao,
            curtidas: postagem.likes,
            comentarios: postagem.comentarios.map(c => ({
                nome: c.nome,
                mensagem: c.comentario
            }))
        }))

        setListaDePostagens(postagensFormatadas);
        console.log('posts do feed: ', postagensFormatadas)
    },[usuarioPerfil, router.query.id]);

    if (!listaDePostagens.length) {
        return null;
    }

    return (
        <div className="feedContainer largura30pctDesktop">
            {listaDePostagens.map(dadosPostagem => (
                <Postagem 
                    key={dadosPostagem.id} {...dadosPostagem} 
                    usuarioLogado={usuarioLogado}
                    />
            ))}
        </div>
    )
}