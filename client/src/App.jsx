import { Route, Routes } from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import View from './pages/DetailedView';
import Register from './pages/Register';
import User from './pages/UserProfile';
import axios from 'axios';
import Owner from './pages/OwnerPage';
import PhotoView from './pages/PhotoView';
axios.defaults.baseURL = 'http://localhost:3000';
import { UserContextProvider } from './pages/userContext';
import Account from './pages/AccountPage';
import Profile from './pages/ProfilePage';
import EditPage from './pages/EditPage';
import MyPosts from './pages/MyPosts';
import { io } from "socket.io-client";
import Profilenavigations from './pages/ProfileNavigations';
import Payment from './pages/PaymentPage';
import Success from './pages/SuccessPayment';
import Personal from './pages/PersonalInfo';
import LoginSecurity from './pages/LoginandSecurity';
import ForgotPass from './pages/ForgotPass';
import Resetting from './pages/Resetting';
import AccountDeletion from './pages/AccountDeletion';
import About from './pages/About';
import TheProfile from './pages/TheProfile';

axios.defaults.withCredentials = true;
// /places/${place._id}
function App() {
  const socket = io('<http://localhost:3000>');
  return (  
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route index element = {<HomePage />}/>
      <Route path='/account' element = {<Account />}/>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element = {<LoginPage />}/>
      <Route path='/account/:subpages?' element = {<Account/>}/>
      <Route path='/account/:subpages/:action' element = {<Account/>}/>
      <Route path='/places/:id' element = {<View />}/>
      <Route path='/places/photos/:id' element={<PhotoView/>} />
      <Route path='/ownerPage' element={<Owner/>} />
      <Route path='/userProfile/:id' element={<User/>} />
      <Route path='/profile/:subpages' element={<Profile/>} />
      <Route path='/accout/edit/:id' element={<EditPage/>} />
      <Route path='/account/myPosts' element={<MyPosts/>} />
      <Route path='/account/profile/navigations' element= {<Profilenavigations/>} />
      <Route path='/booking/payment' element= {<Payment/>} />
      <Route path='/booking/payment/success' element= {<Success/>} />
      <Route path='/account/profile/navigations/profileInfo' element= {<Personal/>} />
      <Route path='/account/profile/navigations/loginandSecurity' element= {<LoginSecurity/>} />
      <Route path='/forgotPass' element= {<ForgotPass/>} />
      <Route path='/pass/resetting' element= {<Resetting/>} />
      <Route path='/account/deactivation' element= {<AccountDeletion/>} />
      <Route path='/about' element= {<About/>} /> 
      <Route path='/user/profile/settings' element= {<TheProfile/>} /> 
      <Route path='*' element= {<HomePage/>} />
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
