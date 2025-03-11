import { createTheme, Flex, Input, Tooltip } from '@mantine/core'

export const mantineTheme = createTheme({
  autoContrast: true,
  luminanceThreshold: 0.3,
  defaultRadius: 'sm',
  cursorType: 'pointer',
  breakpoints: {
    xs: '20em',
    sm: '48em',
    md: '62em',
    lg: '74em',
    xl: '90em',
  },
  fontFamily: 'Inter',
  fontFamilyMonospace: 'Inconsolata',
  headings: { fontFamily: 'Montserrat' },
  primaryColor: 'dark_pink',
  colors: {
    dark_pink: [
      '#faedff',
      '#edd9f7',
      '#d8b1ea',
      '#c186dd',
      '#ae62d2',
      '#a34bcb',
      '#9d3fc9',
      '#8931b2',
      '#7a2aa0',
      '#6b218d',
    ],
    lime: [
      '#F4FCE3',
      '#E9FAC8',
      '#D8F5A2',
      '#C0EB75',
      '#d1fd0a',
      '#94D82D',
      '#82C91E',
      '#74B816',
      '#66A80F',
      '#5C940D',
    ],
  },
  components: {
    Flex: Flex.extend({ defaultProps: { align: 'center', justify: 'center' } }),
    Input: Input.extend({
      styles: {
        input: {
          fontSize: 'var(--mantine-font-size-sm)',
          backgroundColor: 'var(--mantine-color-dark-7)',
        },
      },
    }),
    InputWrapper: Input.Wrapper.extend({
      styles: {
        label: { fontSize: 'var(--mantine-font-size-xs)', fontWeight: 600 },
        error: { fontSize: 'var(--mantine-font-size-xs)' },
      },
    }),

    Tooltip: Tooltip.extend({
      defaultProps: { withArrow: true, position: 'top', openDelay: 200 },
    }),
  },
})
