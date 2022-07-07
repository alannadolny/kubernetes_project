import './App.css';
import Main from './ui/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './ui/Details';
import Edit from './ui/Edit';
import Add from './ui/Add';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/:title' element={<Details />} />
            <Route path='/edit/:title' element={<Edit />} />
            <Route path='/add' element={<Add />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
