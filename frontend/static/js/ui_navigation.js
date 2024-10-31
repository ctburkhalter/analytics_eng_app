// static/js/ui_navigation.js

function showPanel(panelId) {
  // Hide all panels
  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => panel.style.display = 'none');

  // Show the selected panel
  const selectedPanel = document.getElementById(panelId);
  if (selectedPanel) {
    selectedPanel.style.display = 'block';
  }
}

// Show the dashboard panel by default when the page loads
document.addEventListener('DOMContentLoaded', () => {
  showPanel('dashboard');
});
