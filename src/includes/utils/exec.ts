// @flow
'use strict';

import Blurbird from 'bluebird';
import ChildProcess from 'child_process';

async function convertVideoToMp4({
  file_path,
  target_path,
  options = {
    detached : false,
    stdio    : 'pipe',
  },
}: {
  file_path: string;
  target_path: string;
  options?: ChildProcess.SpawnOptions;
}): Promise<void> {
  let error_output = '';
  return new Blurbird((resolve, reject) => {
    const process = ChildProcess.spawn(
      'ffmpeg',
      ['-i', file_path, '-codec', 'copy', target_path],
      options,
    );
    process.stderr?.on('data', (error) => {
      error_output += error.toString();
    });

    process.on('error', (error) => {
      reject(error);
    });

    process.on('exit', (code) => {
      if (code) {
        reject(
          new Error(
            `Sub-process convert exit with code: ${code}. Error: ${error_output}`,
          ),
        );
      } else {
        resolve();
      }
    });
  });
}

export { convertVideoToMp4 };
