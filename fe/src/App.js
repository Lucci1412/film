import React, { useEffect } from 'react';
import { publicRoutes, userRouter } from './routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { publicRequest, userRequest } from './commons/api';
import { useDispatch, useSelector } from 'react-redux'
import { setAuth, getUser } from './redux/userSlice';
import { Navigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const dispatch = useDispatch();
  const tokenUser = JSON.parse(localStorage.getItem('token'));
  // const user = useSelector(getUser)
  useEffect(() => {
    const getUser = async () => {
      if (tokenUser) {
        const res = await userRequest.get("/auth/user/token");
        if (res.data.success) {
          dispatch(setAuth(res.data.user))
        }
        else {
          localStorage.removeItem('token');
        }
      }
      else {
        const res = await publicRequest.get("/auth/user", { withCredentials: true })
        if (res.data.success) dispatch(setAuth(res.data.user))
      }

    }
    getUser()
  }, [dispatch, tokenUser])

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes && publicRoutes.map((item, index) => {
            const Component = item.component
            const Layout = item.layout === null ? Fragment : item.layout
            return <Route key={index} path={item.path} element={<Layout><Component /></Layout>} />
          })}
          {userRouter && userRouter.map((item, index) => {
            const Component = item.component
            const Layout = item.layout === null ? Fragment : item.layout
            return <Route key={index} path={item.path} element={ <Layout><Component /></Layout> } />
          })}
        </Routes>
      </div>
      <CssBaseline />
      <ToastContainer
      />
    </Router>

  );
}

export default App;
