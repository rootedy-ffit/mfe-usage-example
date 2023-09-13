import React, { CSSProperties } from 'react';
import { Structure } from '../../components/Structure';

import { MonthlyLossRatioChart } from './MonthlyLossRatioChart';
import { CollectivePerformanceChart } from './CollectivePerformanceChart';
import { AssistanceCostPercentageChart } from './AssistanceCostPercentageChart';
import { ServicesMonth } from './ServicesMonth';
import { MedicalProductionReport } from './MedicalProductionReport';

function Home() {
  return (
    <Structure>
      <div style={styles.mfeHolder}>
        <div>Início</div>
        <div style={styles.mfeContainer}>
          <div style={styles.mfeContent}>
            <MonthlyLossRatioChart />
          </div>
          <div style={styles.mfeContent}>
            <CollectivePerformanceChart />
          </div>
        </div>
        <div style={styles.mfeContainer}>
          <div style={styles.mfeContent}>
            <AssistanceCostPercentageChart />
          </div>
          <div style={styles.mfeContent}>
            <ServicesMonth />
          </div>
          <div style={styles.mfeContent}>
            <MedicalProductionReport />
          </div>
        </div>
      </div>
    </Structure>
  );
}

const styles: {
  mfeHolder: CSSProperties,
  mfeContainer: CSSProperties,
  mfeContent: CSSProperties,
} = {
  mfeHolder: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    gap: 24,
    flex: 1,
    padding: 24,
    overflowY: 'auto',
  },
  mfeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 24,
  },
  mfeContent: {
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 24,
  },
}

export default Home;
