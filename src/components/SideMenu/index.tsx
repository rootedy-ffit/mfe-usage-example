import React, { CSSProperties } from 'react';
import backgroundHeaderImg from '../../assets/background-header.png';

import inicioIcon from '../../assets/icons/inicio.svg';
import aDiretoriaIcon from '../../assets/icons/a-diretoria.svg';
import configuracaoIcon from '../../assets/icons/configuracao.svg';
import dadosClinicosIcon from '../../assets/icons/conselho-fiscal.svg';
import guiaIcon from '../../assets/icons/guia.svg';
import formulariosIcon from '../../assets/icons/formularios.svg';
import meusIndicadoresIcon from '../../assets/icons/meus-indicadores.svg';
import noticiasIcon from '../../assets/icons/noticias.svg';
import servicosIcon from '../../assets/icons/servicos.svg';

import { Link } from 'react-router-dom';

function SideMenu() {
  return (
    <div style={styles.sideMenuHolder}>
      <div style={styles.backgroundHeaderHolder}>
        <img
          src={backgroundHeaderImg}
          className="Unimed-background"
          alt="background"
        />
        <div style={styles.profileHolder}>
          <span style={styles.profileText}>CESAR AUGUSTO DO VALE</span>
          <span style={styles.profileText}>Cirurgia Pediátrica</span>
        </div>
      </div>
      <div style={styles.sideMenuContainer}>
        <div style={styles.menuHolder}>
          <div style={styles.imgHolder}>  
            <img
              src={inicioIcon}
              alt="Inicio Icon"
            />
          </div>
          <Link to={'/home'} style={styles.menuText}>
            Início
          </Link>
        </div>
        <div style={styles.menuHolder}>
          <div style={styles.imgHolder}>  
            <img
              src={dadosClinicosIcon}
              alt="Dados clínicos Icon"
            />
          </div>
          <span style={styles.menuText}>
            Dados clínicos
          </span>
        </div>
        <div style={styles.menuHolder}>
          <div style={styles.imgHolder}>  
            <img
              src={formulariosIcon}
              alt="Formulário Icon"
            />
          </div>
          <Link to={'/forms'} style={styles.menuText}>
            Formulários
          </Link>
        </div>
        <div style={styles.menuHolder}>
          <div style={styles.imgHolder}>  
            <img
              src={aDiretoriaIcon}
              alt="A Diretoria Icon"
            />
          </div>
          <span style={styles.menuText}>
            A Diretoria
          </span>
        </div>
        <div style={styles.menuHolder}>
          <div style={styles.imgHolder}>  
            <img
              src={meusIndicadoresIcon}
              alt="Meus Indicadores Icon"
            />
          </div>
          <span style={styles.menuText}>
            Meus Indicadores
          </span>
        </div>
        <div style={styles.menuHolder}>
          <div style={styles.imgHolder}>  
            <img
              src={servicosIcon}
              alt="Serviços Icon"
            />
          </div>
          <span style={styles.menuText}>
            Serviços
          </span>
        </div>
        <div style={styles.menuHolder}>
          <div style={styles.imgHolder}>  
            <img
              src={noticiasIcon}
              alt="Notícias Icon"
            />
          </div>
          <span style={styles.menuText}>
            Notícias
          </span>
        </div>
        <div style={styles.menuHolder}>
          <div style={styles.imgHolder}>  
            <img
              src={guiaIcon}
              alt="Guia Icon"
            />
          </div>
          <span style={styles.menuText}>
            Guia
          </span>
        </div>
        <div style={styles.menuHolder}>
          <div style={styles.imgHolder}>  
            <img
              src={configuracaoIcon}
              alt="Configurações Icon"
            />
          </div>
          <span style={styles.menuText}>
            Configurações
          </span>
        </div>
      </div>
    </div>
  );
}

const styles: {
  sideMenuHolder: CSSProperties,
  sideMenuContainer: CSSProperties,
  backgroundHeaderHolder: CSSProperties,
  profileHolder: CSSProperties,
  profileText: CSSProperties,
  imgHolder: CSSProperties,
  menuHolder: CSSProperties,
  menuText: CSSProperties,
} = {
  sideMenuHolder: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(90, 64, 115, 1)',
    width: 226,
  },
  sideMenuContainer: {
    padding: '16px 0 0 8px'
  },
  backgroundHeaderHolder: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
  },
  profileHolder: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 4,
    marginTop: -72,
  },
  profileText: {
    color: 'white',
  },
  imgHolder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
  },
  menuHolder: {
    marginTop: 16,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  menuText: {
    color: 'rgba(90, 64, 115, 1)',
    fontWeight: 500,
    textDecoration: 'none',
  },
}

export { SideMenu };
