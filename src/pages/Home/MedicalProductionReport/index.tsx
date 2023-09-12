import React, { CSSProperties } from 'react';
import Button from '@mui/material/Button';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { useDatePickerModal } from '../../../components/DatePickerModal';
import meusIndicadoresIcon from '../../../assets/icons/meus-indicadores-white.svg';
import { useNavigate } from "react-router-dom";

import 'moment/locale/pt-br';
moment.locale('pt-br');

function MedicalProductionReport() {
  const navigate = useNavigate();

  /* calling modal datepicker component */
  const { DatePickerModal, handleOpen, inputValue } = useDatePickerModal();

  return (
    <div style={styles.mfeHolder}>
      <div style={styles.mfeHeader}>
        <img
          src={meusIndicadoresIcon}
          alt="Meus Indicadores Icon"
        />
        <span>Relatório de Produção Médica</span>
      </div>
      <div style={styles.mfeContainer}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            open={false}
            onOpen={handleOpen}
            label={'Mês e dia'}
            value={inputValue}
            views={['month', 'year']}
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true,
                variant: 'filled',
              },
            }}
          />
        </LocalizationProvider>
        <Button 
          variant='contained'
          style={styles.buttonContent}
          onClick={() => navigate('/pdf/CONTRACHEQUE')}
        >
          CONTRACHEQUE
        </Button>
        <Button
          variant='contained'
          style={styles.buttonContent}
          onClick={() => navigate('/pdf/DEMONSTRATIVO')}
        >
          DEMONSTRATIVO
        </Button>
      </div>
      <span style={styles.textHelper}>
        * Selecione o mês desejado
      </span>
      <DatePickerModal />
    </div>
  );
}

const styles: {
  mfeHolder: CSSProperties,
  mfeHeader: CSSProperties,
  mfeContainer: CSSProperties,
  buttonContent: CSSProperties,
  textHelper: CSSProperties,
} = {
  mfeHolder: {
    display: 'flex',
    flexDirection: 'column',
    height: '290px',
    width: '100%',
    gap: 20,
    border: '1px solid #3E1E5D',
    borderRadius: 4,
  },
  mfeHeader: {
    height: 36,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#3E1E5D',
    color: 'white',
    fontWeight: '500',
    lineHeight: 27,
    gap: 10
  },
  mfeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    padding: 4,
  },
  buttonContent: {
    width: 160,
    backgroundColor: 'rgb(7, 95, 54)',
    color: 'white',
  },
  textHelper: {
    textAlign: 'center',
    color: 'rgba(0,0,0,0.6)'
  }
}

export { MedicalProductionReport };
