import HttpService from './HttpService';


export default class UsuarioService extends HttpService {
    async login(credentials) {
        const { data } = await this.post('/login', credentials);

        localStorage.setItem("nome", data.nome);
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);

        if (data.avatar) {
            localStorage.setItem("avatar", data.avatar);
        }
    }

    async cadastro(dados) {
        return await this.post('/cadastro', dados)
    }
}