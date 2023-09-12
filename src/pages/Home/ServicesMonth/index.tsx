import React, { useEffect, useCallback, useRef, useState, CSSProperties } from 'react';
import { useDatePickerModal } from '../../../components/DatePickerModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import moment from 'moment';
import api from '../../../services/api';

function ServicesMonth() {
  const { DatePickerModal, handleOpen, inputValue } = useDatePickerModal();

  /* Starting values for the mfe */
  const [height, setHeight] = useState(42);
  const [heightHome, setHeightHome] = useState(42);
  const [maxHeightModal, setMaxHeightModal] = useState(501);

  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => setOpenDetails(false);

  const mfeRef = useRef<HTMLIFrameElement | null>(null);
  const mfeModalRef = useRef<HTMLIFrameElement | null>(null);

  async function getServicesData(month: string, year: string) {
    try {
      const specificMonth = Number(month) - 1;
      const specificDay = new Date(Number(year), specificMonth + 1, 0);
      const lastDay = specificDay.toString().substring(8, 10);

      const dataInicio = `01/${month}/${year}`;
      const dataFim = `${lastDay}/${month}/${year}`;

      const { data } = await api.post(
        '/servicos/atendimentos-diarios',
        { dataInicio, dataFim },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const getDescription = await api.post(
        '/informativo/servicos',
        { mesRef: dataInicio }
      );

      if (data.retorno.length !== 0 || data.retorno.length !== undefined) {
        const infoList = data.retorno.map((item: any) => ({
          date: moment(item.dataAutorizacao, 'DD/MM/YYYY').toDate(),
          services: item.procedimento.map((proc: any) => ({
            type: proc.descricao || proc.tipo?.descricao,
            quantity: proc.quantidade,
          }))
        }));

        const infoLoadData = { event: 'loadData', info: {
          date: specificDay,
          list: infoList,
        }};

        const infoUpdateLabel = { event: 'updateLabel', info: { 
          label: getDescription.data.retorno || '',
        }};

        return { infoLoadData, infoUpdateLabel };
      }

      return null
    } catch (error) {
      alert(`getServiceData :: ==> ${error}`);
      return null;
    }      
  }

  const onMfeHome = useCallback(async (month: string, year: string) => {
    /* This event sends an event to return to the initial state of mfe */
    mfeRef?.current?.contentWindow?.postMessage({ event: 'handleLoading' }, '*');

    /* Fetching data and creating events to send to mfe */
    const resultData = await getServicesData(month, year);

    if (resultData && mfeRef.current) {
      const { infoLoadData } = resultData;

      mfeRef?.current?.contentWindow?.postMessage(infoLoadData, '*');
    }
  }, [])

  const onMfeModal = useCallback(async (month: string, year: string) => {
    /* This event sends an event to return to the initial state of mfe */
    mfeModalRef?.current?.contentWindow?.postMessage({ event: 'handleLoading' }, '*');

    /* Fetching data and creating events to send to mfe */
    const resultData = await getServicesData(month, year);

    if (resultData && mfeModalRef.current) {
      const { infoLoadData, infoUpdateLabel } = resultData;

      mfeModalRef?.current?.contentWindow?.postMessage(infoLoadData, '*');
      mfeModalRef?.current?.contentWindow?.postMessage(infoUpdateLabel, '*');
    }
  }, [])

  const receiver = useCallback((e: any) => {
    /* Checking ids for same mfes on the same screen */
    if (e.data.mfeId === 'service__1') {
      switch (e.data?.event) {
        case 'updateSize':
          setHeightHome(e.data.info.height);
          break;

        case 'mfe-loaded': {
          const newData = moment();    
          onMfeHome(newData.format('MM'), newData.format('yyyy'));
          break;
        }
  
        case 'requestDate':
          handleOpen();
          break;        
          
        case 'click': {
          handleOpenDetails();

          /* Updating the modal's maxHeight, according to the screen height */
            const element = document.getElementById('modal-id');
            if (element) {
              setMaxHeightModal(
                element.clientHeight
                - 32 // title
                - 25 // divider
                - 48 // button - ok
                - 32 // padding - modal
              );
            }

          break;
        }
      
        default:
          break;
      } 
    }

    if (e.data.mfeId === 'service__2') {
      switch (e.data?.event) {
        case 'updateSize':
          setHeight(e.data.info.height);
          break;

        case 'mfe-loaded': {
          const newData = moment(inputValue);    
          onMfeModal(newData.format('MM'), newData.format('yyyy'));
          break;
        }
  
        case 'requestDate':
          handleOpen();
          break;
      
        default:
          break;
      } 
    }
  }, [handleOpen, inputValue, onMfeHome, onMfeModal]);

  useEffect(() => {
    window.addEventListener('message', receiver);

    return () => {
      window.removeEventListener('message', receiver);
    };
  }, [receiver]);

  /* Parameters used to load mfe servicesOfTheMonth */
  const queryStringObj = {
    'ffit-key': 'i8Nc7C1gYSMz1OgTU9X1DC6tOholr6e7',
    id: 'service__1',
    graphTitle: 'Serviços do Mês',
    hideGraph: 'false',
    hideDetail: 'true',
    hideStatementsButton: 'true',
    hideDatePicker: 'false',
    hideInfo: 'true',
    simpleHeader: 'false',
    enableServiceDetails: 'false',
    hideSubtitlePercentage: 'false',
    outlined: 'true',
    graphColorTheme: 'false',
    externalDatePicker: 'true',
  };

  const queryString = new URLSearchParams(queryStringObj).toString();

  const queryStringModalObj = {
    ...queryStringObj,
    hideDetail: 'false',
    id: 'service__2',
  };

  const queryStringModal = new URLSearchParams(queryStringModalObj).toString();

  return (
    <>
      <iframe
        ref={mfeRef}
        src={`https://mfe.ffit.com.br/mfe/servicos-mes?${queryString}`}
        title="Serviços do Mês"
        style={{ width: '100%', height: heightHome, marginBottom: 20 }}
        frameBorder="0"
      />
      <Modal
        open={openDetails}
        onClose={handleCloseDetails}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box id="modal-id" sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Detalhes dos serviços do mês
          </Typography>
          <div style={styles.divider} />
          <iframe
            ref={mfeModalRef}
            src={`https://mfe.ffit.com.br/mfe/servicos-mes?${queryStringModal}`}
            title="Serviços do Mês"
            style={{ width: '100%', height, maxHeight: maxHeightModal }}
            frameBorder="0"
          />
          <div style={styles.buttonHolder}>
            <Button 
              style={styles.buttonContent}
              variant='contained'
              onClick={handleCloseDetails}
            >
              OK
            </Button>
          </div>
        </Box>
      </Modal>
      <DatePickerModal
        // When you close the modal by clicking save, the new date is reloaded
        // Update both mfes at the same time
        onLoadOnClose={async () => {
          mfeRef?.current
            ?.contentWindow?.postMessage({ event: 'handleLoading' }, '*');
          mfeModalRef?.current
            ?.contentWindow?.postMessage({ event: 'handleLoading' }, '*');
          
          const newDate = inputValue?.set('D', 1);
          if (newDate) {    
            const month = newDate.format('MM');
            const year = newDate.format('yyyy');
            onMfeHome(month, year); onMfeModal(month, year);
          };
        }}
      />
    </>
  );
}

const styles: {
  buttonHolder: CSSProperties,
  buttonContent: CSSProperties,
  divider: CSSProperties,
} = {
  buttonHolder: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonContent: {
    backgroundColor: 'rgb(7, 95, 54)',
    color: 'white',
  },
  divider: {
    height: 1,
    width: '100%',
    margin: '8px 0 16px 0',
    backgroundColor: 'rgba(0,0,0,0.12)'
  },
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};

export { ServicesMonth };
