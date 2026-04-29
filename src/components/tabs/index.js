import React, {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

// Components
import { Tabs as MuiTabsBase, styled } from '@mui/material';

// Styles
import styles from './tabs.css';

const StyledTabs = styled(MuiTabsBase)({
  '& .MuiTabs-indicator': {
    height: 'var(--tabs-indicator-height)',
    backgroundColor: 'var(--primary-main)',
  },
});

export default function Tabs({
  testId,
  handleTabChange,
  children,
  selectedTabPanel,
  controls,
}) {
  // This dumb code fixes an issue in material ui where the tab indicator does not show up on the first render
  // todo[mui5]: check this after MUI v5 update
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('resize'));
  }, []);

  return (
    <div className={styles.tabs}>
      <div
        className={styles.container}
        data-test-id={`tabs-${testId || 'tabs-container'}`}
      >
        <div className={styles.tabs}>
          <StyledTabs
            indicatorColor="primary"
            onChange={handleTabChange}
            value={selectedTabPanel}
            variant="scrollable"
          >
            {children}
          </StyledTabs>
        </div>
        {controls && (
            <div className={styles.controls}>
              {controls}
            </div>
        )}
      </div>
      <div className={styles.divider} />
    </div>
  );
}

Tabs.propTypes = {
  children: PropTypes.node,
  handleTabChange: PropTypes.func,
  selectedTabPanel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  testId: PropTypes.string,
  controls: PropTypes.node,
};
