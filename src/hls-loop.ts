const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const { execFile: exec } = require("child_process");

// Indicate some othr parameters
const ffmpegPath = ffmpegInstaller.path;
const frameSuffix = '.result.png';
const inputFps = '60000/1001';
const outputFps = 30;
const videoCodec = 'libx264';
const pixelFormat = 'yuv420p';

// Generate a command
const args = [
  '-re',
  // '-loop', 1,
  '-fflags', '+genpts',
  '-r', inputFps,
  '-i', `assets/results/frames/%d${frameSuffix}`,
  '-i', 'assets/results/audio.wav',
  '-c:v', videoCodec,
  '-vf', `fps=${outputFps}`,
  '-pix_fmt', pixelFormat,
  '-crf', 30,
  '-f', 'segment',
  '-segment_time', 5,
  // '-hls_flags', 'delete_segments',
  '-segment_list', 'assets/videos/stream.m3u8',
  'assets/videos/stream_%06d.ts',
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
