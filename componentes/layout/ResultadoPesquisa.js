import Avatar from '../avatar';

export default function ResultadoPesquisa({ nome, avatar, email, aoClicar, id }) {
    return (
        <div className="resultadoPesquisa" onClick={() => { aoClicar(id) }}>
            <Avatar 
                src={avatar}
            />
            <div className="informacoesUsuario">
                <strong>{nome}</strong>
                <span>{email}</span>
            </div>
        </div>
    )
}