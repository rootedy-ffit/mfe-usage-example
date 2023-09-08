import React, { CSSProperties } from 'react';
import logo from '../../assets/unimed.png';

function Login() {
  return (
    <div
      style={styles.pageHolder}
    >
      <img
        src={logo}
        className="Unimed-logo"
        alt="logo" 
        style={styles.logo}
      />
      <div
        style={styles.loginHolder}
      >
        LOGIN
      </div>
    </div>
  );
}

const styles:{
  pageHolder: CSSProperties,
  logo: CSSProperties,
  loginHolder: CSSProperties,
} = {
  pageHolder: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    width: 200,
    objectFit: 'contain',
  },
  loginHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24,
    minHeight: 300,
    minWidth: 400,
  }
}

export default Login;
