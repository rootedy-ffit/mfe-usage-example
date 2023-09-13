import React, { CSSProperties, useState, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/unimed.png';

function Login() {
  const navigate = useNavigate();

  const [height, setHeight] = useState(0);


  return (
    <div style={styles.pageHolder}>
      <img
        src={logo}
        className="Unimed-logo"
        alt="logo" 
        style={styles.logo}
      />
      <div style={styles.loginHolder}>
        
      </div>
    </div>
  );
}

const styles: {
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
    background: '#3E1E5D',
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
    minHeight: 414,
    minWidth: 408,
    background: 'lightgray',
  }
}

export default Login;
