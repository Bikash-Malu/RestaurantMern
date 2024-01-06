
import './App.css';
import  { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Items from './pages/Items';
import Bills from './pages/Bills';
import Customber from './pages/Customber';
import CartPage from './pages/CardPage';
import Front from './pages/Front';
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/items' element={<Items/>}/>
      <Route path='/bills' element={<Bills/>}/>
      <Route path='/custombers' element={<Customber/>}/>
      <Route path='/card' element={<CartPage/>}/>
      <Route path='/' element={<Front/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/logout' element={<Logout/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
