import React, { CSSProperties, useState, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/unimed.png';

function Login() {
  const navigate = useNavigate();

  const [height, setHeight] = useState(0);

  const receiver = useCallback((e: any) => {
    switch (e.data?.event) {
      /* `case 'updateSize' event` - Update the height of the mfe */
      case 'updateSize':
        setHeight(e.data.info.height);
        break;

      /* `case 'send' event` - Gets the parameters 'identifier' and 'password' 
      returned from the login mfe */
      case 'send': {
        const { identifier, password } = e.data.info;
        if (identifier === '0000' && password === '123') {
          navigate('/home');
        } else {
          alert('Use CRM: 0000, PASS: 123');
        }
        break;
      }
    
      default:
        break;
    } 
  }, [navigate]);

  useEffect(() => {
    window.addEventListener('message', receiver);

    return () => {
      window.removeEventListener('message', receiver);
    };
  }, [receiver]);

  /* parameters used to load mfe login */
  const queryStringObj = {
    'ffit-key': 'i8Nc7C1gYSMz1OgTU9X1DC6tOholr6e7',
    checkboxRemember: 'false',
    hideCreateAcc: 'true',
    hideForgetPass: 'true',
    type: 'crm',
  };

  /* `The `URLSearchParams` constructor takes an object as an argument and converts it into a 
  query string format. The `toString()` method is then called on the `URLSearchParams` object to 
  return the query string representation of the object. */
  const queryString = new URLSearchParams(queryStringObj).toString();

  return (
    <div style={styles.pageHolder}>
      <img
        src={logo}
        className="Unimed-logo"
        alt="logo" 
        style={styles.logo}
      />
      <div style={styles.loginHolder}>
        {/* The `<iframe>` element is used to embed another HTML document within the
        current document. In this case, it is used to embed the login page from
        the URL `https://mfe.ffit.com.br/mfe/login` into the current page. Using the 
        constructed URL QueryStringParams. */}
        <iframe
          src={`https://mfe.ffit.com.br/mfe/login?${queryString}`}
          title="Login"
          style={{ width: '100%', height }}
          frameBorder="0"
          aria-hidden="true"
        />
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
    background: 'transparet',
  }
}

export default Login;
