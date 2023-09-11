import React, { CSSProperties, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Structure } from '../../components/Structure';
import { pdf } from './pdf64';

function ViewPdf() {
  const navigate = useNavigate();
  const params = useParams();
  const mfeRef = useRef<any>();

  /* The code block `if (params.id === '1') { ... }` is checking if the value of
  `params.id` is equal to the string `'1'`. If it is, then it sets the `fileData`
  object with a `filename` and `file` property. In this case, the `filename` is
  set to `'Ontology'` and the `file` is set to
  `'https://queksiewkhoon.tripod.com/ontology_01.pdf'`. This code is likely used
  to conditionally set the `fileData` based on the value of `params.id`. */
  let fileData = {};
  if (params.id === '1') {
    fileData = {
      filename: 'Ontology',
      file: 'https://queksiewkhoon.tripod.com/ontology_01.pdf',
    }
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

        setTimeout(() => {
          /* Sending event to mfe from pdf */
          mfeRef?.current?.contentWindow?.postMessage(data, '*');
        }, 100);
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
    'ffit-key': 'k6Q4yijDxm6w8QEzIZ1P9Bh8VJswZWXv',
    ...fileData,
    buttonGoBackMobile: 'false',
    buttonDownloadMobile: 'true',
    showThumbnails: 'false',
    useProxy: 'true',
    hideHeader: 'false',
    showZoomMobile: 'false',
    downloadOnMfe: 'false',
  };

  /* `The `URLSearchParams` constructor takes an object as an argument and converts it into a 
  query string format. The `toString()` method is then called on the `URLSearchParams` object to 
  return the query string representation of the object. */
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
            {/* The `<iframe>` element is used to embed another HTML document within the
            current document. In this case, it is used to embed the login page from
            the URL `https://mfe.ffit.com.br/mfe/visualizacao-de-pdf` into the current page.
            Using the constructed URL QueryStringParams. */}
            <iframe
              ref={mfeRef}
              src={`https://mfe.ffit.com.br/mfe/visualizacao-de-pdf?${queryString}`}
              title="Visualizador de PDF"
              style={{ width: '100%', height: '100%' }}
              frameBorder="0"
              aria-hidden="true"
              srcDoc={`<!DOCTYPE html><span>Carregando...</span>`}
              onLoad={() => setTimeout(() => {
                mfeRef?.current.removeAttribute('srcDoc');
              }, 200)}
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
