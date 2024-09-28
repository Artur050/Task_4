import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserTable from './components/UserTable';
import PrivateRoute from './components/PrivateRoute'; // импортируем PrivateRoute
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import './App.css'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <nav className="p-4 bg-gray-800 text-white flex justify-between">
            <div>
              <a href="/login" className="mr-4">Login</a>
              <a href="/register" className="mr-4">Register</a>
            </div>
            <div>
              <a href="/users">Users</a>
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
