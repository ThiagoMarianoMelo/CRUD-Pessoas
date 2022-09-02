const getPessoas =  ()  => {
    let request = new XMLHttpRequest();
    request.open("GET","https://localhost:7260/GerenciarPessoas/ListarPessoas",false);
    request.send();
    return JSON.parse(request.responseText);
}

const postPessoas = async (pessoa) => {
    let request = new XMLHttpRequest();
    request.open("POST","https://localhost:7260/GerenciarPessoas/CadastrarPessoa",true);
    request.setRequestHeader("Content-type","application/json");

    request.send(JSON.stringify(pessoa));
    
}

const deletPessoa = (pessoa)  =>{
    let request = new XMLHttpRequest();
    request.open("DELETE","https://localhost:7260/GerenciarPessoas/ExcluirPessoa",true);
    request.setRequestHeader("Content-type","application/json");

    request.send(JSON.stringify(pessoa));

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

    const DeleteButton  = document.createElement("button");

    PessoaNome.innerHTML = pessoa.nome;
    PessoaIdade.innerHTML = pessoa.idade;
    PessoaAltura.innerHTML = pessoa.altura;
    DeleteButton.innerHTML = "Deletar";

    PessoaNome.setAttribute('class', 'Nome');
    PessoaIdade.setAttribute('class', 'Idade');
    PessoaAltura.setAttribute('class', 'Altura');
    DeleteButton.setAttribute('class', 'Delete');

    linha.appendChild(PessoaNome);
    linha.appendChild(PessoaIdade);
    linha.appendChild(PessoaAltura);
    linha.appendChild(DeleteButton);

    return linha;
};

const adcionarEventListener =  () =>{

    const inputNome   = document.querySelector('.inputNome');
    const inputIdade  = document.querySelector('.inputIdade');
    const inputAltura = document.querySelector('.inputAltura');

    document.addEventListener('click',  (e) =>{
        el = e.target

        if(el.classList.contains('Add')){

            pessoa = {
                "nome" : inputNome.value,
                "idade" : inputIdade.value,
                "altura" : inputAltura.value
            }

            console.log(pessoa);

            postPessoas(pessoa);

            window.location.reload()
            
        }

        if(el.classList.contains('Delete')){


            let pai = el.parentElement

            let nome = pai.querySelector('.Nome');
            let idade = pai.querySelector('.Idade');
            let altura = pai.querySelector('.Altura');

            pessoa = {
                "nome" : nome.innerHTML,
                "idade" : idade.innerHTML,
                "altura" : altura.innerHTML
            }

            deletPessoa(pessoa);

            window.location.reload()
            
        }
    
    })
}