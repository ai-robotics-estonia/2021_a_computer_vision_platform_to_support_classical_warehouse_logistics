import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './prototype';
import Router from './Router';
import Header from './components/Header';
import LoginController from './components/LoginController';
import Login from './views/Login';
import UserContextProvider from './contexts/UserContext';
import './axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer autoClose={5000} theme="colored" />
        <UserContextProvider>
          <LoginController loginPage={<Login />}>
            <div className="min-vh-100">
              <Header />
              <Router />
            </div>
          </LoginController>
        </UserContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
