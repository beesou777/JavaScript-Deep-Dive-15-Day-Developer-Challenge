import EventEmitter from "./utility/eventemitter.js"

const emitter = new EventEmitter()

// Get DOM elements
const fileInput = document.getElementById('fileInput');
const progressBar = document.getElementById('progress');
const statusDiv = document.getElementById('status');
const uploadButton = document.getElementById('uploadButton');



/**
 * Simulates a file upload by emitting 'uploadProgress' events
 * with a random progress value between 0 and 100 until it reaches 100.
 * If the upload is successful (70% chance), it emits an 'uploadComplete' event
 * with the file name. If the upload fails (30% chance), it emits an 'uploadError' event
 * with a failure message.
 * @param {File} file - The file to simulate the upload for.
 */
const simulateFileUpload = (file) => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 20;  
    if (progress > 100) progress = 100;

    emitter.emit('uploadProgress', progress);

    if (progress === 100) {
      clearInterval(interval);

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



fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log('Selected file:', file);
  }
});

uploadButton.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (file) {
    emitter.emit('uploadButtonClicked', file);
  } else {
    emitter.emit('uploadButtonClicked', null);
  }
});


/**
 * Triggered when the upload button is clicked.
 * @event uploadButtonClicked
 * @type {object}
 * @property {File} file - The selected file.
 * @example
 * emitter.on('uploadButtonClicked', (file) => {
 *   if (file) {
 *     simulateFileUpload(file);
 *   } else {
 *     statusDiv.textContent = 'No file selected.';
 *     progressBar.style.width = '0%';
 *   }
 * });
 */

emitter.on('uploadButtonClicked', (file) => {
  if (file) {
    simulateFileUpload(file);
  } else {
    statusDiv.textContent = 'No file selected.';
    progressBar.style.width = '0%';
  }
});


/**
 * Triggered when the file upload progress changes.
 * @event uploadProgress
 * @type {object}
 * @property {number} progress - The current progress value.
 * @example
 * emitter.on('uploadProgress', (progress) => {
 *   console.log(`Upload progress: ${progress}%`);
 * });
 */

emitter.on('uploadProgress', (progress) => {
  progressBar.style.width = `${progress}%`;
});


/**
 * Triggered when the file upload is complete.
 * @event uploadComplete
 * @type {object}
 * @property {string} fileName - The name of the uploaded file.
 * @example
 * emitter.on('uploadComplete', (fileName) => {
 *   console.log(`Upload complete: ${fileName}`);
 * });
 */
emitter.on('uploadComplete', (fileName) => {
  statusDiv.textContent = `Upload complete: ${fileName}`;
});


/**
 * Triggered when the file upload fails.
 * @event uploadError
 * @type {object}
 * @property {string} errorMessage - The error message.
 * @example
 * emitter.on('uploadError', (errorMessage) => {
 *   console.log(`Upload error: ${errorMessage}`);
 })
 */


emitter.on('uploadError', (errorMessage) => {
  statusDiv.textContent = errorMessage;
  progressBar.style.width = '0%';
});