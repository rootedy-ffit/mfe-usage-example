import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment, { Moment } from 'moment';

import 'moment/locale/pt-br';
moment.locale('pt-br');

export function useDatePickerModal() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<Moment | null>(moment());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onChange = (newValue: any) => setInputValue(newValue);

  return ({
    inputValue,
    handleOpen,
    handleClose,
    DatePickerModal({ onLoadOnClose }: any) {
      if (!open) { return null; }

      return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label={'Mês e dia'}
                value={inputValue}
                onChange={onChange}
                openTo="month"
                views={['month', 'year']}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant='contained'
                style={{ marginTop: 12 }}
                onClick={() => {
                  handleClose();
                  onLoadOnClose?.();
                }}
              >
                SALVAR
              </Button>
            </div>
          </Box>
        </Modal>
      );
    },
  });
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};