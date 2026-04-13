import axios from "axios";

// Cria uma nova instância do Axios
const api = axios.create({


  baseURL: 'https://blogpessoal-vjnq.onrender.com'

})

// Todos os métodos do Axios (get, post, put, delete) retornam Promises. Isso significa que, mesmo que o código pareça síncrono com o uso de
//  async/await, a requisição HTTP está sendo processada em segundo plano, permitindo que a aplicação continue funcionando normalmente enquanto 
//  aguarda a resposta.

// Função para Cadastrar Usuário

// url: baseURL + '/usuarios/cadastrar'(endpoint do Cadastro.tsx), dados: { nome, usuario, senha, foto }, 
// setDados: função para atualizar o estado com os dados retornados pela API
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);//A palavra await garante que a execução espere a resposta da API antes de continuar.
  // Faz uma requisição POST utilizando a instância api do Axios e o método post para enviar os dados de cadastro do usuário para a API.
  setDados(resposta.data);//resposta.data contém os dados retornados pela API após o cadastro do usuário.
  //  A função setDados é chamada para atualizar o estado do usuário cadastrado com a resposta da API
}

// Função para Autenticar Usuário

// url: baseURL + '/usuarios/logar'(endpoint do Cadastro.tsx), dados: { usuario, senha },
// setDados: função para atualizar o estado com os dados retornados pela API
export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);//A palavra await garante que a execução espere a resposta da API antes de continuar.
  // Faz uma requisição POST utilizando a instância api do Axios e o método post para enviar os dados de login do usuário para a API.
  setDados(resposta.data);//resposta.data contém os dados retornados pela API após a autenticação do usuário.
  // A função setDados é chamada para atualizar o estado do usuário autenticado com a resposta da API,
  //  que geralmente inclui um token de autenticação.

}

// Função para Consultar com token

// url: baseURL + '/postagens'(endpoint do Cadastro.tsx), setDados: função para atualizar o estado com os dados retornados, 
// header: objeto contendo o token de autenticação
export const buscar = async (url: string, setDados: Function, header: Object) => {
  const resposta = await api.get(url, header);//A palavra await garante que a execução espere a resposta da API antes de continuar.
  // Faz uma requisição GET utilizando a instância api do Axios e o método get para buscar os dados da API, 
  //  passando o header com o token de autenticação para autorizar a requisição.
  setDados(resposta.data);//resposta.data contém os dados retornados pela API após a consulta.
  // A função setDados é chamada para atualizar o estado com os dados retornados pela API, 
  //  permitindo que a aplicação exiba as informações consultadas.
}

// Função para Cadastrar com token

// url: baseURL + '/postagens'(endpoint do Cadastro.tsx), dados: objeto contendo os dados a serem cadastrados,
// setDados: função para atualizar o estado com os dados retornados, header: objeto contendo o token de autenticação
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.post(url, dados, header);//A palavra await garante que a execução espere a resposta da API antes de continuar.
  // Faz uma requisição POST utilizando a instância api do Axios e o método post para enviar os dados a serem cadastrados para a API, 
  //  passando o header com o token de autenticação para autorizar a requisição.
  setDados(resposta.data);//resposta.data contém os dados retornados pela API após o cadastro.
  // A função setDados é chamada para atualizar o estado com os dados retornados pela API, 
  //  permitindo que a aplicação exiba as informações do item cadastrado.
}

// Função para Atualizar com token

// url: baseURL + '/postagens/{id}'(endpoint do Cadastro.tsx), dados: objeto contendo os dados a serem atualizados,
// setDados: função para atualizar o estado com os dados retornados, header: objeto contendo o token de autenticação
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.put(url, dados, header);//A palavra await garante que a execução espere a resposta da API antes de continuar.
  // Faz uma requisição PUT utilizando a instância api do Axios e o método put para enviar os dados a serem atualizados para a API, 
  //  passando o header com o token de autenticação para autorizar a requisição.
  setDados(resposta.data);//resposta.data contém os dados retornados pela API após a atualização.
  // A função setDados é chamada para atualizar o estado com os dados retornados pela API, 
  //  permitindo que a aplicação exiba as informações do item atualizado.
}

// Função para Deletar com token

// url: baseURL + '/postagens/{id}'(endpoint do Cadastro.tsx), header: objeto contendo o token de autenticação
export const deletar = async (url: string, header: Object) => {
  await api.delete(url, header);//A palavra await garante que a execução espere a resposta da API antes de continuar.
  // Faz uma requisição DELETE utilizando a instância api do Axios e o método delete para enviar a requisição de exclusão para a API, 
  //  passando o header com o token de autenticação para autorizar a requisição.

}