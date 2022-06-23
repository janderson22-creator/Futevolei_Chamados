import React from 'react';
import { useState, useEffect, createContext } from 'react';
import firebase from '../services/firebaseConnection'
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        function LoadStorage() {

            const storageUser = localStorage.getItem('SistemaUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false)
        }

        LoadStorage()
    }, [])
        //FUNÇÃO DE LOGAR COM USUARIO JÁ CADASTRADO. 
    async function signIn(email, password) {
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                const userProfile = await firebase.firestore().collection('users')
                    .doc(uid).get();

                let data = {
                    uid: uid,
                    nome: userProfile.data().nome,
                    avatarUrl: userProfile.data().avatarUrl,
                    email: value.user.email,
                }

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Bem vindo novamente Jogador(a)!');

            })
            .catch((error) => {
                console.log(error);
                toast.error('Ops, algo deu errado!');
                setLoadingAuth(false);
            })

    }



    // FUNÇÃO DE CRIAÇÃO DE CADASTRO E ADICIONAR NO BANCO DE DADOS
    async function signUp(email, password, nome) {
        setLoadingAuth(true);

        // CRIANDO CADASTRO COM EMAIL SENHA E NOME
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                // DEPOIS DE CRIADO AGORA VAI SER ADICIONADO NO BANCO DE DADOS
                let uid = value.user.uid;

                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        nome: nome,
                        avatarUrl: null,
                    })
                    .then(() => {
                        // DEPOIS DE ADICIONADO AGORA VAI SER PASSADO AS INFORMAÇOES DO USUARIO PARA A STATE USER.
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email,
                            avatarUrl: null
                        }
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                        toast.success('Bem vindo Jogador(a)');

                    })

            })
            .catch((error) => {
                console.log(error);
                toast.error('Ops, algo deu errado');
                setLoadingAuth(false);
            })
    }
    // ADICIONAR TODAS AS INFOMAÇOES DO NOVO USARIO NO STORAGE, A STATE USER TAMBEM ESTÁ LÁ.
    function storageUser(data) {

        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }
    // REPASSA TODAS AS INFORMAÇOES ACIMA PARA TODAS AS ROTAS DENTRO DO APP.
    return (

        <AuthContext.Provider value={{
            signed: !!user,
            user,
            setUser,
            loading,
            signUp,
            signOut,
            signIn,
            loadingAuth,
            storageUser
        }} >

            {children}
        </AuthContext.Provider>

    );
}

export default AuthProvider;