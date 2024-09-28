import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserTable from './components/UserTable';
import PrivateRoute from './components/PrivateRoute'; // импортируем PrivateRoute
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import './App.css'
import { Link } from 'react-router-dom';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <nav className="p-4 bg-gray-800 text-white flex justify-between">
            <div>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="mr-4">Register</Link>
            </div>
            <div>
              <Link to="/users">Users</Link>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UserTable />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
