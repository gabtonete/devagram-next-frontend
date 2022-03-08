import Image from "next/image";
import { useRef } from "react"
import { useEffect } from "react";

export const UploadImagem = (props) => {

    const { 
        className= '',
        setImagem,
        imagemPreview,
        imagemPreviewClassName,
        aoSetarAReferencia
    } = props

    const referenciaInput = useRef(null);

    useEffect(() => {
        if(!aoSetarAReferencia) {
            return;
        }

        aoSetarAReferencia(referenciaInput?.current);
    }, [referenciaInput?.current]);

    const abrirSeletorArquivo = () => {
        referenciaInput?.current.click();
    }

    const aoAlterarImagem = () => {
        if(!referenciaInput?.current?.files?.length) {
            return;
        }

        const arquivo = referenciaInput?.current?.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(arquivo);
        fileReader.onloadend = () => {
            setImagem({
                preview: fileReader.result,
                arquivo
            })
        }
    }

    return (
        <div className={`upload-imagem-container ${className}`}>
            {imagemPreview && (
                <div className="imagem-preview-container">
                    <Image
                        src={imagemPreview}
                        width={150}
                        height={150}
                        alt='Imagem preview'
                        className={imagemPreviewClassName}
                    />
                </div>
            )}
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