import React, { useEffect, useState } from 'react';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  // Load users from the backend
  const loadUsers = () => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        if (data.users) {
          setUsers(data.users);
        } else {
          alert('Failed to load users');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while loading users');
      });
  };

  // Create a new user
  const createUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.role) {
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert('User created successfully');
            setNewUser({ name: '', role: '' });
            loadUsers();
          } else {
            alert('Failed to create user');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred while creating the user');
        });
    }
  };

  // Update an existing user
  const updateUser = (userId, updatedUser) => {
    if (updatedUser.name && updatedUser.role) {
      fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert('User updated successfully');
            loadUsers();
          } else {
            alert('Failed to update user');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred while updating the user');
        });
    }
  };

  // Delete an existing user
  const deleteUser = (userId) => {
    fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('User deleted successfully');
          loadUsers();
        } else {
          alert('Failed to delete user');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while deleting the user');
      });
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={createUser}>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          />
        </div>
        <button type="submit">Create User</button>
      </form>

      <h3>Existing Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <input
              type="text"
              value={user.name}
              onChange={(e) =>
                setUsers(
                  users.map((u) =>
                    u.id === user.id ? { ...u, name: e.target.value } : u
                  )
                )
              }
            />
            <input
              type="text"
              value={user.role}
              onChange={(e) =>
                setUsers(
                  users.map((u) =>
                    u.id === user.id ? { ...u, role: e.target.value } : u
                  )
                )
              }
            />
            <button onClick={() => updateUser(user.id, user)}>Save</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;