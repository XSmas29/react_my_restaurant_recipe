import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'monospace', // Set your desired font family here
  },
  palette: {
    background: {
      default: '#181818',
      paper: '#101010',
    },
    primary: {
      main: '#db7337',
      dark: '#a15225',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default theme;