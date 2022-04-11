import HttpService from './HttpService';


export default class FeedService extends HttpService {
    async carregarPostagens(idUsuario) {
        let url = '/feed';
        if(idUsuario) {
            url = `/feed?id=${idUsuario}`
        }

        return this.get(url);
    }

    async adicionarComentario(idPostagem, comentario) {
        return this.put(`/comentario?id=${idPostagem}`, {comentario});
    }

    async alterarCurtida(idPostagem) {
        return this.put(`/like?id=${idPostagem}`);
    }

    async fazerPublicacao(dados) {
        return this.post(`/publicacao`, dados)
    }

    async carregarLista() {
        return this.get(`/listar`)
    }
}