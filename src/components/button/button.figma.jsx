import React from 'react';
import Button from './';
import figma from '@figma/code-connect';

figma.connect(
  Button,
  'https://www.figma.com/design/ldmYpFQZYObWEBvdAmK31K/RP-Design-System-3.0--MUI-6.1.0-?node-id=6543-36744&m=dev',
  {
    props: {
      label: figma.string('Label'),

      // rp-ui collapses Start/End Icon into one icon prop + iconPosition
      icon: figma.boolean('Start Icon', {
        true: figma.instance('↳ Start Icon'),
        false: figma.boolean('End Icon', {
          true: figma.instance('↳ End Icon'),
          false: undefined,
        }),
      }),
      iconPosition: figma.boolean('End Icon', {
        true: 'end',
        false: 'start',
      }),
    },
    example: ({ label, icon, iconPosition }) => (
      <Button icon={icon} iconPosition={iconPosition}>
        {label}
      </Button>
    ),
  }
);