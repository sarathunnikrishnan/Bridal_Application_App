import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Bridal from './Pages/Bridal';
import Photography from './Pages/Photography'
import Venus from './Pages/Venus'
import Catering from './Pages/Catering'
import BridalCategory from './Pages/BridalCategory';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import photo_banner from './Components/Assets/Photography/photo_banner.png'
import BridalProduct from './Pages/BridalProduct';
import PhotographyProduct from './Pages/PhotographyProduct';
import VenusProduct from './Pages/VenusProduct';
import venus_banner from './Components/Assets/Venue/venue_banner.png'
import VerifyUserOtp from './Pages/VerifyUserOtp';
import SearchProducts from './Pages/SearchProducts';
import PaymentSuccess from './Pages/PaymentSuccess';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Bridal />}></Route>
          <Route path='/bridal' element={<Bridal/>}/>
          <Route path='/womens' element={<BridalCategory banner={women_banner} category='women'/>}/>
          <Route path='/mens' element={<BridalCategory banner={men_banner}  category='men'/>}/>
          <Route path='/kids' element={<BridalCategory banner={kid_banner}  category='kid'/>}/>
          <Route path='/bridalproduct' element={<BridalProduct/>}>
            <Route path=':bridalproductId' element={<BridalProduct/>}/>
          </Route>
          <Route path='/photography' element={<Photography banner={photo_banner}  category='Photo & Video Per Day'/>}/>
          <Route path='/photographyitems' element={<PhotographyProduct/>}>
            <Route path=':photographyitemsId' element={<PhotographyProduct/>}/>
          </Route>
          <Route path='/venusitems' element={<VenusProduct/>}>
            <Route path=':venusitemsId' element={<VenusProduct/>}/>
          </Route>
          <Route path='/venus' element={<Venus banner={venus_banner} category='Hall & Catering Service' />}/>
          <Route path='/catering' element={<Catering/>}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/login' element={<LoginSignup />}/>
          <Route path='/verifyuserotp' element={<VerifyUserOtp/>} /> 
          <Route path='/search' element={<SearchProducts/>} />
          <Route path='/payment' element={<PaymentSuccess/>} />
        </Routes> 
        <Footer/> 
      </BrowserRouter> 
    </div>
  );
}

export default App;
