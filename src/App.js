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
import Payment from './component/pages/Dashboard/Payment/Payment';
import BookDisplay from './component/pages/Library/BookDisplay/BookDisplay';
import BookName from './component/pages/Library/BookName/BookName';
import AuthorName from './component/pages/Library/AuthorName/AuthorName';
import PublisherName from './component/pages/Library/PublisherName/PublisherName';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="serachByBookName" element={<PrivateRoute>
              <BookName />
            </PrivateRoute>} />
            <Route exact path="serachByAuthorName" element={<PrivateRoute>
              <AuthorName />
            </PrivateRoute>} />
            <Route exact path="serachByPublisherName" element={<PrivateRoute>
              <PublisherName />
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
                <Route path = "/dashboard/payment" element={<Payment />}/>
                <Route path = "/dashboard/makeAdmin" element={<AdminRoute>
                  <MakeAdmin />
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
