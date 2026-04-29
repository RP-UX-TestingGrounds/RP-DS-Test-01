import React, {
  useRef,
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { ToolbarButton } from '@mui/x-data-grid-pro';
import { KeyboardArrowDownRounded } from '@mui/icons-material';

// Components
import Button from '../button';
import Menu from '../menu';

export default function ActionsMenu({
  selectedRows,
  actionItems,
  onActionItemClick,
  testId,
  translate,
}) {
  const actionMenuAnchorRef = useRef(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  const handleActionItemClick = useCallback((target) => {
    if (onActionItemClick) {
      onActionItemClick(target?.value, selectedRows);
    }
  }, [selectedRows, onActionItemClick]);

  return (
    <div ref={actionMenuAnchorRef}>
        <ToolbarButton
          render={
            <Button
              testId={`${testId}_actions-button`}
              icon={<KeyboardArrowDownRounded />}
              iconPosition="end"
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => setActionMenuOpen(true)}
              title={translate('actions')}
            >
              {translate('actions')}
            </Button>
          }
        >
        </ToolbarButton>
        <Menu
          testId={`${testId}_actions-menu`}
          anchorElement={actionMenuAnchorRef.current}
          items={actionItems}
          onItemClick={handleActionItemClick}
          onClose={() => setActionMenuOpen(false)}
          open={actionMenuOpen}
        />
    </div>
  );
}

ActionsMenu.propTypes = {
  selectedRows: PropTypes.array,
  actionItems: PropTypes.array,
  onActionItemClick: PropTypes.func,
  testId: PropTypes.string,
  translate: PropTypes.func.isRequired,
};
