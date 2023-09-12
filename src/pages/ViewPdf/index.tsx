import React, { CSSProperties, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Structure } from '../../components/Structure';
import { pdf } from './pdf64';

function ViewPdf() {
  const navigate = useNavigate();
  const mfeRef = useRef<any>();

  let fileData = {
    filename: 'Example of PDF',
    file: 'https://queksiewkhoon.tripod.com/ontology_01.pdf',
  }

  const receiver = useCallback((e: any) => {
    switch (e.data?.event) {
      case 'mfe-loaded': {
        /* PDF event parameters in base 64 */
        const data = {
          event: 'pdfInBase64',
          info: {
            filename: 'Teste',
            pdfInBase64: pdf,
          },
        }

        /* Sending event to mfe from pdf */
        mfeRef?.current?.contentWindow?.postMessage(data, '*');
        break;
      }
    
      default:
        break;
    } 
  }, []);

  useEffect(() => {
    window.addEventListener('message', receiver);

    return () => {
      window.removeEventListener('message', receiver);
    };
  }, [receiver]);

  /* parameters used to load mfe viewer pdf */
  const queryStringObj = {
    'ffit-key': 'i8Nc7C1gYSMz1OgTU9X1DC6tOholr6e7',
    ...fileData,
    buttonGoBackMobile: 'false',
    buttonDownloadMobile: 'true',
    showThumbnails: 'false',
    useProxy: 'true',
    hideHeader: 'false',
    showZoomMobile: 'false',
    downloadOnMfe: 'false',
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
              ref={mfeRef}
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
