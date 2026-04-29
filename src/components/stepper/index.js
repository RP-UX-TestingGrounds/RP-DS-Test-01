import React from 'react';
import {
  Step,
  StepLabel,
  Stepper as MuiStepper,
  styled,
} from '@mui/material';
import { Check } from '@mui/icons-material';
import PropTypes from 'prop-types';

const STEP_ICON_STATE = {
  completed: 'completed',
  active: 'active',
  default: 'default',
};

const STEP_ICON_BACKGROUND_COLOR = {
  [STEP_ICON_STATE.completed]: 'var(--success-main)',
  [STEP_ICON_STATE.active]: 'var(--primary-main)',
  [STEP_ICON_STATE.default]: 'var(--default-main)',
};

const STEP_ICON_COLOR = {
  [STEP_ICON_STATE.completed]: 'var(--on-success)',
  [STEP_ICON_STATE.active]: 'var(--on-primary)',
  [STEP_ICON_STATE.default]: 'var(--on-default)',
};

const ACTIVE_LABEL_STATES = [STEP_ICON_STATE.active, STEP_ICON_STATE.completed];

/* Place any props that should not be forwarded to the styled component here */
const STYLED_PROPS = ['stepState'];

function getStepState(stepIndex, activeStepIndex) {
  if (stepIndex < activeStepIndex) return STEP_ICON_STATE.completed;
  if (stepIndex === activeStepIndex) return STEP_ICON_STATE.active;
  return STEP_ICON_STATE.default;
}

const StyledStepIcon = styled('span', {
  shouldForwardProp: (prop) => !STYLED_PROPS.includes(prop),
})(({ stepState }) => ({
  alignItems: 'center',
  backgroundColor: STEP_ICON_BACKGROUND_COLOR[stepState],
  borderRadius: 'var(--radius-circle)',
  color: STEP_ICON_COLOR[stepState],
  display: 'flex',
  fontSize: 'var(--typography-body-sm-font-size)',
  fontWeight: 'var(--font-weight-medium)',
  height: 'var(--spacing-24)',
  justifyContent: 'center',
  width: 'var(--spacing-24)',
}));

const StyledCheckIcon = styled(Check)({
  color: 'var(--on-success)',
  fontSize: 'var(--typography-title-sm-font-size)',
});

function StepIcon({ active, completed, icon }) {
  let stepState = STEP_ICON_STATE.default;
  if (completed) stepState = STEP_ICON_STATE.completed;
  else if (active) stepState = STEP_ICON_STATE.active;

  return (
    <StyledStepIcon stepState={stepState}>
      {completed ? <StyledCheckIcon /> : icon}
    </StyledStepIcon>
  );
}

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const StyledStepLabel = styled(StepLabel, {
  shouldForwardProp: (prop) => !STYLED_PROPS.includes(prop),
})(({ stepState }) => ({
  '& .MuiStepLabel-label': {
    color: ACTIVE_LABEL_STATES.includes(stepState) ? 'var(--text-primary)' : 'var(--text-secondary)',
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--typography-body-sm-font-size)',
    fontWeight: 'var(--font-weight-regular)',
    '&.Mui-active, &.Mui-completed': {
      fontWeight: 'var(--font-weight-regular)',
    },
  },
}));

/**
 * Horizontal stepper showing progress through numbered steps.
 * Completed: green circle + checkmark. Active: blue circle + number. Pending: grey circle + number.
 */
function Stepper({
  activeStep = 0,
  steps,
  testId,
  ...rest
}) {
  return (
    <MuiStepper
      activeStep={activeStep}
      data-test-id={testId}
      {...rest}
    >
      {steps.map((label, index) => {
        const stepState = getStepState(index, activeStep);
        return (
          <Step key={index} completed={stepState === STEP_ICON_STATE.completed}>
            <StyledStepLabel
              slots={{ stepIcon: StepIcon }}
              stepState={stepState}
            >
              {label}
            </StyledStepLabel>
          </Step>
        );
      })}
    </MuiStepper>
  );
}

Stepper.propTypes = {
  activeStep: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  testId: PropTypes.string,
};

export default Stepper;
