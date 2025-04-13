
import { Route, Routes } from 'react-router-dom';
import TestScreen from './components/TestScreen';
import StartScreen from './components/StartScreen';

const App: React.FC = () => {
  
  return (
    <Routes>
      <Route element={<TestScreen/>} path='test'></Route>
      <Route element={<StartScreen/>} path='/'></Route>
    </Routes>
  );
};

export default App;