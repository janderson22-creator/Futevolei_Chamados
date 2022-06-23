import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';
import AuthProvider from './contexts/Auth';

const App = () => {
  return ( 
      
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer autoClose={3000} />
          <Routes />
        </BrowserRouter>
      </AuthProvider>

  )
}     
   
   export default App;

    

 