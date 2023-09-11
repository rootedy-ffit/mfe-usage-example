import React, { CSSProperties } from 'react';
import logo from '../../assets/unimed.png';
import notifications from '../../assets/notifications.svg';

function Header() {
  return (
    <div style={styles.headerHolder}>
      <img
        src={logo}
        className="Unimed-logo"
        alt="logo" 
        style={styles.logo}
      />
      <div style={styles.navHolder}>
        <img
          src={notifications}
          alt="notifications" 
          style={styles.notificationIcon}
        />
        <div style={styles.caracterHolder}>
          <span style={styles.caracterText}>A</span>
        </div>
      </div>
    </div>
  );
}

const styles: {
  headerHolder: CSSProperties,
  logo: CSSProperties,
  notificationIcon: CSSProperties,
  loginHolder: CSSProperties,
  navHolder: CSSProperties,
  caracterHolder: CSSProperties,
  caracterText: CSSProperties,
} = {
  headerHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    background: '#3E1E5D',
    padding: '0 32px',
  },
  logo: {
    width: 131,
    height: 50,
    objectFit: 'contain',
  },
  notificationIcon: {
    width: 30,
    height: 30,
    objectFit: 'contain',
  },
  loginHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24,
    minHeight: 414,
    minWidth: 408,
    background: 'white',
  },
  caracterHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10, 137, 78, 1)',
  },
  caracterText: {
    fontSize: 20,
    lineHeight: 24,
    color: 'white',
  },
  navHolder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 32,
  }
}

export { Header };
