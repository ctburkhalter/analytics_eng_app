// static/js/dbt_parser.js

document.getElementById('file-upload-form').addEventListener('submit', function(event) {
  event.preventDefault();
  uploadFile();
});

function uploadFile() {
  const fileInput = document.getElementById('file-upload');
  const file = fileInput.files[0];
  if (file) {
    document.getElementById('loading').style.display = 'block'; // Show loading spinner

    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById('loading').style.display = 'none'; // Hide loading spinner
        if (data.models) {
          displayModels(data.models);
        } else {
          alert('Invalid file format');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        document.getElementById('loading').style.display = 'none'; // Hide loading spinner
        alert('An error occurred while uploading the file');
      });
  }
}

function displayModels(models) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '<h2>DBT Models by Category</h2>';

  for (const category in models) {
    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = category;
    contentDiv.appendChild(categoryTitle);

    const ul = document.createElement('ul');
    models[category].forEach((model) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${model.name}</strong>: ${model.description}`;
      ul.appendChild(li);
    });
    contentDiv.appendChild(ul);
  }
}

// Anchor Management Functions
document.addEventListener('DOMContentLoaded', () => {
  const anchorManagerForm = document.getElementById('anchor-manager-form');
  if (anchorManagerForm) {
    anchorManagerForm.addEventListener('submit', function(event) {
      event.preventDefault();
      createAnchor();
    });
  }
});

function createAnchor() {
  const anchorName = document.getElementById('anchor-name').value;
  const anchorValue = document.getElementById('anchor-value').value;

  if (anchorName && anchorValue) {
    fetch('/api/anchors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: anchorName, value: anchorValue })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Anchor created successfully');
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
}

function loadAnchors() {
  fetch('/api/anchors', {
    method: 'GET'
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.anchors) {
        displayAnchors(data.anchors);
      } else {
        alert('Failed to load anchors');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while loading anchors');
    });
}

function displayAnchors(anchors) {
  const anchorListDiv = document.getElementById('anchor-list');
  anchorListDiv.innerHTML = '<h2>Anchors</h2>';

  const ul = document.createElement('ul');
  anchors.forEach((anchor) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${anchor.name}</strong>: ${anchor.value}`;
    ul.appendChild(li);
  });
  anchorListDiv.appendChild(ul);
}
