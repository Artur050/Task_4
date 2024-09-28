import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, blockUser, deleteUser, unblockUser } from '../features/userSlice';
import axios from 'axios';
import Logout from './Logout';
import { getApiUrl } from '../utils/apiUtils';
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, status, error } = useSelector((state) => state.users);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const user = localStorage.getItem('username');
  const currentUserEmail = localStorage.getItem('email');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user._id));
    }
  };


  const handleBlockUsers = async () => {
    try {
      selectedUsers.forEach(async (userId) => {
        await axios.put(getApiUrl(`/users/block/${userId}`));
        dispatch(blockUser(userId));
    
        const blockedUser = users.find(user => user._id === userId);
        if (blockedUser && blockedUser.email === currentUserEmail) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      });
    } catch (error) {
      console.error("Error blocking users:", error);
    }
  };

  const handleUnblockUsers = async () => {
    selectedUsers.forEach(async (userId) => {
      await axios.put(getApiUrl(`/users/unblock/${userId}`));
      dispatch(unblockUser(userId));
    });
  };

  const handleDeleteUsers = async () => {
    try {
      selectedUsers.forEach(async (userId) => {
        await axios.delete(getApiUrl(`/delete/${userId}`));
        dispatch(deleteUser(userId));
    
        const blockedUser = users.find(user => user._id === userId);
        if (blockedUser && blockedUser.email === currentUserEmail) {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          navigate('/register');
        }
      });
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h1>Welcome,  {user}</h1>
      <div className="flex justify-end mb-4 space-x-2">
        <button onClick={handleBlockUsers} className="bg-yellow-500 text-white px-4 py-2 rounded">Block</button>
        <button onClick={handleDeleteUsers} className="bg-red-500 text-white px-4 py-2 rounded">
          <span className="material-icons">delete</span>
        </button>
        <button onClick={handleUnblockUsers} className="bg-green-500 text-white px-4 py-2 rounded">Unblock</button>        <Logout />
      </div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedUsers.length === users.length}
                />
              </th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Registration Date</th>
              <th className="p-2 border">Last Login</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() =>
                      setSelectedUsers(
                        selectedUsers.includes(user._id)
                          ? selectedUsers.filter((id) => id !== user._id)
                          : [...selectedUsers, user._id]
                      )
                    }
                  />
                </td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{new Date(user.registrationDate).toLocaleDateString()}</td>
                <td className="p-2 border">{new Date(user.lastLogin).toLocaleDateString()}</td>
                <td className="p-2 border">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;