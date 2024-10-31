import React, { useEffect, useState } from 'react';

function AnchorManager() {
  const [anchors, setAnchors] = useState([]);
  const [newAnchor, setNewAnchor] = useState({ name: '', value: '' });

  useEffect(() => {
    loadAnchors();
  }, []);

  // Load anchors from the backend
  const loadAnchors = () => {
    fetch('/api/anchors')
      .then((response) => response.json())
      .then((data) => {
        if (data.anchors) {
          setAnchors(data.anchors);
        } else {
          alert('Failed to load anchors');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while loading anchors');
      });
  };

  // Create a new anchor
  const createAnchor = (e) => {
    e.preventDefault();
    if (newAnchor.name && newAnchor.value) {
      fetch('/api/anchors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnchor),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert('Anchor created successfully');
            setNewAnchor({ name: '', value: '' });
            loadAnchors();
          } else {
            alert('Failed to create anchor');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred while creating the anchor');
        });
    }
  };

  // Update an existing anchor
  const updateAnchor = (anchorId, updatedAnchor) => {
    if (updatedAnchor.name && updatedAnchor.value) {
      fetch(`/api/anchors/${anchorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAnchor),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert('Anchor updated successfully');
            loadAnchors();
          } else {
            alert('Failed to update anchor');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred while updating the anchor');
        });
    }
  };

  // Delete an existing anchor
  const deleteAnchor = (anchorId) => {
    fetch(`/api/anchors/${anchorId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Anchor deleted successfully');
          loadAnchors();
        } else {
          alert('Failed to delete anchor');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while deleting the anchor');
      });
  };

  return (
    <div>
      <h2>Anchor Manager</h2>
      <form onSubmit={createAnchor}>
        <div>
          <label>Anchor Name:</label>
          <input
            type="text"
            value={newAnchor.name}
            onChange={(e) => setNewAnchor({ ...newAnchor, name: e.target.value })}
          />
        </div>
        <div>
          <label>Anchor Value:</label>
          <input
            type="text"
            value={newAnchor.value}
            onChange={(e) => setNewAnchor({ ...newAnchor, value: e.target.value })}
          />
        </div>
        <button type="submit">Create Anchor</button>
      </form>

      <h3>Existing Anchors</h3>
      <ul>
        {anchors.map((anchor) => (
          <li key={anchor.id}>
            <input
              type="text"
              value={anchor.name}
              onChange={(e) =>
                setAnchors(
                  anchors.map((a) =>
                    a.id === anchor.id ? { ...a, name: e.target.value } : a
                  )
                )
              }
            />
            <input
              type="text"
              value={anchor.value}
              onChange={(e) =>
                setAnchors(
                  anchors.map((a) =>
                    a.id === anchor.id ? { ...a, value: e.target.value } : a
                  )
                )
              }
            />
            <button onClick={() => updateAnchor(anchor.id, anchor)}>Save</button>
            <button onClick={() => deleteAnchor(anchor.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnchorManager;
