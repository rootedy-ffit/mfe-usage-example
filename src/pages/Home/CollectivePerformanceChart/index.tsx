import React, { useEffect, useCallback, useRef } from 'react';
import api from '../../../services/api';

function CollectivePerformanceChart() {
  const mfeRef = useRef<HTMLIFrameElement | null>(null);
  
  const getDataMock = async () => {
    try {
      const resultData = await api.post('/bonificacao');

      const data = { event: 'loadData', info: resultData.data }

      setTimeout(() => {    
        mfeRef?.current?.contentWindow?.postMessage(data, '*');
      }, 100);
    } catch (error) {
      alert(`MonthlyLossRatioChart :: ERROR ==> ${error}`);
    }
  }

  const receiver = useCallback((e: any) => {
    if (e.data.mfeCode === '@ffit/performance-coletiva') {
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
    'ffit-key': 'i8Nc7C1gYSMz1OgTU9X1DC6tOholr6e7',
    simpleHeader: 'false',
    outlined: 'true',
    title: 'Performance Coletiva',
  };

  const queryString = new URLSearchParams(queryStringObj).toString();

  return (
    <iframe
      ref={mfeRef}
      src={`https://mfe.ffit.com.br/mfe/performance-coletiva?${queryString}`}
      title="Performance Coletiva"
      style={{ width: '100%', height: 360 }}
      frameBorder="0"
    />
  );
}

export { CollectivePerformanceChart };
