import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

// Components
import {
  Toolbar,
  ColumnsPanelTrigger,
  ToolbarButton,
  FilterPanelTrigger,
  QuickFilterTrigger,
  QuickFilter,
  QuickFilterControl,
} from '@mui/x-data-grid-pro';
import {
  Search,
  ViewColumnRounded,
  FilterAlt,
} from '@mui/icons-material';
import SearchTextField from '../search-text-field';
import Button from '../button';
import ActionsMenu from './actions-menu';

const defaultTranslation = (key) => {
  return `—${key}—`;
};

// Styling the toolbar so that we have tooltips on both left and right sides of the toolbar
const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const ButtonGroup = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-md)',
});

const IconGroup = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
});

const ToolbarButtonContent = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--spacing-xs)',
});

const ToolbarButtonLabel = styled('span')({
  color: 'var(--primary-main)',
  fontFamily: 'var(--font-family)',
  fontSize: 'var(--button-font-size-medium)',
  fontStyle: 'normal',
  fontWeight: 'var(--font-weight-regular)',
  lineHeight: 'var(--line-height-md)',
  textTransform: 'capitalize',
});

// Ensure that the search button and search text field appear and disappear according to the QuickFilter state
const StyledSearchButton = styled(Button)(({ theme, ownerState }) => ({
  opacity: ownerState.expanded ? 0 : 1,
  pointerEvents: ownerState.expanded ? 'none' : 'auto',
  overflow: 'hidden',
  maxWidth: ownerState.expanded ? '0' : '100%',
  minWidth: '0',
  transition: theme.transitions.create(['opacity']),

  '&.MuiButtonBase-root': {
    padding: ownerState.expanded ? '0' : undefined,
  },
}));

const StyledSearchTextField = styled(SearchTextField)(({ theme, ownerState }) => ({
  opacity: ownerState.expanded ? 1 : 0,
  width: '100%',
  maxWidth: ownerState.expanded ? '100%' : '0',
  transition: theme.transitions.create(['max-width']),
}));

/**
 * SearchFilter - Renders the quick filter search functionality
 */
const SearchFilter = ({ testId, translate }) => {
  return (
    <QuickFilter style={{ display: 'flex', alignItems: 'center' }}>
      <QuickFilterTrigger
        render={(triggerProps, state) => (
            <ToolbarButton
              ownerState={{ expanded: state.expanded }}
              render={
                <StyledSearchButton
                  testId={`${testId}_search-button`}
                  ownerState={{ expanded: state.expanded }}
                  icon={<Search fontSize="small" />}
                  iconPosition="start"
                  variant="text"
                  title={translate('search')}
                  {...triggerProps}
                >
                  {translate('search')}
                </StyledSearchButton>
              }
            />
        )}
      />
      <QuickFilterControl
        render={(props, state) => {
          /* eslint-disable react/prop-types */
          const { onChange } = props;
          const { slotProps, ...inputProps } = props;
          /* eslint-enable react/prop-types */
          const mergedSlotProps = {
            htmlInput: {
              // eslint-disable-next-line react/prop-types
              ...slotProps?.htmlInput,
              ...inputProps,
            },
          };

          return (
            <StyledSearchTextField
              ownerState={{ expanded: state.expanded }}
              size="small"
              id={`${testId}_search-input`}
              testId={`${testId}_search-input`}
              onClear={() => onChange({ target: { value: '' } })}
              autoFocus={true}
              placeholder={translate('search')}
              slotProps={mergedSlotProps}
            />
          );
        }}
      />
    </QuickFilter>
  );
};

SearchFilter.propTypes = {
  testId: PropTypes.string,
  translate: PropTypes.func.isRequired,
};

/**
 *
 * @param selectedRows - The selected row IDs in the data grid
 * @param actionItems - An array of action items to display in the action menu (label and value)
 * @param onActionItemClick - Callback function when an action item is clicked
 * @param testId - Test ID for the toolbar elements
 * @param translate - Translation function for internationalization
 */
export default function DataGridToolbar({
  selectedRows = [],
  actionItems = [],
  onActionItemClick = () => {},
  testId = '',
  disableToolbarFilterButton = false,
  showToolbarButtonLabels = true,
  translate = defaultTranslation,
}) {
  return (
        <StyledToolbar>
            <ButtonGroup>
              {/* Only render the actions menu if there are selected rows and action items */}
              {selectedRows?.length > 0 && actionItems?.length > 0 && (
                <ActionsMenu
                    selectedRows={selectedRows}
                  actionItems={actionItems}
                  onActionItemClick={onActionItemClick}
                  testId={testId}
                  translate={translate}
                />
              )}
              <SearchFilter testId={testId} translate={translate}/>
            </ButtonGroup>
            <IconGroup>
              {!disableToolbarFilterButton && (
                <FilterPanelTrigger
                  render={(props) => (
                    <ToolbarButton
                      {...props}
                      testId={`${testId}_filter-button`}
                      title={translate('filter')}
                    >
                      <ToolbarButtonContent>
                        <FilterAlt fontSize="small" />
                        {showToolbarButtonLabels ? (
                          <ToolbarButtonLabel>{translate('filter')}</ToolbarButtonLabel>
                        ) : null}
                      </ToolbarButtonContent>
                    </ToolbarButton>
                  )}
                />
              )}
              <ColumnsPanelTrigger
                render={(props) => (
                  <ToolbarButton
                    {...props}
                    testId={`${testId}_columns-button`}
                    title={translate('columns')}
                  >
                    <ToolbarButtonContent>
                      <ViewColumnRounded fontSize="small"/>
                      {showToolbarButtonLabels ? (
                        <ToolbarButtonLabel>{translate('columns')}</ToolbarButtonLabel>
                      ) : null}
                    </ToolbarButtonContent>
                  </ToolbarButton>
                )}
              />
            </IconGroup>
        </StyledToolbar>
  );
}

DataGridToolbar.propTypes = {
  selectedRows: PropTypes.array,
  actionItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      disabled: PropTypes.bool,
      icon: PropTypes.node,
    }),
  ),
  onActionItemClick: PropTypes.func,
  testId: PropTypes.string,
  translate: PropTypes.func,
  disableToolbarFilterButton: PropTypes.bool,
  showToolbarButtonLabels: PropTypes.bool,
};
