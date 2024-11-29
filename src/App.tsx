import { CssBaseline, Paper, ThemeProvider } from '@mui/material';
import Navbar from '@components/navbar';
import Routing from '@router/route';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        sx={{
          minHeight: '100vh',
          borderRadius: 0,
        }}
        color="primary"
      > 
        <div className="App">
          <Navbar>
            <div
              style={{ margin: '0.75em' }}
            >
              <Routing />
            </div>
          </Navbar>
        </div>
      </Paper>
    </ThemeProvider>
      
  );
}

export default App;