import React, { CSSProperties } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Structure } from '../../components/Structure';

function ViewPdf() {
  const navigate = useNavigate();
  const params = useParams();

  /* parameters used to load mfe viewer pdf */
  const queryStringObj = {
    'ffit-key': 'i8Nc7C1gYSMz1OgTU9X1DC6tOholr6e7',
    filename: params.id || '',
    file: params.id === 'CONTRACHEQUE' 
      ? 'https://mfe.ffit.com.br/public-files/prototypes/PDFs/PFDs/contracheque%20mesAno.pdf'
      :'https://mfe.ffit.com.br/public-files/prototypes/PDFs/PFDs/demonstrativo%20mesAno.pdf',
    showThumbnails: 'false',
    downloadOnMfe: 'true',
  };

  const queryString = new URLSearchParams(queryStringObj).toString();

  return (
    <Structure>
      <div style={styles.mfeHolder}>
        <div>
          {/* Breadcrumb returning to the dashboard */}
          <span onClick={() => navigate('/home')}>
            <u style={{ cursor: 'pointer' }}>Início</u>
          </span> {'> Ver PDF'}
        </div>
        <div style={styles.mfeContainer}>
          <div style={styles.mfeContent}>
            <iframe
              src={`https://mfe.ffit.com.br/mfe/visualizacao-de-pdf?${queryString}`}
              title="Visualizador de PDF"
              style={{ width: '100%', height: '100%' }}
              frameBorder="0"
            />
          </div>
        </div>
      </div>
    </Structure>
  );
}

const styles: {
  mfeHolder: CSSProperties,
  mfeContainer: CSSProperties,
  mfeContent: CSSProperties,
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 24,
  },
  mfeContent: {
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 24,
  },
}

export default ViewPdf;
