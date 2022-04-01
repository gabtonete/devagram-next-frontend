import { useState, useEffect } from "react"
import Postagem from "./Postagem";

export default function Feed ({ usuarioLogado }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);
    
    useEffect(() => {
        setListaDePostagens([
            {
                id: 1,
                usuario: { 
                    id: '1',
                    nome: 'Douglas',
                    avatar: null
                },
                fotoDoPost: 'https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?w=360',
                descricao: 'MinhaMinha foto muito legal descricao teste teste descricao bla bla bla bla bla bla bla bla blaMinha foto muito legal descricao teste teste descricao bla bla bla bla bla bla bla bla bla foto muito legal descricao teste teste descricao bla bla bla bla bla bla bla bla bla ',
                curtidas: [],
                comentarios: [
                    {
                        nome: 'Alguem',
                        mensagem: 'muito legal'
                    },
                    {
                        nome: 'Alguem',
                        mensagem: 'muito legal'
                    },
                    {
                        nome: 'Alguem',
                        mensagem: 'muito legal'
                    }
                ]
            },
            {
                id: 1,
                usuario: { 
                    id: '1',
                    nome: 'Douglas',
                    avatar: null
                },
                fotoDoPost: 'https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?w=360',
                descricao: 'Minha foto muito legal descricao teste teste descricao bla bla bla bla bla bla bla bla bla Minha foto muito legal descricao teste teste descricao bla bla bla bla bla bla bla bla bla',
                curtidas: [],
                comentarios: [
                    {
                        nome: 'Alguem',
                        mensagem: 'muito legal'
                    },
                    {
                        nome: 'Alguem',
                        mensagem: 'muito legal'
                    },
                    {
                        nome: 'Alguem',
                        mensagem: 'muito legal'
                    }
                ]
            },
            {
                id: 1,
                usuario: { 
                    id: '1',
                    nome: 'Douglas',
                    avatar: null
                },
                fotoDoPost: 'https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?w=360',
                descricao: 'Minha foto muito legal descricao teste teste descricao bla bla bla bla bla bla bla bla bla Minha foto muito legal descricao teste teste descricao bla bla bla bla bla bla bla bla bla',
                curtidas: [],
                comentarios: [
                    {
                        nome: 'Alguem',
                        mensagem: 'muito legal'
                    },
                    {
                        nome: 'Alguem',
                        mensagem: 'muito legal'
                    },
                    {
                        nome: 'Alguem',
                        mensagem: 'muito legal'
                    }
                ]
            }
        ])
        console.log(listaDePostagens)
    }, [usuarioLogado]);

    if (!listaDePostagens.length) {
        return null;
    }

    return (
        <div className="feedContainer largura30pctDesktop">
            {listaDePostagens.map(dadosPostagem => 
                <Postagem 
                    key={dadosPostagem.id} 
                    {...dadosPostagem} 
                    usuarioLogado={usuarioLogado}
                    />
            )}
        </div>
    )
}