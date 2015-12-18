# React Attelier

## How to use
```!#bash
npm install -g react-attelier
attelier start
```
Now it will read the folder *'`./src/components`'*, you can customize it passing `--path` param.
It will work with webpack in the first moment.

And access [http://localhost:5656](http://localhost:5656) 

> *Enéas e Havanir piram*

## Features
+ List all components

  - Alphabetical
  - Tree view based on folder
  - By category (read from `package.json`)


+ View component rendered
+ Change property values based on propTypes

  - Create a field based on type
  - When propType is Element permit drag'n'drop
  - Understand the defaultProps


+ Show component dependencies and hierarchical structure
+ When component require and ajax url, it will allow mock
  > The mocks has to be written on:
  > 
  > `./attelier/<component>/<domain>/<url(replace dash by underline)>.json`

+ Allow associate custom mock with components configuration 

+ Bagdes to components:
  - Lint
  - Test exists
  - Test coverage


+ Auto publish on component when there is `package.json`
+ Show component `README.md`
+ Analyse the javascript code
  - Warning to deprecated features
  - Warning to use new ECMA features
