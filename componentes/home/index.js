import comAutorizacao from "../../hoc/comAutorizacao"
import Feed from "../feed";
import List from "../list";

function Home({ usuarioLogado }) {
    return (
        <div className="homeContainer">
            <List />
            <Feed usuarioLogado={usuarioLogado} />
        </div>
    )
}

export default comAutorizacao(Home);