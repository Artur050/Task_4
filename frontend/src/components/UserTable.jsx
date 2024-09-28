import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, blockUser, deleteUser, unblockUser } from '../features/userSlice';
import axios from 'axios';
import Logout from './Logout';
import { getApiUrl } from '../utils/apiUtils';

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const user = localStorage.getItem('username');

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
    selectedUsers.forEach(async (userId) => {
      await axios.put(getApiUrl(`/users/block/${userId}`));
      dispatch(blockUser(userId));
    });
  };

  const handleUnblockUsers = async () => {
    selectedUsers.forEach(async (userId) => {
      await axios.put(getApiUrl(`/users/unblock/${userId}`));
      dispatch(unblockUser(userId));
    });
  };

  const handleDeleteUsers = async () => {
    selectedUsers.forEach(async (userId) => {
      await axios.delete(getApiUrl(`/users/delete/${userId}`));
      dispatch(deleteUser(userId));
    });
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