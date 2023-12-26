/*

Purpose: Import settings for GitHub Labels.
(c) James Perrin, MIT License, https://www.countrydawgg.com, | @jamesperrin

Importing Instructions:

1. Update the labels JSON object.
2. Open a web browser.
3. Navigate to the desired GitHub repository.
4. Navigate to Issues tab.
5. Navigate to Labels link.
6. Open the web browswer's Developer Tools
7. Navigate to the Console window.
8. Copy and Paste the below code snippets into the Console window.

Please visit the below link to download the export JavaScript script.
github-labels-export.js - https://gist.github.com/jamesperrin/c2bf6d32fbb8142682f6107e561b664d

*/

const labels = [
  {
    name: 'bug',
    description: "Something isn't working",
    color: 'ee0701',
  },
  {
    name: 'duplicate',
    description: 'This issue or pull request already exists',
    color: 'cccccc',
  },
  {
    name: 'enhancement',
    description: 'New feature or request',
    color: '84b6eb',
  },
  {
    name: 'good first issue',
    description: 'Good for newcomers',
    color: '7057ff',
  },
  {
    name: 'help wanted',
    description: 'Extra attention is needed',
    color: '33aa3f',
  },
  {
    name: 'invalid :notebook:',
    description: "This doesn't seem right",
    color: 'e6e6e6',
  },
  {
    name: 'question',
    description: 'Further information is requested',
    color: 'cc317c',
  },
  {
    name: 'wontfix',
    description: 'This will not be worked on',
    color: 'ffffff',
  },
];

// Function to update an existing label
function updateLabel(label) {
  let flag = false;

  [].slice.call(document.querySelectorAll('.labels-list-item')).forEach((element) => {
    if (element.querySelector('.label-link').textContent.trim() === label.name) {
      flag = true;
      element.querySelector('.js-edit-label').click();
      element.querySelector('.js-new-label-name-input').value = label.name;
      element.querySelector('.js-new-label-description-input').value = label.description;
      element.querySelector('.js-new-label-color-input').value = `#${label.color}`;
      element.querySelector('.js-edit-label-cancel ~ .btn-primary').click();
    }
  });

  return flag;
}

// Function to add a new label
function addNewLabel(label) {
  document.querySelector('.js-new-label-name-input').value = label.name;
  document.querySelector('.js-new-label-description-input').value = label.description;
  document.querySelector('.js-new-label-color-input').value = `#${label.color}`;
  document.querySelector('.js-details-target ~ .btn-primary').disabled = false;
  document.querySelector('.js-details-target ~ .btn-primary').click();
}

// Function to update or add a new label
function addLabel(label) {
  if (!updateLabel(label)) {
    addNewLabel(label);
  }
}

labels.map((label) => {
  addLabel(label);
});
