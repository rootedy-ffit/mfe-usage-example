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
      
      /* Is checking if the `newDate`
      parameter is falsy (undefined, null, or empty). If it is falsy, it makes
      an API request to `/producoes/ultima-data` to get the last date. The
      result of this API request is stored in the `resultLastDate` variable.
      This logic is used to determine whether to use the `newDate` parameter or
      fetch the last date from the API if `newDate` is not provided. */
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
      setTimeout(() => {
        /* Sending event to mfe from AssistanceCostPercentageChart */
        mfeRef?.current?.contentWindow?.postMessage(infoLoadData, '*');
      }, 100);
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
    'ffit-key': 'k6Q4yijDxm6w8QEzIZ1P9Bh8VJswZWXv',
    simpleHeader: 'false',
    outlined: 'true',
    title: 'Custos Assistenciais',
    graphColorTheme: 'false',
    hideInput: 'false',
    externalDatePicker: 'true',
  };
  
  const queryString = new URLSearchParams(queryStringObj).toString();

  return (
    <div>
      <iframe
        ref={mfeRef}
        src={`https://mfe.ffit.com.br/mfe/custos-assistenciais?${queryString}`}
        title="Custos Assistenciais"
        style={{ width: '100%', height, marginBottom: 20 }}
        frameBorder="0"
        aria-hidden="true"
        srcDoc={`<!DOCTYPE html><span>Carregando...</span>`}
        onLoad={() => setTimeout(() => {
          mfeRef?.current?.removeAttribute('srcDoc');
        }, 200)}
      />
      <DatePickerModal
        // When you close the modal by clicking save, the new date is reloaded
        onLoadOnClose={async () => {
          const newDate = inputValue?.set('D', 1).format('DD/MM/yyyy');
          getDataMock(newDate, true);
        }}
      />
    </div>
  );
}

export { AssistanceCostPercentageChart };
