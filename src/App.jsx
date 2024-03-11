import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import GuestAuth from './auths/GuestAuth.jsx';
import UserAuth from './auths/UserAuth.jsx';

import NavigationPanel from './components/NavigationPanel.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';

import { store, persistor } from './store.jsx';

import './App.css';
// ==============================================
export function MainLayout() {
  return (
    <>
      {/* Header Panels Section */}
      <NavigationPanel />
      <Outlet />
    </>
  );
}
// ==============================================
function App() {
  return (
    <Container fluid className="main-container p-0">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />

                <Route element={
                  <UserAuth>
                    <Dashboard />
                  </UserAuth>
                } path="/dashboard" />

                <Route element={
                  <GuestAuth>
                    <Login />
                  </GuestAuth>
                } path="/login" />

                <Route element={
                  <GuestAuth>
                    <Register />
                  </GuestAuth>
                } path="/register" />
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Container>
  );
}

export default App;
// ==============================================
