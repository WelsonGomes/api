// Função para validar CPF
async function validarCPF(cpf: string): Promise<boolean> {
    let soma = 0;
    let resto;

    // Elimina CPFs inválidos conhecidos
    //if (/^(\d)\1+$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    console.log();
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    // Validação do segundo dígito verificador
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// Função para validar CNPJ
async function validarCNPJ(cnpj: string): Promise<boolean> {
    // Elimina CNPJs inválidos conhecidos
    //if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
}

async function getValidaCpfCnpj(cpfcnpj: string): Promise<boolean> {
    const valor = cpfcnpj.replace(/[^\d]+/g, '');
    if (valor.length == 14) {
        return await validarCNPJ(valor);
    } else if (valor.length == 11) {
        return await validarCPF(valor);
    }
    return false;
}

export { getValidaCpfCnpj };