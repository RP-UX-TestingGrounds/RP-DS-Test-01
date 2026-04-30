import React from 'react';
import Button from './';
import figma from '@figma/code-connect';

figma.connect(
  Button,
  'https://www.figma.com/design/ldmYpFQZYObWEBvdAmK31K/RP-Design-System-3.0--MUI-6.1.0-?node-id=6543-36744&m=dev',
  {
    props: {
      label: figma.string('Label'),
      icon: figma.boolean('Start Icon', {
        true: figma.instance('↳ Start Icon'),
        false: undefined,
      }),
    },
    example: ({ label, icon }) => (
      <Button icon={icon}>{label}</Button>
    ),
  }
);