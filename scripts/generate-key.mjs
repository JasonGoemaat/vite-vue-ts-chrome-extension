import { existsSync, fstat, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { generateKeyPairSync } from 'crypto'

const paths = {
  folder: resolve('.pem'),
  settings: resolve('.pem/settings.config.js'),
  privateKey: resolve('.pem/extension.pem'),
  publicKey: resolve('.pem/extension.rsa')
}

if (existsSync(paths.privateKey)) {
  console.log('Private key already exists, delete this file to recreate:');
  console.log(`  ${paths.privateKey}`);
} else {
  if (!existsSync(paths.folder)) {
    console.log(`creating directory: ${paths.folder}`);
    mkdirSync(paths.folder);
  }

  const DEFAULT_SETTINGS_FILE = `({
    modulusLength: 2048,  // the length of your key in bits   
    publicKeyEncoding: {
      type: 'spki',       // recommended to be 'spki' by the Node.js docs
      format: 'pem'   
    },   
    privateKeyEncoding: {
      type: 'pkcs8',      // recommended to be 'pkcs8' by the Node.js docs
      format: 'pem',
      //cipher: 'aes-256-cbc',   // *optional*
      //passphrase: 'top secret' // *optional*   
    } 
  })`;

  if (!existsSync(paths.settings)) {
    console.log(`creating settings file: ${paths.settings}`);
    writeFileSync(paths.settings, DEFAULT_SETTINGS_FILE, { encoding: 'utf-8' });
  }

  const settings = eval(readFileSync(paths.settings, { encoding: 'utf-8' }));

  const { publicKey, privateKey } = generateKeyPairSync('rsa', settings);
  writeFileSync(paths.privateKey, privateKey, { encoding: 'utf-8' });
  writeFileSync(paths.publicKey, publicKey, { encoding: 'utf-8' });
  console.log(`Private Key: ${paths.privateKey}`);
  console.log(`Public Key: ${paths.publicKey}`);
}
