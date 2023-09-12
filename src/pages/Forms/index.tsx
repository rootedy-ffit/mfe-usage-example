import React, { CSSProperties, useRef } from 'react';
import { Structure } from '../../components/Structure';

function Forms() {
  const mfeRef = useRef<HTMLIFrameElement | null>(null);

  /* parameters used to load mp form viewer */
  const queryStringObj = {
    'ffit-key': 'i8Nc7C1gYSMz1OgTU9X1DC6tOholr6e7',
    serverHost: 'https://mfe.ffit.com.br/api-forms/v1',
    systemKey: 'adec0dc1-dbb8-4353-8080-f4067f8f8521', 
    userId: 'João',
  };

  const queryString = new URLSearchParams(queryStringObj).toString();

  return (
    <Structure>
      <div style={styles.mfeHolder}>
        <div>Formulários</div>
        <div style={styles.mfeContainer}>
          <iframe
            ref={mfeRef}
            src={`https://mfe.ffit.com.br/mfe/mp-visualizador-de-formulario?${queryString}`}
            title="Visualizador de Formulários"
            style={{ width: '100%', height: '100%' }}
            frameBorder="0"
          />
        </div>
      </div>
    </Structure>
  );
}

const styles: {
  mfeHolder: CSSProperties,
  mfeContainer: CSSProperties,
} = {
  mfeHolder: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    gap: 24,
    flex: 1,
    padding: 24,
  },
  mfeContainer: {
    display: 'flex',
    flex: 1,
  },
}

export default Forms;
