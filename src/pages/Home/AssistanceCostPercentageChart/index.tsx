import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useDatePickerModal } from '../../../components/DatePickerModal';
import api from '../../../services/api';

const randomIntFromInterval = () => Math.floor(Math.random() * (3 - 1 + 1) + 1);

function AssistanceCostPercentageChart() {
  const [height, setHeight] = useState(42);

  /* calling modal datepicker component */
  const { DatePickerModal, handleOpen, inputValue } = useDatePickerModal();

  const mfeRef = useRef<HTMLIFrameElement | null>(null);

  const getDataMock = async (newDate?: string, customDetails?: boolean) => {
    /* This event sends an event to return to the initial state of mfe */
    mfeRef?.current?.contentWindow?.postMessage({ event: 'handleLoading' }, '*');

    try {
      let resultLastDate = null;
      
      if (!newDate) {
        resultLastDate = await api.post('/producoes/ultima-data');
      }

      const resultData = await api.post(
        '/transparencia/custo-assistencial',
        { 
          dataRelatorio: (
            resultLastDate?.data?.retorno?.dataProducao || newDate
          )
        }
      );

      let infoData = resultData.data;

      if (customDetails && newDate) {
        /* When changing the date, the return is changed randomly */
        const rndInt = randomIntFromInterval();

        infoData = {
          ...infoData,
          retorno: {
            ...infoData.retorno,
            custosAssistenciais: (
              infoData.retorno.custosAssistenciais || []
            ).slice(rndInt),
            mes: Number((newDate || '').split('/')[1]),
            ano: Number((newDate || '').split('/')[2]),
          }
        }
      }

      const infoLoadData = { event: 'loadData', info: infoData };
      /* Sending event to mfe from AssistanceCostPercentageChart */
      mfeRef?.current?.contentWindow?.postMessage(infoLoadData, '*');
    } catch (error) {
      alert(`AssistanceCostPercentageChart :: ERROR ==> ${error}`);
    }
  }

  const receiver = useCallback((e: any) => {
    if (e.data.mfeCode === '@ffit/custos-assistenciais') {
      switch (e.data?.event) {
        case 'updateSize': {
          setHeight(e.data.info.height);
          break;
        }

        case 'mfe-loaded': {
          getDataMock();
          break;
        }
 
        /* When receiving the requestDate event, a modal with the date 
        picker input is opened */
        case 'requestDate':
          handleOpen();
          break;
      
        default:
          break;
      }
    }
  }, [handleOpen]);

  useEffect(() => {
    window.addEventListener('message', receiver);

    return () => {
      window.removeEventListener('message', receiver);
    };
  }, [receiver]);

  const queryStringObj = {
    'ffit-key': 'i8Nc7C1gYSMz1OgTU9X1DC6tOholr6e7',
    outlined: 'true',
    title: 'Custos Assistenciais',
    externalDatePicker: 'true',
  };
  
  const queryString = new URLSearchParams(queryStringObj).toString();

  return (
    <div style={{
      background:'lightgray',
      width: '100%',
      height: '100%',
      marginBottom: 24,
    }}>

    </div>
  );
}

export { AssistanceCostPercentageChart };
