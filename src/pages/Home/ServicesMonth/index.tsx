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


  return (
    <div style={{
      background:'lightgray',
      width: '100%',
      height: '100%',
      minHeight: 360,
    }}>

    </div>
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
