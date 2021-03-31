# bookish-js
Model answer to the Book(ish) challenge in JS

## Setting up Part 2

### Add Babel 

```
npm i @babel/cli @babel/node @babel/core @babel/preset-env --save-dev
```

.babelrc

```
{
  "presets": ["@babel/preset-env"]
}
```

package.json

```
"build": "babel ./ --out-dir dist/ --ignore ./.git,./node_modules,./.babelrc,./package.json,./npm-debug.log,./sql,./README.md "
```

Note: no --copy-files needed, and if included takes precendence over --ignore

### Add express

npm i express




Copyright © 2017 Softwire - All Rights Reserved
