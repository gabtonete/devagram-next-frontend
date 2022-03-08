export const Botao = (props) => {

    const {
        type = "button",
        texto,
        cor = 'primaria',
        desabilitado = false,
        manipularClique
    } = props;

    return (
        <button 
            type={type}
            className={`btn ${cor}`}
            disabled={desabilitado}
            onClick={manipularClique}
        >
            {texto}
        </button>
    )
}