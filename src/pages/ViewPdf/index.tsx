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
    file: 'https://queksiewkhoon.tripod.com/ontology_01.pdf',
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
    background: 'lightgray',
  },
}

export default ViewPdf;
