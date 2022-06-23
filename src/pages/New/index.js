import Header from '../../components/Header'
import Title from '../../components/title'
import { FiPlus } from 'react-icons/fi'
import './new.css'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { toast } from 'react-toastify'
import firebase from '../../services/firebaseConnection';
import { useHistory, useParams } from 'react-router-dom';

export default function New() {
    const { id } = useParams();
    const history = useHistory();
    const [idArena, setIdArena] = useState(false);
    const [loadArenas, setLoadArenas] = useState(true);
    const [arenas, setArenas] = useState([]);
    const [arenaSelected, setArenaSelected] = useState(0);

    const [assunto, setAssunto] = useState('pelada');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function loadArenas() {
            await firebase.firestore().collection('arenas')
                .get()
                .then((snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeArena: doc.data().nomeArena
                        })
                    })
                    if (lista.length === 0) {
                        console.log('NENHUMA EMPRESA ENCONTRADA');
                        setArenas([{ id: 1, nomeArena: 'FREELA' }]);
                        setLoadArenas(false);
                        return;
                    }

                    setArenas(lista);
                    setLoadArenas(false);

                    if(id){
                        loadId(lista);
                    }
                })
                .catch((error) => {
                    alert('ERROR', error)
                    setLoadArenas(false);
                    setArenas([{ id: 1, nomeArena: '' }])
                })
        }

        loadArenas();
    }, [id])

    async function loadId(lista){
        await firebase.firestore().collection('chamados')
        .doc(id)
        .get()
        .then((snapshot) => {
            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento);

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
            setArenaSelected(index);
            setIdArena(true);
        })
        .catch((error)=>{
            console.log('ERRO NO ID PASSADO: ', error);
            setIdArena(false);
        })
    }

    async function register(e) {
        e.preventDefault();

        if(idArena){
            await firebase.firestore().collection('chamados')
            .doc(id)
            .update({
                arena: arenas[arenaSelected].nomeArena,
                clienteId: arenas[arenaSelected].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid
            })
            .then(()=>{
                toast.success('Chamado editado com sucesso!')
                setArenaSelected(0);
                setComplemento('');
                history.push('/dashboard')
            })
            .catch((error)=>{
                toast.error('Ops algo deu errado, tente novamente.')
                console.log(error);
            })

            return;
        }

        await firebase.firestore().collection('chamados')
            .add({
                created: new Date(),
                arena: arenas[arenaSelected].nomeArena,
                clienteId: arenas[arenaSelected].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid
            })
            .then(() => {
                toast.success('Chamado criado com sucesso!');
                setComplemento('');
                setArenaSelected(0);
            })
            .catch((error) => {
                toast.error('Ops, erro ao registrar, tente novamente.')
                console.log(error);
            })
    }
    // Quando troca o assunto
    function changeSelect(e) {
        setAssunto(e.target.value);
    }

    // quando troca o status
    function optionChange(e) {
        setStatus(e.target.value);
        console.log(e.target.value);
    }

    // quando troca de cliente
    function changeArenas(e) {
        console.log('INDEX DO CLIENTE SELECIONADO: ', e.target.value);
        console.log('Cliente selecionado', arenas[e.target.value]);
        setArenaSelected(e.target.value);
    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name='Novo Chamado'>
                    <FiPlus size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile newForm' onSubmit={register}>
                        <label>Arena:</label>
                        {loadArenas ? (
                            <input type='text' disabled={true} value='Carregando Arenas...' />
                        ) : (

                            <select value={arenaSelected} onChange={changeArenas}>
                                {arenas.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index}>
                                            {item.nomeArena}
                                        </option>
                                    )
                                })}
                            </select>
                        )}

                        <label>Assunto</label>
                        <select value={assunto} onChange={changeSelect}>
                            <option value="Pelada">Pelada</option>
                            <option value="Torneio">Torneio</option>
                            <option value="Limpeza">Limpeza</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input
                                type="radio"
                                name='radio'
                                value='Aberto'
                                onChange={optionChange}
                                checked={status === 'Aberto'}
                            />
                            <span>em aberto</span>
                            <input
                                type="radio"
                                name='radio'
                                value='Progresso'
                                onChange={optionChange}
                                checked={status === 'Progresso'}
                            />
                            <span>em Progresso</span>
                            <input
                                type="radio"
                                name='radio'
                                value='Atendido'
                                onChange={optionChange}
                                checked={status === 'Atendido'}
                            />
                            <span>Finalizada</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type='text'
                            placeholder='Descreva algum comentario (Opcional)'
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button id='buttonNew' type='submit' >Registrar Pelada</button>
                    </form>
                </div>
            </div>
        </div>
    )
}