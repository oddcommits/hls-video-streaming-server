const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const { execFile: exec } = require("child_process");

// Indicate some othr parameters
const ffmpegPath = ffmpegInstaller.path;

// Generate a command
const args = [
  '-i', 'assets/videos/video.mp4',
  '-profile:v', 'baseline',
  '-level', '3.0',
  '-start_number', 0,
  '-hls_time', 2,
  '-hls_list_size', 0,
  '-f', 'hls',
  'assets/videos/stream.m3u8',
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
