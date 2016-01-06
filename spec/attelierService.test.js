import fs, { existsSync } from 'fs';
import path from 'path';
import test from 'tape';

// Attelier service
import AttelierService from '../src/server/services/attelier.js';

test('Should create component file', function (t) {
  // Given
  let filename = path.join(__dirname, 'component.jsx');
  // When
  AttelierService.createComponentFile(filename, function(){
    // Then
    t.equal(existsSync(filename), true);
    t.end();
    // Teardown
    fs.unlink(filename);
  });
});

test('Should return packageName', function(t) {
  // Given
  let path = './src/components/myPackage.jsx';
  // When
  let actual = AttelierService.getPackageName(path);
  let expected = 'myPackage';
  // Then
  t.equal(actual, expected);
  t.end();
});
