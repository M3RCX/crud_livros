//for fun
const ApagadoComSucesso = "dado apagado com sucesso";
const AtualizadoComSucesso = "dado atualizado com sucesso";
const CriadoComSucesso = "dado criado com sucesso";


//importa os módulos http e express
const http = require('http');
const express = require('express');

//constrói um objeto express
const app = express();

//importa o body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//configura a porta do servidor e o coloca em execução.
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3000);

let id = 1;

let livros=[
    {
        id: 1,
        titulo: "a furia de java",
        descricao: "Este livro conta a historia de um guerreiro chamdo java",
        edicao: "3",
        autor: "Guilherme Mercante Remberg Fernandes",
        isbn: "020406"
    }
];

app.get("/livro", (req, res, next) => {
    res.status(200).json(livros);
});


app.post("/livro", (req, res, next) => {
    const livro = {
        id: id += 1,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        edicao: req.body.edicao,
        autor: req.body.autor,
        isbn: req.body.isbn
    }
    livros.push(livro);
    console.log(CriadoComSucesso);
    console.log(livros);
    res.status(201).json(livros);
});


app.put("/livro", (req, res, next) => {
    livros.forEach((livro) => {
        if (livro.id === req.body.id) {
            livro.titulo = req.body.titulo;
            livro.descricao = req.body.descricao;
            livro.edicao = req.body.edicao;
            livro.autor = req.body.autor;
            livro.isbn = req.body.isbn;
        }
    })
    console.log(AtualizadoComSucesso);
    console.log(livros);
    res.status(200).json(livros);
});

app.delete('/livro/:id', (req, res, next) => {
    const idLivroDeletado = req.params.id;
    livros.forEach((livro, index) =>{
        if(livro.id == idLivroDeletado) livros.splice(index, 1)
    })
    console.log(ApagadoComSucesso);
    console.log(livros);
    res.status(204).end();
})
