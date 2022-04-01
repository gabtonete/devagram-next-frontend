import HttpService from './HttpService';


export default class UsuarioService extends HttpService {
    async login(credentials) {
        const { data } = await this.post('/login', credentials);

        localStorage.setItem("nome", data.nome);
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);

        const usuario = await this.get('/usuario');
        localStorage.setItem("id", usuario.data._id);

        if (usuario.data.avatar) {
            localStorage.setItem("avatar", data.avatar);
        }
    }

    async cadastro(dados) {
        return await this.post('/cadastro', dados)
    }

    estaAutenticado() {
        return localStorage.getItem('token') !== null
    }

    async pesquisar(termoDaPesquisa) {
        return await this.get('/pesquisa?filtro=' + termoDaPesquisa);
    }

    obterInformacoesDoUsuarioLogado() {
        return {
            id: localStorage.getItem('id'),
            nome: localStorage.getItem('nome'),
            email: localStorage.getItem('email'),
            avatar: localStorage.getItem('avatar')
        }
    }
}