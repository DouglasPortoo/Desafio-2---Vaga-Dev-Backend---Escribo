
# Desafio Técnico 2

Este é o desafio tecnico 2 para a empresa Escribo.


## Tecnologia


- JavaScript
- bcryptjs
- express
- express-async-errors
- jsonwebtoken
- knex
- pm2
- sqlite3











## Funcionalidade

uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.
## Rodando Localmente

Clone o projeto

```bash
  https://github.com/DouglasPortoo/Escribo-Desafio-Tecnico-2.git
```

Entre no diretório do projeto

```bash
  /cd Escribo-Desafio-Tecnico-2
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```



## Testando a funcionalidade

No Insomnia Importe o arquivo ```Insomnia_2023-11-23.json``` que se encontra no projeto e efetue o teste das funcionalidades.

## Users:
- Create:

```bash
    {
            "name":"string",
	    "email":"string",
	    "password":"senha",
	    "phone":[{"number":"123456789","ddd":"11"}]
    }
```

- Show:

```bash
   {
      "Use o token criado pela session na aba Bearer para recuperar as informações do usuário."
  }
```

## Session:
- Create:

 ```bash
    {
        "name":"string",
	    "password":"senha",
    }
```
    



