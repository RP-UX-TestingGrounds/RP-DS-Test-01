import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import ANIMATIONS from './animation-constants';

/**
 * Icon component that renders SVG icons from the icon constants.
 * @ignore
 *
 * @param {Object} props - Component props
 * @param {keyof typeof SVG_ICONS} props.name - The name of the icon to render
 * @param {number} [props.width=24] - Width of the icon in pixels (height will match)
 * @param {string} [props.fill='var(--primary-color)'] - Fill color of the icon
 * @param {Object} [props.rest] - Additional props passed to the SVG element
 * @returns {React.ReactElement|null} The rendered icon or null if name is invalid
 */
export default function Animation({
  name,
  width = 24,
  autoplay = true,
  ...rest
}) {
  if (!ANIMATIONS[name]) {
    return null;
  }

  const animationData = ANIMATIONS[name];

  const defaultOptions = {
    loop: true,
    autoplay,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      width={width}
      isClickToPauseDisabled={true}
      {...rest}
    />
  );
}

Animation.propTypes = {
  name: PropTypes.oneOf(Object.keys(ANIMATIONS)).isRequired,
  width: PropTypes.number,
  autoplay: PropTypes.bool,
};
