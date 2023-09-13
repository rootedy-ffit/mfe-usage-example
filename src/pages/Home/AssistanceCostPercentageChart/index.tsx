import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useDatePickerModal } from '../../../components/DatePickerModal';
import api from '../../../services/api';

const randomIntFromInterval = () => Math.floor(Math.random() * (3 - 1 + 1) + 1);

function AssistanceCostPercentageChart() {
  const [height, setHeight] = useState(42);

  /* calling modal datepicker component */
  const { DatePickerModal, handleOpen, inputValue } = useDatePickerModal();

  const mfeRef = useRef<HTMLIFrameElement | null>(null);

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

export { AssistanceCostPercentageChart };
