// App.js
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Screens/Dashboard';
import OrdersIndex from './Screens/orders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='Orders' element={<OrdersIndex/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
