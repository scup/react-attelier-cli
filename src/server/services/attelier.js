import fs from 'fs';
import glob from 'glob';

const CACHE_DIR = '.attelier';
const PATTERN_EXT = /.js|.jsx/;
const COMPONENT_FILE = `${CACHE_DIR}/component.jsx`;

export default {
  getComponents(pathname) {
    return new Promise( (resolve, reject) => {
      glob(`${pathname}/**/*.js`, (err, files) => {
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
    return filename.split('/').pop().replace(PATTERN_EXT, '');
  },

  createComponentFile(pathname, callback ) {
    this.getComponents(pathname).then( (files) => {
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

      let filename = `${pathname}/${COMPONENT_FILE}`;
      this.createFile(filename, template).then( callback );
    });
    return;
  }
};
