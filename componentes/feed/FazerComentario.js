import { useState } from "react";
import Avatar from "../avatar";

export function FazerComentario ({usuarioLogado, comentar}) {
    const [linhas, setLinhas] = useState(1);
    const [comentario, setComentario] = useState('');

    const aoDigitarComentario = (e) => {
        const valorInput = e.target.value;
        setComentario(valorInput);
        setLinhas(valorInput.length > 0 ? 2 : 1);
    }

    const aoPressionarTecla = (e) => {
        if(e.key === 'Enter') {
            manipularComentario();
        }
    }

    const manipularComentario =  () => {
        if(comentario.trim().length === 0 || !comentar) {
            return;
        }

        comentar(comentario);
    }

    return (
        <div className="containerFazerComentario">
            <Avatar src={usuarioLogado.avatar}/>
            <textarea 
                autoFocus={true}
                onChange={aoDigitarComentario} 
                rows={linhas} 
                placeholder="Adicione um comentário..."
                value={comentario}
                onKeyDown={aoPressionarTecla}>
            </textarea>

            <button type="button" className="btnPublicacao desktop" onClick={manipularComentario}>
                Publicar
            </button>
        </div>
    )
}