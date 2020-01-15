import { spawn } from 'child_process';
import {path7za} from '7zip-bin';

/**
 * Run 7za using arguments, arguments may be inline or in an array
 * @param {any[]} args
 * @return {Promise<string[]>}
 */
export function run(args: string[]): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const cmd = spawn(path7za, args);
    let out = '';

    cmd.stdout.on('data', lines => {
      out += lines.toString();
    });

    // cmd.stderr.on('data', () => undefined));

    cmd.on('close', code => {
      if (code) {
        reject(new Error(`Command exit with code ${code}`));
      } else {
        resolve(out.replace(/\r/g, '').split(/\n/));
      }
    });
  });
}
