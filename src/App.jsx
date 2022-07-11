import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/shared/header/Header.component';
import Footer from './components/shared/footer/Footer.component';
import PageNotFound from './pages/page-not-found/PageNotFound.component';
import LandingPage from './pages/landing-page/LandingPage.component';
import Homepage from './pages/home-page/HomePageComponent';
import LoginPage from './pages/login-page/LoginPage.component';
import SignUpPage from './pages/sign-up-page/SignUpPage.component';
import BookPage from './pages/book-page/BookPage.component';
import CartPage from './pages/cart-page/CartPage.component';

import CartContextProvider from './context/Cart.context.jsx'
import AuthContextProvider from './context/Auth.context.jsx';





const App =() => {
  return (
    <Router>
      <AuthContextProvider>
        <CartContextProvider>
            <Header />

              <Routes>
                  <Route path='/' element={<LandingPage />} />

                  <Route path='books' element={<Homepage />} />

                  <Route path='login' element={<LoginPage />} />

                  <Route path='signup' element={<SignUpPage />} />

                  <Route path='/books/:bookID' element={<BookPage />} />

                  <Route path='/cart' element={<CartPage />} />
                  
                  <Route path='*' element={<PageNotFound />} />
              </Routes>

            <Footer />
          </CartContextProvider>
        </AuthContextProvider>
    </Router>
          
  );
}

export default App;
