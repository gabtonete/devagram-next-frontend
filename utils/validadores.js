const validarNome = (nome) => {
    return nome?.toString().length > 2;
}

const validarEmail = email => {
    const emailStr = email?.toString();

    return emailStr.length >= 5 && emailStr.includes('@') && emailStr.includes('.'); 
}

const validarSenha = senha => {
    return senha?.toString().length > 3;
}

const validarConfirmacaoSenha = (senha, confirmacao) => {
    return senha === confirmacao;
}

export { validarConfirmacaoSenha, validarNome, validarSenha, validarEmail };