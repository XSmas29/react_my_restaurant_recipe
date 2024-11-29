import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'monospace', // Set your desired font family here
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#323232',
      paper: '#222222',
    },
    primary: {
      main: '#db7337',
      dark: '#a15225',
      contrastText: '#fff',
    },
    secondary: {
      main: '#303030',

    },
    text: {
      primary: '#fff',
    },
  },
});

export default theme;