import { useState, useContext } from 'react'
import './profile.css'
import Header from '../../components/Header/'
import Title from '../../components/title'
import avatar from '../../images/avatar.png'
import { FiSettings, FiUpload } from 'react-icons/fi'
import { AuthContext } from '../../contexts/Auth'
import firebase from '../../services/firebaseConnection'

export default function Profile() {
    const { user, setUser, signOut, storageUser } = useContext(AuthContext);
    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    function file(e) {
        if (e.target.files[0]){
            const image = e.target.files[0]

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            } else {
                alert('Envie uma imagem do tipo PNG ou JPEG')
                setImageAvatar(null);
                return null;
            }
        }
    }

    async function imageUpload() {
        const currentUid = user.uid;

        const uploadTask = await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async ()=> {
            console.log('FOTO ENVIADA COM SUCESSO');
            
            await firebase.storage()
            .ref(`images/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then( async (url)=>{
                 let urlFoto = url;
                 
                 await firebase.firestore().collection('users')
                 .doc(user.uid)
                 .update({
                    avatarUrl: urlFoto,
                    nome: nome
                 })
                 .then(()=>{
                    let data = {
                        ...user,
                        avatarUrl: urlFoto,
                        nome: nome,
                    };
                    setUser(data);
                    storageUser(data);
                 })
            })
        })
    }

    async function save(e) {
        e.preventDefault();
        if (imageAvatar === null && nome !== '') {
            await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    nome: nome
                })
                .then(() => {
                    let data = {
                        ...user,
                        nome: nome
                    };
                    setUser(data);
                    storageUser(data);
                })
        }
        else if (nome !== '' && imageAvatar !== null) {
            imageUpload();
        }
    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name='Meu perfil'>
                    <FiSettings size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={save}>
                        <label className='label-avatar'>
                            <span><FiUpload color='#FFF' size={25} /></span>
                            <input type="file" accept='image/*' onChange={file} /> <br />
                            {avatarUrl === null ?
                                <img src={avatar} width='250' height='250' alt='foto de usuario' /> :
                                <img src={avatarUrl} width='250' height='250' alt='foto de usuario' />
                            }
                        </label>
                        <div className='bottom-form'>

                            <label>Nome</label>
                            <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} />

                            <label>E-mail</label>
                            <input type='email' value={email} disabled={true} />
                            <button className='button-form' type='submit' >
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>

                <div className='container'>
                    <button onClick={() => signOut()} className='logout-btn'>
                        Sair
                    </button>
                </div>
            </div>
        </div>
    )
}