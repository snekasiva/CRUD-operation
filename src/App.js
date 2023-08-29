import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Studentform from './Student form';
import Studentview from './Studentview';
import Student from './Student';
import Teacherform from './components/Teacherform';
import Teacher from './components/Teacher';
import { Toaster } from 'react-hot-toast';
import Teacherview from './components/Teacherview';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Topbar />
        <div id="layoutSidenav">
          <Sidebar />
          <div id="layoutSidenav_content">
            <main>
              <Routes>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/Studentform' element={<Studentform/>}></Route>
                <Route path='/Student' element={<Student/>}></Route>
                <Route path='/Studentview/:id' element={<Studentview/>}></Route>
                <Route path='/Teacherform' element={<Teacherform/>}></Route>
                <Route path='/Teacher' element={<Teacher/>}></Route>
                <Route path='/Teacherview/:id' element={<Teacherview/>}></Route>
                
              </Routes>
              
            </main>
            <Footer />
          </div>
        </div>
      </div>
      <Toaster position='top-center' />
    </BrowserRouter>
  );
}

export default App;
