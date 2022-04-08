import comAutorizacao from '../../hoc/comAutorizacao';
import CabecalhoComAcoes from '../../componentes/cabecalhoComAcoes';
import UploadImagem from '../../componentes/uploadImagem';
import { useState } from 'react';
import imgPublicacao from '../../public/imagens/publicacao.svg'
import Botao from '../../componentes/botao';
import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg'
import FeedService from '../../services/FeedService';
import { useRouter } from 'next/router';

const feedService = new FeedService();
const limiteDescricao = 255;

function Publicacao() {
    const router = useRouter();

    const [imagem, setImagem] = useState();
    const [inputImagem, setInputImagem] = useState();
    const [etapaAtual, setEtapaAtual] = useState(1);
    const [descricao, setDescricao] = useState('');

    const estaNaEtapaUm = () => etapaAtual === 1;

    const obterTextoEsquerda = () => {
        if(!imagem) {
            return ''
        }
        if (estaNaEtapaUm() && imagem) {
            return 'Cancelar';
        }
    }

    const obterTextoDireita = () => {
        if(!imagem) {
            return '';
        }

        if (estaNaEtapaUm() && imagem) {
            return 'Concluir';
        }

        return 'Compartilhar';
    }
    
    const aoClicarAcaoEsquerda = () => {
        if (estaNaEtapaUm()) {
            setImagem(null);
            return;
        }

        setEtapaAtual(1);
    }

    const aoClicarAcaoDireita = () => {
        if (estaNaEtapaUm()) {
            setEtapaAtual(2);
            return;
        }

        publicar();
    }

    const escreverDescricao = (e) => {
        if (e.length >= limiteDescricao) {
            return;
        }

        setDescricao(e);
    }

    const obterClassNameCabecalho = () => {
        if(estaNaEtapaUm()) {
            return 'primeiraEtapa'
        }

        return 'segundaEtapa'
    }

    const publicar = async () => {
        try{
            const payload = new FormData();
            payload.append('file', imagem.arquivo);
            payload.append('descricao', descricao);

            await feedService.fazerPublicacao(payload);
            router.push('/');
        } catch (e){
            console.log("Erro ao salvar publicacao: ", e);
        }
    }

    return (
        <div className="paginaPublicacao largura30pctDesktop">
            <CabecalhoComAcoes
                className={obterClassNameCabecalho()}
                iconeEsquerda={estaNaEtapaUm() ? null : imgSetaEsquerda} 
                textoEsquerda={obterTextoEsquerda()}
                elementoDireita={obterTextoDireita()}
                titulo={"Nova publicação"}
                aoClicarAcaoEsquerda={() => aoClicarAcaoEsquerda()}
                aoClicarElementoDireita={() => aoClicarAcaoDireita()}
            />

            <hr className="linhaDivisoria"></hr>

            <div className="conteudoPaginaPublicacao">
                {estaNaEtapaUm()
                ? (
                    <div className="primeiraEtapa">
                        <UploadImagem 
                            setImagem={setImagem}
                            aoSetarAReferencia={setInputImagem}
                            imagemPreviewClassName={!imagem ? 'previewImagemPublicacao' : 'previewImagemSelecionada'}
                            imagemPreview={ imagem?.preview || imgPublicacao.src }
                        />

                        <span className="desktop textoDragAndDrop">
                            Arraste sua foto aqui!
                        </span>

                        <Botao
                            texto="Selecionar uma imagem"
                            manipularClique={() => inputImagem?.click()}
                        />
                    </div>
                    )
                : (
                    <>
                        <div className="segundaEtapa">
                            <UploadImagem 
                                setImagem={setImagem}
                                imagemPreview={imagem?.preview}
                            />
                            <textarea
                                rows={3}
                                value={descricao}
                                placeholder="Escreva uma legenda"
                                onChange={e => escreverDescricao(e.target.value)}
                            >
                            </textarea>


                        </div>
                        <hr className="linhaDivisoria"></hr>
                    </>
                )
                }
            </div>
        </div>
    )
}

export default comAutorizacao(Publicacao);