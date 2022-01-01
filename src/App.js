import './App.css';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import LibrarySerach from './component/pages/Library/LibrarySerach/LibrarySerach';
import Dashboard from './component/pages/Dashboard/Dashboard/Dashboard';
import Login from './component/shared/Login/Login';
import Registration from './component/shared/Registration/Registration';
import AuthProvider from './context/AuthProvider/AuthProvider';
import PrivateRoute from './component/shared/PrivateRoute/PrivateRoute';
import Home from './component/pages/Home/Home/Home';
import DashboardHome from './component/pages/Dashboard/DashboardHome/DashboardHome';
import AddBooks from './component/pages/Dashboard/AddBooks/AddBooks';
import MakeAdmin from './component/pages/Dashboard/MakeAdmin/MakeAdmin';
import AdminRoute from './component/shared/AdminRoute/AdminRoute';
import Profile from './component/pages/Dashboard/Profile/Profile';
import BookCharts from './component/pages/Dashboard/BookCharts/BookCharts';
import BookDisplay from './component/pages/Library/BookDisplay/BookDisplay';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="librarySerach" element={<PrivateRoute>
              <LibrarySerach />
            </PrivateRoute>} />
            <Route exact path="bookDisplay/:bookId" element={<PrivateRoute>
              <BookDisplay />
            </PrivateRoute>} />
            <Route exact path="dashboard" element={<PrivateRoute>
                <Dashboard />
              </PrivateRoute>} >
                <Route exact path = "/dashboard" element={<DashboardHome />}/>
                <Route path = "/dashboard/addBooks" element={<AddBooks />}/>
                <Route path = "/dashboard/profile" element={<Profile />}/>
                <Route path = "/dashboard/makeAdmin" element={<AdminRoute>
                  <MakeAdmin />
                </AdminRoute>}/>
                <Route path = "/dashboard/bookCharts" element={<AdminRoute>
                  <BookCharts />
                </AdminRoute>}/>
            </Route>
            <Route path="login" element={<Login />}/>
            <Route path="registration" element={<Registration />}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
