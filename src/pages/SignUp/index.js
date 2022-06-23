import React, { useState, useContext } from 'react';
import { BiFootball } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth'

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nome, setNome] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();

        if (nome !== '' && email !== '' && password !== '') {
            signUp(email, password, nome);

        }
    }

    return (
        <div className='container-HeaderMain'>

            <div className='container-main-HeaderMain'>
                <div className='container-container'>
                    <div className='container-login'>
                        <div className='wrap-login'>
                            <form action='' className='login-form'>
                                <span className='login-form-title'>Cadastrar</span>
                                <span className='icon'> <BiFootball /></span>

                                <form onSubmit={handleSubmit}>
                                    <div className='wrap-input'>
                                        <input className={email !== "" ? 'has-val input' : 'input'} type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <span className='focus-input' data-placeholder='Email'>

                                        </span>
                                    </div>

                                    <div className='wrap-input'>

                                        <input className={password !== "" ? 'has-val input' : 'input'} type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                                        <span className='focus-input' data-placeholder='Senha'>

                                        </span>
                                    </div>

                                    <div className='wrap-input'>

                                        <input className={nome !== "" ? 'has-val input' : 'input'} type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
                                        <span className='focus-input' data-placeholder='Seu Nome'>

                                        </span>
                                    </div>

                                    <div className='container-login-form-btn'>
                                        <button onClick={handleSubmit} type='submit' className='login-form-btn'>{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
                                    </div>
                                    <div className='text-center'>
                                        <span className='txt1'>possui conta?</span>

                                        <Link to="/" className='txt2'> Entrar.</Link>
                                    </div>
                                </form>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;





