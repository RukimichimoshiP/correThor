import Header from './components/headerComponent/headerComponent';
import FormLogin from './components/formLoginComponent/formLoginComponent';
import CorrectorsBox from './components/correctorsBox/correctorsBox';
import CssBaseline from '@mui/material/CssBaseline';
import './app.css'

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <main>
        <FormLogin />
        <CorrectorsBox />
      </main>
    </div>
  );
}

export default App;
