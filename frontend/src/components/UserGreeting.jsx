const UserGreeting = () => {
    const username = localStorage.getItem('username');
    return username ? <p>Welcome, {username}!</p> : null;
  };

export default UserGreeting;