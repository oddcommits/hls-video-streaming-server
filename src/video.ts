const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const { execFile: exec } = require("child_process");

// Process arguments
const arguments = process.argv;

// Get paths for frames and audio
let pathFrames = arguments[2];
let pathAudio = arguments[3];
let pathOutput = arguments[4];

// If paths are not provided, throw an error
if (!pathFrames || !pathAudio || !pathOutput) {
  throw new Error('Paths for video frames, audio and output are required!');
}

// Check arguments
console.log('Ready to generate a video...');
console.log('Path for video frames: ', pathFrames);
console.log('Path for audio:        ', pathAudio);
console.log('Path for output:       ', pathOutput);

// Indicate some othr parameters
const ffmpegPath = ffmpegInstaller.path;
const frameSuffix = '.result.png';
const inputFps = '60000/1001';
const outputFps = 30;
const videoCodec = 'libx264';
const pixelFormat = 'yuv420p';

// Generate a command
const args = [
  '-y',
  '-r', inputFps,
  '-start_number', 0,
  '-i', `${pathFrames}/%d${frameSuffix}`,
  '-i', pathAudio,
  '-c:v', videoCodec,
  '-r', outputFps,
  '-pix_fmt', pixelFormat,
  pathOutput,
];

// Run the command
console.log('Started to generate...');

exec(ffmpegPath, args, (error, stdout, stderr) => {
  if (error) {
    console.log(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});
