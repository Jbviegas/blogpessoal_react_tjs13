import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";


function Login() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado usuario, que vai guardar os dados do usuário que será autenticado
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

    // Consumo do Contexto AuthContext 
    // usamos a desestruturação para selecionar apenas o que precisamos
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/home")
        }
    }, [usuario])

    // Função de atualização do estado usuario
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value//[e.target.name]: e.target.value = name : value 
            //e = evento onChange (mudança) - target = input onde ocorreu a mudança e name = nome do input onde ocorreu a mudança
            //e = evento onChange (mudança) - target = input onde ocorreu a mudança e value = valor da mudança(valor input)
        })
    }

    // Função assíncrona que recebe o objeto usuarioLogin, contendo e-mail e senha do usuário.
    function login(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
        // função assíncrona que recebe as credenciais do usuário(e-mail e senha) para autenticação do usuário,
        // valida com o backend e atualiza o estado usuario no contexto com os dados retornados (id, nome, foto, token).
    }

    console.log(JSON.stringify(usuarioLogin));
    // O console.log é usado para exibir o estado usuarioLogin no console do navegador.

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
                <form className="flex justify-center items-center flex-col w-1/2 gap-4"
                    onSubmit={login}
                >
                    <h2 className="text-slate-900 text-5xl ">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"//Campo que será alterado no estado usuarioLogin, pois o name do input é igual ao nome da propriedade
                            //  do estado usuarioLogin
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.usuario}//Valor do campo que será alterado no estado usuarioLogin, pois o name do input(usuario) 
                            // é igual ao nome da propriedade do estado usuarioLogin(usuario)
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}//e permite identificar qual campo do estado deve ser atualizado
                        //Pega tudo que está sendo digitado no campo nome e atualiza o estado usuario através da função atualizarEstado,
                        //  que por sua vez chama a função setUsuario(setUsuarioLogin({...usuarioLogin, usuario: e.target.value})) que atualiza o estado
                        //  usuarioLogin com o valor digitado no campo nome. 
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"//Campo que será alterado no estado usuarioLogin, pois o name do input é igual ao nome da propriedade
                            //  do estado usuarioLogin
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.senha}//Valor do campo que será alterado no estado usuarioLogin, pois o name do input(senha) 
                            // é igual ao nome da propriedade do estado usuarioLogin(senha)
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}//e permite identificar qual campo do estado deve ser atualizado
                        //Pega tudo que está sendo digitado no campo senha e atualiza o estado usuarioLogin através da função atualizarEstado,
                        //  que por sua vez chama a função setUsuario(setUsuarioLogin({...usuarioLogin, senha: e.target.value})) que atualiza o estado
                        //  usuarioLogin com o valor digitado no campo senha. 
                        />
                    </div>
                    <button
                        type='submit'
                        className="rounded bg-indigo-400 flex justify-center
                                   hover:bg-indigo-900 text-white w-1/2 py-2">
                        {
                            isLoading ?

                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                />

                                :

                                <span>Entrar</span>

                        }
                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat 
                            w-full min-h-screen bg-cover bg-center"
                ></div>
            </div>
        </>
    );
}

export default Login;