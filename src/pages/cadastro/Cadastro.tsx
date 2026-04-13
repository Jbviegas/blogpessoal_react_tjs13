import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";

function Cadastro() {

  // Objeto responsável por redirecionar o usuário para uma outra rota
  const navigate = useNavigate();

  // Estado para controlar o Loader (animação de carregamento)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado para confirmar a senha digitada pelo usuário
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  // Estado usuario para armazenar os dados do usuário que será cadastrado
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: ""
  })

  // useEffect que vai controlar o redirecionamento para a página de login
  // caso o cadastro seja bem sucedido
  useEffect(() => {
    if (usuario.id !== 0) {
      retornar()
    }
  }, [usuario])

  // Função de atualização do estado usuario
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value//[e.target.name]: e.target.value = name : value 
      //e = evento onChange (mudança) - target = input onde ocorreu a mudança e name = nome do input onde ocorreu a mudança
      //e = evento onChange (mudança) - target = input onde ocorreu a mudança e value = valor da mudança(valor input)
    })
  }

  // Função de atualização do estado confirmarSenha
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)// e.target.value = value 
    //e = evento onChange (mudança) - target = input onde ocorreu a mudança e value = valor da mudança(valor input)
  }

  // Função para enviar os dados para o Backend (Submit)
  // Trocar o FormEvent pelo SyntheticEvent
  async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {// e = evento onSubmit do formulário

    e.preventDefault();// Previne o comportamento padrão do formulário, que é recarregar a página após o envio dos dados

    setIsLoading(true);// Ativa o Loader (animação de carregamento)

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      // Verifica se a senha e a confirmação de senha são iguais e se a senha tem pelo menos 8 caracteres
      try {
        //api.post(url: baseURL + '/usuarios/cadastrar'), usuario:{ nome, usuario, senha, foto },setUsuario:função para atualizar o estado usuario
        await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario);
        //Chamamos cadastrarUsuario (da Service) com a baseURL + a url do endpoint(/usuarios/cadastrar), o estado usuario e a função setUsuario 
        // para atualizar o estado usuario com os dados retornados pela API após o cadastro do usuário.
        alert('Usuário Cadastrado com sucesso!');
        // Se o cadastro for bem sucedido, exibe um alerta de sucesso e o useEffect irá redirecionar o usuário para a página de login.
      } catch (error) {
        alert('Erro ao cadastrar o usuário!');
        // Se ocorrer um erro durante o cadastro, exibe um alerta de erro.
      }

    } else {
      alert('Dados do usuário estão inconsistentes!');
      // Se a senha e a confirmação de senha não forem iguais ou se a senha tiver menos de 8 caracteres, exibe um alerta de dados inconsistentes.
      setUsuario({ ...usuario, senha: '' })// Limpa o campo de senha do estado usuario, mantendo os outros campos preenchidos.
      setConfirmarSenha('');// Limpa o campo de confirmação de senha, para que o usuário possa digitar novamente.
    }

    setIsLoading(false)// Desativa o Loader (animação de carregamento) após o processo de cadastro, 
    // independentemente do resultado (sucesso ou erro).
  }

  function retornar() {// Função para redirecionar o usuário para a página de login
    navigate("/")
  }

  console.log(JSON.stringify(usuario));
  // Exibe no console o estado usuario em formato JSON, para facilitar a visualização dos dados do usuário que está sendo cadastrado.

  console.log(confirmarSenha);
  // Exibe no console o estado confirmarSenha, para facilitar a visualização da confirmação de senha que está sendo digitada pelo usuário.

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">

        <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center">
        </div>

        <form className='flex justify-center items-center flex-col w-2/3 gap-3' onSubmit={cadastrarNovoUsuario}>

          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"//Campo que será alterado no estado usuario, por isso o name é igual ao atributo do estado
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.nome}//Valor do campo que será alterado no estado usuario, por isso o value é igual ao atributo do estado
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}//e permite identificar qual campo do estado deve ser atualizado
            //Pega tudo que está sendo digitado no campo nome e atualiza o estado usuario através da função atualizarEstado,
            //  que por sua vez chama a função setUsuario(setUsuario({...usuario, nome: e.target.value})) que mantém os outros campos do estado
            //  usuario inalterados e atualiza apenas o campo nome com o valor digitado no input.
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"//Campo que será alterado no estado usuario, por isso o name é igual ao atributo do estado(usuario)
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.usuario}//Valor do campo que será alterado no estado usuario, por isso o value é igual ao atributo do estado
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}//e permite identificar qual campo do estado deve ser atualizado
            //Pega tudo que está sendo digitado no campo usuario e atualiza o estado usuario através da função atualizarEstado,
            //  que por sua vez chama a função setUsuario(setUsuario({...usuario, usuario: e.target.value}))que mantém os outros campos do estado
            //  usuario inalterados e atualiza apenas o campo usuario com o valor digitado no input.
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"//Campo que será alterado no estado usuario, por isso o name é igual ao atributo do estado(foto)
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.foto}//Valor do campo que será alterado no estado usuario, por isso o value é igual ao atributo do estado
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}//e permite identificar qual campo do estado deve ser atualizado
            //Pega tudo que está sendo digitado no campo foto e atualiza o estado usuario através da função atualizarEstado,
            //  que por sua vez chama a função setUsuario(setUsuario({...usuario, foto: e.target.value}))que mantém os outros campos do estado 
            // usuario inalterados e atualiza apenas o campo foto com o valor digitado no input.
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"//Campo que será alterado no estado usuario, por isso o name é igual ao atributo do estado(senha)
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.senha}//Valor do campo que será alterado no estado usuario, por isso o value é igual ao atributo do estado
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}//e permite identificar qual campo do estado deve ser atualizado
            //Pega tudo que está sendo digitado no campo senha e atualiza o estado usuario através da função atualizarEstado,
            //  que por sua vez chama a função setUsuario(setUsuario({...usuario, senha: e.target.value}))que mantém os outros campos do estado 
            // usuario inalterados e atualiza apenas o campo senha com o valor digitado no input.
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"//Campo que será alterado no estado confirmarSenha, por isso o name é igual ao estado confirmarSenha
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmarSenha}//Valor do campo que será alterado no estado confirmarSenha, por isso o value é igual ao estado confirmarSenha
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}//e permite identificar qual campo do estado deve ser atualizado
            //Pega tudo que está sendo digitado no campo confirmarSenha e atualiza o estado confirmarSenha através da função handleConfirmarSenha,
            // que por sua vez chama a função setConfirmarSenha(setConfirmarSenha(e.target.value))que atualiza o estado confirmarSenha com o valor
            //  digitado no input. 
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button
              type='reset'
              className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='rounded text-white bg-indigo-400 
                           hover:bg-indigo-900 w-1/2 py-2
                           flex justify-center'
            >
              {
                isLoading ?

                  <ClipLoader
                    color="#ffffff"
                    size={24}
                  />

                  :

                  <span>Cadastrar</span>

              }
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro