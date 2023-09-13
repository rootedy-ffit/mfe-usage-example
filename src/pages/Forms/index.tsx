import React, { CSSProperties, useRef } from 'react';
import { Structure } from '../../components/Structure';

function Forms() {
  const mfeRef = useRef<HTMLIFrameElement | null>(null);

  return (
    <Structure>
      <div style={styles.mfeHolder}>
        <div>Formulários</div>
        <div style={styles.mfeContainer}>
        </div>
      </div>
    </Structure>
  );
}

const styles: {
  mfeHolder: CSSProperties,
  mfeContainer: CSSProperties,
} = {
  mfeHolder: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    gap: 24,
    flex: 1,
    padding: 24,
  },
  mfeContainer: {
    display: 'flex',
    flex: 1,
    background: 'lightgray',
  },
}

export default Forms;
