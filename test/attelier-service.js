import { existsSync } from 'fs';
import tempfile from 'tempfile';
import tempWrite from 'temp-write';
import test from 'ava';
import path from 'path';

import 'babel-register';
import attelierService from '../src/server/services/attelier';

const TEMP_FILE_NAME = 'testComponent.jsx';

function createTempComponent() {
  return tempWrite.sync('', TEMP_FILE_NAME);
}

test('should get list of components using folder path', t => {
  let component = createTempComponent();
  let path = component.replace(TEMP_FILE_NAME, '**/*.jsx');
  return attelierService.getComponentsPaths(path).then(components => {
    t.same(components, [component]);
  });
});

test('should create .attelier folder and the components file', t => {
  let tempPath = tempfile().replace(/(\/[^/]+)$/, '');
  let expectFilePath = path.join(tempPath, '.attelier/components.jsx');
  return attelierService.createFile(tempPath, '').then(() => {
    t.ok(existsSync(expectFilePath));
  });
});

test('should get export file components template', t => {
  let componentPath = tempfile('.jsx');
  let componentName = componentPath.split('/').pop().replace('.jsx', '');
  let expectedTemplate = `
      import ${componentName} from "${componentPath}";
      export default {
        ${componentName}
      };
  `;
  let template = attelierService.getComponentsFileTemplate([componentPath]);
  t.is(template.trim(), expectedTemplate.trim());
});

test('should create export file components', t => {
  let component = createTempComponent();
  let rootPath = component.replace(TEMP_FILE_NAME, '');
  let componentsPath = './';
  let exportFileComponents = `${rootPath}.attelier/components.jsx`;
  attelierService.createExportFileComponents(rootPath, componentsPath, () => {
    t.ok(existsSync(exportFileComponents));
  });
});
