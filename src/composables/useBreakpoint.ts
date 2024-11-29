import { useMediaQuery, useTheme } from '@mui/material';

type BreakPointKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const useBreakpoint = () => {
  const theme = useTheme();

  const xl = useMediaQuery(theme.breakpoints.up('xl'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const xs = useMediaQuery(theme.breakpoints.up('xs'));

  const resolveBreakpoint = (key: BreakPointKeys) => {
    if (key === 'xl') return xl;
    if (key === 'lg') return lg;
    if (key === 'md') return md;
    if (key === 'sm') return sm;
    if (key === 'xs') return xs;
    return xs;
  };

  return {
    resolveBreakpoint,
  };
};