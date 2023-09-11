import React, { CSSProperties } from 'react';
import { Header } from '../../components/Header';
import { SideMenu } from '../../components/SideMenu';

function Structure({ children }: any) {
  return (
    <>
      <Header />
      <div style={styles.pageHolder}>
        <SideMenu />
        <div style={styles.homeHolder}>
          {children}
        </div>
      </div>
    </>
  );
}

const styles: {
  pageHolder: CSSProperties,
  homeHolder: CSSProperties,
} = {
  pageHolder: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 'calc(100% - 64px)',
    background: 'white',
    position: 'fixed',
  },
  homeHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflowY: 'auto'
  }
}

export { Structure };
