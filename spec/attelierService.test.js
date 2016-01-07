import fs, { existsSync } from 'fs';
import path from 'path';
import test from 'tape';

// Attelier service
import AttelierService from '../src/server/services/attelier.js';

test('Should create component file', function (t) {
  // Given
  let filename = path.join(__dirname, 'component.jsx');
  // When
  AttelierService.createComponentFile(__dirname, function(){
    // Then
    t.equal(existsSync(filename), true);
    t.end();
    // Teardown
    fs.unlink(filename);
  });
});

test('Should return packageName', function(t) {
  // Given
  let pathname = './src/components/myPackage.jsx';
  // When
  let actual = AttelierService.getPackageName(pathname);
  let expected = 'myPackage';
  // Then
  t.equal(actual, expected);
  t.end();
});


test('Should return all components files', function(t) {
  // Given
  let pathname = path.join(__dirname, 'fixtures');
  // When
  AttelierService.getComponents(pathname).then( (files) => {
    // Then
    t.equal(1, files.length);
    t.end();
  });
});
