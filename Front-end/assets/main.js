const getPessoas = () => {
    let request = new XMLHttpRequest();
    request.open("GET","https://localhost:7260/GerenciarPessoas/ListarPessoas",false);
    request.send();
    return JSON.parse(request.responseText);
}

const postPessoas = async (pessoa) => {
    let request = new XMLHttpRequest();
    request.open("POST","https://localhost:7260/GerenciarPessoas/CadastrarPessoa",true);
    request.setRequestHeader("Content-type","application/json");

    await request.send(JSON.stringify(pessoa))
    
}

const criaLinhaPessoa = (pessoas) =>{

    const list = document.querySelector('.listaDePessoas');

    pessoas.forEach(element => {
        let linha = criaLinha(element);

        list.appendChild(linha);
    });
}

const main = () =>{

    pessoas = getPessoas();

    criaLinhaPessoa(pessoas);

    adcionarEventListener();
}

const criaLinha = (pessoa) =>{
    const linha = document.createElement('li');
    const PessoaNome = document.createElement("td");
    const PessoaIdade = document.createElement("td");
    const PessoaAltura = document.createElement("td");

    PessoaNome.innerHTML = pessoa.nome;
    PessoaIdade.innerHTML = pessoa.idade;
    PessoaAltura.innerHTML = pessoa.altura;

    linha.appendChild(PessoaNome);
    linha.appendChild(PessoaIdade);
    linha.appendChild(PessoaAltura);

    return linha;
};

const adcionarEventListener = () =>{

    const inputNome   = document.querySelector('.inputNome');
    const inputIdade  = document.querySelector('.inputIdade');
    const inputAltura = document.querySelector('.inputAltura');

    document.addEventListener('click', (e) =>{
        el = e.target

        if(el.classList.contains('add')){

            pessoa = {
                "nome" : inputNome.value,
                "idade" : inputIdade.value,
                "altura" : inputAltura.value
            }

            console.log(pessoa);

            postPessoas(pessoa);
            
        }
    })
}