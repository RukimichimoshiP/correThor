import { CorrectorIdProvider } from './contexts/correctorIdContext';
import { useToken } from './contexts/tokenContext';
import Header from './components/headerComponent/headerComponent';
import FormLogin from './components/formLoginComponent/formLoginComponent';
import CorrectorsBox from './components/correctorsBox/correctorsBox';
import CssBaseline from '@mui/material/CssBaseline';
import CorrectionBox from './components/correctionsBox/correctionBox';
import './App.css'

function App() {
  const { token } = useToken();

  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <main>
        <FormLogin />
        
        <CorrectorIdProvider>
          {token &&
            <>
              <CorrectorsBox />
              <CorrectionBox />
            </>
          }
        </CorrectorIdProvider>
      </main>
    </div>
  );
}

export default App;
