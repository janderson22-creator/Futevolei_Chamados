import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth'
import './header.css'
import avatar from '../../images/avatar.png'
import { Link } from 'react-router-dom'
import { FiHome,FiSettings } from 'react-icons/fi'
import {BiFootball} from 'react-icons/bi';

export default function Header(){
    const { user } = useContext(AuthContext);

    return(
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt='Foto Avatar' />
            </div>

            <Link to='/dashboard'>
            <FiHome color='#CAB831' size='24' />
                Inicio
            </Link>
            <Link to='/arenas'>
            <BiFootball color='#CAB831' size='24' />
                Arenas
            </Link>
            <Link to='/profile'>
            <FiSettings color='#CAB831' size='24' />
                Configurações
            </Link>
        </div>
    )
}