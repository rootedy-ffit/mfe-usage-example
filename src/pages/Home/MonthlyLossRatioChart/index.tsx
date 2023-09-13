import React, { useRef, useEffect, useCallback, useState } from 'react';
import api from '../../../services/api';

function MonthlyLossRatioChart() {
  const [height, setHeight] = useState(0);
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

export { MonthlyLossRatioChart };