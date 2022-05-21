import { resolve } from 'path'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import ChromeExtension from 'crx'

const paths = {
  privateKey: resolve('.pem/extension.pem'),
  source: resolve('dist'),
  folder: resolve('.publish'),
  updateXML: resolve('.publish/update.xml'),
  crx: resolve('.publish/extension.crx')
}

if (!existsSync(paths.folder)) {
  mkdirSync(paths.folder);
}

const crx = new ChromeExtension({
  codebase: 'http://localhost:8000/myExtension.crx',
  privateKey: readFileSync(paths.privateKey)
});

crx.load(paths.source)
.then(x => x.pack())
.then(buf => {
  const updateXML = crx.generateUpdateXML();
  writeFileSync(paths.updateXML, updateXML);
  writeFileSync(paths.crx, buf);
})
