import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import './App.css'; // Adjust the path as needed
function App() {
  return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  );
}

export default App;