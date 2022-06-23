import './customers.css'
import Title from '../../components/title'
import Header from '../../components/Header'
import { FiUser } from 'react-icons/fi'
import { useState } from 'react'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify';

export default function Customers() {
    const [nomeArena, setNomeArena] = useState('');
    const [limite, setLimite] = useState('');
    const [endereco, setEndereco] = useState('');

    async function addArena(e) {
        e.preventDefault();
        if (nomeArena !== '' && limite !== '' && endereco !== '') {
            await firebase.firestore().collection('arenas')
                .add({
                    nomeArena: nomeArena,
                    limite: limite,
                    endereco: endereco,
                })
                .then(() => {
                    setNomeArena('')
                    setLimite('')
                    setEndereco('')
                    toast.info('Arena cadastrada com sucesso!');
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Algo deu errado ao cadastrar essa arena!')
                })
        } else{
            toast.error('Preencha todos os campos!')
        }
    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name='Arena'>
                    <FiUser size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' id='customers' onSubmit={addArena}>
                        <label>Nome da Arena</label>
                        <input type='text' value={nomeArena} onChange={(e) => setNomeArena(e.target.value)} placeholder='Nome da arena' />

                        <label>Limite de jogadores por pelada</label>
                        <input type='text' value={limite} onChange={(e) => setLimite(e.target.value)} placeholder='quantidade maxima de jogadores por pelada' />

                        <label>Endereço</label>
                        <input type='text' value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder='Endereço da empresa' />

                        <button id='button-add-client' type='submit'>Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}