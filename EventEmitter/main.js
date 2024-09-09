import EventEmitter from "./utility/eventemitter.js"

const emitter = new EventEmitter()

// Get DOM elements
const fileInput = document.getElementById('fileInput');
const progressBar = document.getElementById('progress');
const statusDiv = document.getElementById('status');
const uploadButton = document.getElementById('uploadButton');


// Function to simulate file upload
const simulateFileUpload = (file) => {
  let progress = 0;

  // Simulate upload progress using setInterval
  const interval = setInterval(() => {
    progress += Math.random() * 20;  // Increase progress randomly
    if (progress > 100) progress = 100;

    // Emit 'uploadProgress' event
    emitter.emit('uploadProgress', progress);

    if (progress === 100) {
      clearInterval(interval);

      // Simulate random failure or success
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        statusDiv.textContent = `Uploading ${file.name}...`;
    progressBar.style.width = '0%';
        emitter.emit('uploadComplete', file.name);
      } else {
        emitter.emit('uploadError', 'Failed to upload the file.');
      }
    }
  }, 500);
};



// Event listeners for file input and upload progress
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    files = file 
  }
});

// Register listener for 'uploadButton' click
uploadButton.addEventListener('click', () => {
    if(fileInput.files[0]) {
        console.log("thios is the file",fileInput.files[0])
      emitter.emit('uploadButtonClicked', fileInput.files[0]);
 
    }else{
        console.log("thios is the file",fileInput.files[0])
      emitter.emit('uploadButtonClicked', null);
    }
 });

// Register listener for 'uploadProgress'
emitter.on('uploadProgress', (progress) => {
  progressBar.style.width = `${progress}%`;
});

// Register listener for 'uploadComplete'
emitter.on('uploadComplete', (fileName) => {
  statusDiv.textContent = `Upload complete: ${fileName}`;
});

// Register listener for 'uploadError'
emitter.on('uploadError', (errorMessage) => {
  statusDiv.textContent = errorMessage;
  progressBar.style.width = '0%';
});