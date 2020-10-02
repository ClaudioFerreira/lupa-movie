# LupaMovie
Esse projeto realiza a busca em uma API de filmes e series

![Alt text](src/shared/assets/img/screenshot.jpeg?raw=true "LupaMovie")

Para ver o projeto basta:
 - Criar sua chave na [OMDb API](http://www.omdbapi.com/apikey.aspx)
 - Realizar clone do projeto.
 - Intalar as dependencias.
 - Inserir sua chave no projeto
 - E finalmente rodar

## Instalação de dependencia
```sh
yarn install
ou
npm install
```

## Inserindo sua chave
 Para inserir sua chave basta acessar: `src/shared/services/api.tsx`
 e adicionar sua chave na constante `apikey`
 ```sh
 const apikey = 'YOUR_KEY'
 ```
 
 ## Rodando o projeto
 Apos realizar a instalação de dependecias e substituição de chave, basta rodar o comando abaixo. E conseguirar acessar o projeto pelo seu navegador no endereço: [http://localhost:3000](http://localhost:3000) 
 ```sh
 /lupa-movie$ yarn start
 ```