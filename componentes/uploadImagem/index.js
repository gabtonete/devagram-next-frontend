import Image from "next/image";
import { useRef } from "react"
import { useEffect } from "react";
import foto from '../../public/imagens/curtido.svg';

export default function UploadImagem(
    {
        className = '',
        setImagem,
        imagemPreview,
        imagemPreviewClassName,
        aoSetarAReferencia,
        usuarioLogado
    }) {

    const referenciaInput = useRef(null);

    useEffect(() => {
        if (!aoSetarAReferencia) {
            return;
        }

        aoSetarAReferencia(referenciaInput?.current);
    }, [referenciaInput?.current, setImagem]);

   

    const abrirSeletorArquivo = () => {
        referenciaInput?.current.click();
    }

    const aoAlterarImagem = () => {
        if (!referenciaInput?.current?.files?.length) {
            return;
        }

        const arquivo = referenciaInput?.current?.files[0];
        obterUrlDaImagemEAtualizarEstado(arquivo);
    }

    const obterUrlDaImagemEAtualizarEstado = (arquivo) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(arquivo);
        fileReader.onloadend = () => {
            setImagem({
                preview: fileReader.result,
                arquivo
            })
        }
    }

    const aoSoltarImagem = (e) => {
        e.preventDefault();
        if(e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const arquivo = e.dataTransfer.files[0];
            obterUrlDaImagemEAtualizarEstado(arquivo);
        }
    }

    return (
        <div className={`upload-imagem-container ${className}`} 
            onClick={abrirSeletorArquivo} 
            onDragOver={e => e.preventDefault()}
            onDrop={e => aoSoltarImagem(e)}
        >
            
            {imagemPreview !== ''
            ?   (
                    <div className="imagem-preview-container">
                        <img 
                            src={imagemPreview}
                            alt='imagem preview'
                            className={imagemPreviewClassName}
                        />
                    </div>
                )
            : null
            }
            <input
                type="file"
                className="oculto"
                accept="image/*"
                ref={referenciaInput}
                onChange={aoAlterarImagem}
            />
        </div>
    );
}