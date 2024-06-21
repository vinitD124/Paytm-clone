import img from './assets/bg-2.png';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import { useSelector } from 'react-redux';
import Template from './components/Template';
import Payment from './page/Payment';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />


        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Template>
                <Dashboard />
              </Template>
            </PrivateRoute>
          }
        />

     
        <Route
          path='/payment'
          element={
            <PrivateRoute>
            <Template>
              <Payment />
            </Template>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
