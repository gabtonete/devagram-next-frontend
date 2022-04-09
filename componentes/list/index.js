import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import FeedService from "../../services/FeedService";
import Avatar from "../avatar";

const feedService = new FeedService();

export default function List() {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const router = useRouter();

    useEffect(async () => {
        const { data } = await feedService.carregarLista();
        console.log(data)
        const usuarioFormatado = data.map(usuario => ({
            id: usuario._id,
            nome: usuario.nome,
            avatar: usuario.avatar
        }))

        setListaUsuarios(usuarioFormatado)
    }, [router.pathname])

    const redirecionarPerfil = (user) => {
        router.push(`/perfil/${user.id}`)
    }

    return (
        <div>
            <p className="tituloLista">Descubra quem seguir!</p>
            <div className="usuarioLista">
            {
                listaUsuarios && listaUsuarios.map(user => (
                        <div className="usuarioUnico" onClick={() => redirecionarPerfil(user)} key={user.id}>
                            <Avatar src={user.avatar} />
                        </div>
                ))
            }
            </div>
        </div>
    )
}