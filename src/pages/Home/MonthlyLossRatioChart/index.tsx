import React, { useRef, useEffect, useCallback } from 'react';
import api from '../../../services/api';

function MonthlyLossRatioChart() {
  const mfeRef = useRef<HTMLIFrameElement | null>(null);

  const getDataMock = async () => {
    try {
      const resultData = await api.post('/transparencia/indices');

      const data = { event: 'loadData', info: resultData.data }

      setTimeout(() => {    
        mfeRef?.current?.contentWindow?.postMessage(data, '*');
      }, 100);
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
    'ffit-key': 'k6Q4yijDxm6w8QEzIZ1P9Bh8VJswZWXv',
    displayAccumulated: 'true',
    displaySubtitles: 'true',
    simpleHeader: 'false',
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
      style={{ width: '100%', height: 360 }}
      frameBorder="0"
      aria-hidden="true"
      srcDoc={`<!DOCTYPE html><span>Carregando...</span>`}
      onLoad={() => setTimeout(() => {
        mfeRef?.current?.removeAttribute('srcDoc');
      }, 200)}
    />
  );
}

export { MonthlyLossRatioChart };