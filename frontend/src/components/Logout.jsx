import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login'); 
  };

  return (
    <button onClick={handleLogout} className=" bg-slate-500 text-white py-2 px-4 rounded">
      Logout
    </button>
  );
};

export default Logout;