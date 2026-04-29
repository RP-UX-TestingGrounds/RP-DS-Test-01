import React, {
  useState,
  useCallback,
  Fragment,
} from 'react';
import { action } from 'storybook/actions';

import Tabs from '../../components/tabs';
import Tab from '../../components/tab';
import TabPanel from '../../components/tab-panel';
import MenuButton from '../../components/menu-button';
import { generateMenuItems } from '../../components/menu-button/menu-items-helper';

export default {
  title: 'Examples/Tabs',
  tags: [],
};

export const BasicUsage = {
  render: () => {
    const [selectedTabPanel, setSelectedTabPanel] = useState(0);

    const handleTabChange = useCallback((_e, newSelectedTab) => {
      setSelectedTabPanel(newSelectedTab);
    }, [setSelectedTabPanel]);

    return (
      <Fragment>
        <Tabs
          indicatorColor="primary"
          handleTabChange={handleTabChange}
          selectedTabPanel={selectedTabPanel}
        >
          <Tab
            key={'tab-0'}
            label={'Tab 1'}
            index={0}
          />
          <Tab
            key={'tab-1'}
            label={'Tab 2'}
            index={1}
          />
        </Tabs>
        <div>
          <TabPanel
            key={'tab-panel-0'}
            value={selectedTabPanel}
            index={0}
          >
            <div>
              <p>
                Tab 1 content
              </p>
            </div>
          </TabPanel>
          <TabPanel
            key={'tab-panel-1'}
            value={selectedTabPanel}
            index={1}
          >
            <div>
              <p>
                Tab 2 content
              </p>
            </div>
          </TabPanel>
        </div>
      </Fragment>
    );
  },
};

export const DynamicTabs = {
  args: {
    tabCount: 6,
  },
  render: ({ tabCount }) => {
    const [selectedTabPanel, setSelectedTabPanel] = useState(0);

    const handleTabChange = useCallback((_e, newSelectedTab) => {
      setSelectedTabPanel(newSelectedTab);
    }, [setSelectedTabPanel]);

    const tabs = new Array(tabCount).fill()
      .map((_, index) => {
        const label = `This is Tab ${index + 1}`;
        const badge = '';
        const disabled = false;

        return {
          label,
          key: `tab-${index}`,
          badge,
          disabled,
        };
      });

    return (
      <Fragment>
        <Tabs
          handleTabChange={handleTabChange}
          selectedTabPanel={selectedTabPanel}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.key}
              testId={`tab-${tab.key}`}
              badge={tab.badge}
              label={tab.label}
              disabled={tab.disabled}
              index={index}
            />
          ))}
        </Tabs>
        <div>
          {tabs.map((tab, index) => (
            <TabPanel
              key={tab.key}
              value={selectedTabPanel}
              index={index}
            >
              <div>
                <p>
                  Tab content for the &quot;{tab.label}&quot; tab
                </p>
              </div>
            </TabPanel>
          ))}
        </div>
      </Fragment>
    );
  },
};

export const Advanced = {
  args: {
    controls: true,
  },
  render: ({ controls }) => {
    const [selectedTabPanel, setSelectedTabPanel] = useState(0);

    const handleTabChange = useCallback((_e, newSelectedTab) => {
      setSelectedTabPanel(newSelectedTab);
    }, [setSelectedTabPanel]);

    const tabConfig = [
      {
        label: 'New',
        badge: '5',
        disabled: false,
      },
      {
        label: 'Awaiting Payment',
        badge: '7',
        disabled: false,
      },
      {
        label: 'Disabled',
        disabled: true,
      },
      {
        label: 'In Progress',
        badge: '5',
        disabled: false,
      },
    ];

    const tabs = tabConfig.map((tab, index) => {
      return {
        label: tab.label,
        key: `tab-${index}`,
        badge: tab.badge,
        disabled: tab.disabled,
      };
    });

    const handleActionClick = (item) => {
      action('action clicked')(item);
    };

    const tabControls = controls && (
      <MenuButton
        items={generateMenuItems('actions')}
        variant="text"
        color="primary"
        size="medium"
        placeholder="Actions"
        onChange={handleActionClick}
      />
    );

    return (
      <Fragment>
        <Tabs
          handleTabChange={handleTabChange}
          selectedTabPanel={selectedTabPanel}
          controls={tabControls}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.key}
              testId={`tab-${tab.key}`}
              badge={tab.badge}
              label={tab.label}
              disabled={tab.disabled}
              index={index}
            />
          ))}
        </Tabs>
        <div>
          {tabs.map((tab, index) => (
            <TabPanel
              key={tab.key}
              value={selectedTabPanel}
              index={index}
            >
              <div>
                <p>
                  Tab content for the &quot;{tab.label}&quot; tab
                </p>
              </div>
            </TabPanel>
          ))}
        </div>
      </Fragment>
    );
  },
};
