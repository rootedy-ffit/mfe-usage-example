import React, { useEffect, useCallback, useRef, useState } from 'react';
import api from '../../../services/api';

function CollectivePerformanceChart() {
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

export { CollectivePerformanceChart };
