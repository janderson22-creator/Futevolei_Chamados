import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/Auth'
import { BiFootball } from 'react-icons/bi';
import './index.css'
import { Link } from 'react-router-dom';


const Home = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn, loadingAuth } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            signIn(email, password);
        }
    }

    return (
        <div className='container-HeaderMain'>

            <div className='container-main-HeaderMain'>
                <div className='container-container'>
                    <div className='container-login'>
                        <div className='wrap-login'>
                            <form action='' className='login-form'>
                                <span className='login-form-title'>Bem Vindo(a)</span>
                                <span className='icon'> <BiFootball /></span>
                                <span onSubmit={handleSubmit}>
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

                                    <div className='container-login-form-btn'>
                                        <button onClick={handleSubmit} className='login-form-btn'>{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
                                    </div>
                                    <div className='text-center'>
                                        <span className='txt1'>Não possui conta?</span>

                                        <Link to="/register" className='txt2'> Criar conta.</Link>
                                    </div>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;