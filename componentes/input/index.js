import Image from 'next/image';


export default function Input ({
    image,
    type,
    placeholder,
    value,
    validationMessage = "",
    changeValue,
    showValidationMessage = false
}) {

    return (
        <div className="container-input">
            <div className="public-input">  
                <Image 
                    src={image}
                    alt="image input"
                    className="public-input-icon"
                    width={20}
                    height={20}
                />

                <input 
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={changeValue}
                />
                
            </div>    
                {showValidationMessage &&   
                <p className="validation-message">{validationMessage}</p>}
        </div>
    )
}