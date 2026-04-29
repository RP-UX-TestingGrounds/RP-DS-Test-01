import React, { Fragment, useState } from 'react';
import { Star } from '@mui/icons-material';

import Dimmer from './index';
import Spinner from '../spinner';

export default {
  title: 'Components/Dimmer',
  tags: ['autodocs'],
  component: ({
    active: argsActive,
    ...rest
  }) => {
    const [active, setActive] = useState(argsActive);
    const handleClick = () => {
      setActive(!active);
    };

    return (
      <Fragment>
        <button onClick={handleClick}>Toggle</button>
        <Dimmer
          active={active}
          onClick={handleClick}
          {...rest}
        >
          <h1>Dimmer Content</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            vehicula, nunc nec bibendum fringilla, nunc nisi aliquet nunc,
            vitae aliquam nunc nisi euismod nunc. Donec vehicula, nunc nec
            bibendum fringilla, nunc nisi aliquet nunc, vitae aliquam nunc
            nisi euismod nunc. Donec vehicula, nunc nec bibendum fringilla,
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            vehicula, nunc nec bibendum fringilla, nunc nisi aliquet nunc,
            vitae aliquam nunc nisi euismod nunc. Donec vehicula, nunc nec
            bibendum fringilla, nunc nisi aliquet nunc, vitae aliquam nunc
            nisi euismod nunc. Donec vehicula, nunc nec bibendum fringilla,
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            vehicula, nunc nec bibendum fringilla, nunc nisi aliquet nunc,
            vitae aliquam nunc nisi euismod nunc. Donec vehicula, nunc nec
            bibendum fringilla, nunc nisi aliquet nunc, vitae aliquam nunc
            nisi euismod nunc. Donec vehicula, nunc nec bibendum fringilla,
          </p>
        </Dimmer>

        <h2>Content Outside Dimmer</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          vehicula, nunc nec bibendum fringilla, nunc nisi aliquet nunc,
          vitae aliquam nunc nisi euismod nunc. Donec vehicula, nunc nec
          bibendum fringilla, nunc nisi aliquet nunc, vitae aliquam nunc
          nisi euismod nunc. Donec vehicula, nunc nec bibendum fringilla,
        </p>
      </Fragment>
    );
  },
};

export const Primary = {
  args: {
    active: false,
  },
};

export const Dimmed = {
  args: {
    active: true,
  },
};

export const WithLargeSpinner = {
  args: {
    active: true,
    spinner: <Spinner size="large" />,
  },
};

export const WithCustomSpinner = {
  args: {
    active: true,
    spinner: (
      <div
        style={{
          fontSize: '2em',
          fontWeight: 'bold',
        }}
      >
        <Star /> Custom Spinner! <Star />
      </div>
    ),
  },
};

export const WithNoSpinner = {
  args: {
    active: true,
    spinner: null,
  },
};

export const AppLevel = {
  args: {
    active: false,
    strata: 'app',
    spinner: <Spinner size="huge" />,
  },
};
