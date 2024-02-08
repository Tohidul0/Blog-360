import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashborad from './pages/Dashborad';
import Projects from './pages/Projects';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Header from './components/Header';
import Footercompo from './pages/Footercompo';
import PrivateRoute from './components/PrivateRoute';
import AdminPrivateRoute from './components/adminPrivateRoute';
import Create_new_post from './pages/Create_new_post';

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Header></Header>
         <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/about' element={<About></About>}></Route>
            <Route element={<PrivateRoute/>}>
              
              <Route path='/dashboard' element={<Dashborad></Dashborad>}></Route>
           
            </Route>
            <Route element={<AdminPrivateRoute/>}>
              
              <Route path='/create-new-post' element={<Create_new_post></Create_new_post>}></Route>
           
            </Route>
            <Route path='/projects' element={<Projects></Projects>}></Route>
            <Route path='/LogIn' element={<LogIn></LogIn>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
        <Footercompo></Footercompo>
      </BrowserRouter>
    </>
  )
}

export default App
