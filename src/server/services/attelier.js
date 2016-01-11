import fs from 'fs';
import glob from 'glob';
import path from 'path';
import mkdirp from 'mkdirp';

const TEMP_DIR = '.attelier/';
const TEMP_FILE = 'components.jsx';

export default {

  getComponentsPaths(path) {
    return new Promise((resolve, reject) => {
      glob(path, (err, files) => {
        if (err) return reject(err);
        resolve(files);
      });
    });
  },

  createFile(rootPath, template) {
    return new Promise((resolve, reject) => {
      let dirPath = path.join(rootPath, TEMP_DIR);      
      mkdirp(dirPath, err => {
        if (err) return reject(false);
        let filePath = path.join(dirPath, TEMP_FILE);
        fs.writeFile(filePath, template, err => {
          if (err) return reject(false);
          resolve(true);
        });
      });
    });
  },

  getComponentsFileTemplate(componentsPaths) {
    let imports = [];
    let attributes = [];

    componentsPaths.forEach((componentPath) => {
      let componentName = componentPath.split('/').pop().replace('.jsx', '');
      imports.push(`import ${componentName} from "${componentPath}";`);
      attributes.push(componentName);
    });

    return `
      ${imports.join('\n')}
      export default {
        ${attributes.join(',\n')}
      };
    `;
  },

  createExportFileComponents(rootPath, componentsPath, callback) {
    let componentsDirectoryPath = path.join(rootPath, componentsPath, './**/*.jsx');
    this.getComponentsPaths(componentsDirectoryPath).then(paths => {
      let template = this.getComponentsFileTemplate(paths);
      this.createFile(rootPath, template).then(() => {
        return callback && callback();
      });
    });
  }
};
