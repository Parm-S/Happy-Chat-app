import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

// define the base styles of the component
const baseStyle = {
  borderRadius: 'xl', // add a border radius
  fontWeight: 'medium', // change the font weight
};

// define custom sizes
const sizes = {
  sm: defineStyle({
    maxW: '45ch',
    p: '4',
  }),
  md: defineStyle({
    maxW: 'container.sm',
    p: '6',
    fontSize: 'lg',
  }),
  lg: defineStyle({
    maxW: '75ch',
    p: '8',
    fontSize: 'xl',
  }),
};

// define styles for the custom variants
const colorfulVariant = defineStyle(props => {
  const { colorScheme: c } = props; // add color scheme as a prop
  return {
    _light: {
      bg: `${c}.200`,
      color: `${c}.800`,
    },
    _dark: {
      bg: `${c}.700`,
      color: `${c}.200`,
    },
  };
});

const boldVariant = defineStyle(props => {
  return {
    borderRadius: 'none',
    border: '2px solid',
    fontFamily: 'Poppins, sans-serif',
    _light: {
      bg: 'white',
      color: 'black',
    },
    _dark: {
      bg: 'black',
      color: 'white',
    },
  };
});

// define the custom variants
const variants = {
  colorful: colorfulVariant,
  bold: boldVariant,
};

// define which sizes, variants, and color schemes are applied by default
const defaultProps = {
  size: 'md',
  variant: 'colorful',
  colorScheme: 'brand',
};

// export the component theme
export const containerTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps,
});