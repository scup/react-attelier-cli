import fs from 'fs';
import glob from 'glob';

const CACHE_DIR = '.attelier';

export default {
  getComponents() {
    return new Promise( (resolve, reject) => {
      glob('./src/client/components/**/*.jsx', (err, files) => {
        if(err) return reject(err);
        resolve(files);
      });
    });
    return;
  },

  createFile(filename, content) {
    return new Promise( (resolve, reject) => {
      fs.writeFile(filename, content, (err) => {
        if (err) return reject();
        resolve();
      });
    });
  },

  getPackageName(filename) {
    return filename.split('/').pop().replace('.jsx', '');
  },

  createComponentFile(filename, callback ) {
    this.getComponents().then( (files) => {
      let imports = [],
          exportsModules = [];

      files.forEach( ( file ) => {
        let packageName = this.getPackageName(file);
        imports.push(`import ${packageName} from "${file}";`);
        exportsModules.push(`${packageName}`);
      });

      let template = `${imports.join('\n')} export default {
          ${exportsModules.join(',\n')}
        }
      `;
      this.createFile(filename, template).then( callback );
    });
    return;
  }
};
