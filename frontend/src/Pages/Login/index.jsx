import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import loginMainImage from '../../assets/utils/images/login-main-img.jpg';

import { Spinner } from 'reactstrap';
import { useAuth } from '../../context/AuthContext/useAuth';

const Login = () => {
  const [login, setLogin] = useState('');
  const [senha, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the login credentials and send a request to the server
    const data = {
      login,
      senha,
      rememberMe
    }
    signIn(data)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex' }}>
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50
          }}
        >
          <Spinner style={{ width: '10rem', height: '10rem' }} color="primary" />
        </div>
      )}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '12px',
          maxWidth: 'none',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '24rem' }}>
          <h2 style={{ marginTop: '1.5rem', fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
            Entre na sua conta
          </h2>
          <form style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
            <div style={{ marginTop: '2rem' }}>
              <div>
                <label
                  htmlFor="email"
                  style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'medium', color: '#4B5563' }}
                >
                  Login
                </label>
                <div style={{ marginTop: '0.25rem' }}>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    autoFocus
                    style={{
                      appearance: 'none',
                      width: '100%',
                      padding: '0.75rem 0.75rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.375rem',
                      boxShadow: 'none',
                      placeholder: '#9CA3AF',
                      fontSize: '0.875rem',
                      outline: 'none',
                      ring: '1px solid #3B82F6',
                      smText: '0.875rem'
                    }}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label
                  htmlFor="password"
                  style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'medium', color: '#4B5563' }}
                >
                  Senha
                </label>
                <div style={{ marginTop: '0.25rem' }}>
                  <input
                    id="senha"
                    name="senha"
                    type="password"
                    autoComplete="current-password"
                    required
                    style={{
                      appearance: 'none',
                      width: '100%',
                      padding: '0.75rem 0.75rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.375rem',
                      boxShadow: 'none',
                      placeholder: '#9CA3AF',
                      fontSize: '0.875rem',
                      outline: 'none',
                      ring: '1px solid #3B82F6',
                      smText: '0.875rem'
                    }}
                    value={senha}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      style={{
                        height: '1rem',
                        width: '1rem',
                        color: '#3B82F6',
                        ring: '1px solid #3B82F6',
                        border: '1px solid #9CA3AF',
                        borderRadius: '0.25rem'
                      }}
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label
                      htmlFor="remember-me"
                      style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: '#111827' }}
                    >
                      Lembrar-me
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.375rem',
                    boxShadow: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 'medium',
                    color: 'white',
                    backgroundColor: '#EF4444',
                    hoverBgColor: '#DC2626',
                    focusOutline: '2px solid #F87171',
                    focusRing: '2',
                    focusRingOffset: '2',
                    focusRingColor: '#F87171'
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div style={{ display: 'none', marginLeft: 'auto', marginRight: 'auto', flex: 1, marginTop: '2.5rem' }}>
        <img src={loginMainImage} alt="" />
      </div>
    </div>
  );
};

export default Login;
