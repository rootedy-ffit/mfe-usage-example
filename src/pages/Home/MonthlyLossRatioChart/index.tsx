import React, { useRef, useEffect, useCallback, useState } from 'react';
import api from '../../../services/api';

function MonthlyLossRatioChart() {
  const [height, setHeight] = useState(0);
  const mfeRef = useRef<HTMLIFrameElement | null>(null);

  const getDataMock = async () => {
    try {
      const resultData = await api.post('/transparencia/indices');

      const data = { event: 'loadData', info: resultData.data }

      mfeRef?.current?.contentWindow?.postMessage(data, '*');
    } catch (error) {
      alert(`MonthlyLossRatioChart :: ERROR ==> ${error}`);
    }
  }

  const receiver = useCallback((e: any) => {
    if (e.data.mfeCode === '@ffit/sinistralidade-card') {
      switch (e.data?.event) {
        case 'mfe-loaded': {
          getDataMock();
          break;
        }
        case 'updateSize':
          setHeight(e.data.info.height);
          break;
      
        default:
          break;
      } 
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', receiver);

    return () => { 
      window.removeEventListener('message', receiver);
    };
  }, [receiver]);

  const queryStringObj = {
    'ffit-key': 'i8Nc7C1gYSMz1OgTU9X1DC6tOholr6e7',
    displayAccumulated: 'true',
    displaySubtitles: 'true',
    hideSeeMoreButton: 'true',
    outlined: 'true',
    title: 'Índice de Sinistralidade',
  };

  const queryString = new URLSearchParams(queryStringObj).toString();

  return (
    <iframe
      ref={mfeRef}
      src={`https://mfe.ffit.com.br/mfe/sinistralidade-card?${queryString}`}
      title="Índice de Sinistralidade"
      style={{ width: '100%', height }}
      frameBorder="0"
    />
  );
}

export { MonthlyLossRatioChart };