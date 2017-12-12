[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Join the chat at https://gitter.im/primefaces/primeng](https://badges.gitter.im/primefaces/primeng.svg)](https://gitter.im/primefaces/primeng?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# PrimeNG

UI Components for Angular

See [PrimeNG homepage](http://www.primefaces.org/primeng) for live showcase and documentation.

![alt text](https://www.primefaces.org/primeng/assets/showcase/images/primeng-sidebar.svg "PrimeNG")

If you have trouble with running the export and npm scripts or do not have the proper access to the GitHub / NPM account, contact Adam Clark, James Poer, or Jeffrey Yankey

GitHub: https://github.com/aclarktcc/primeng
NPM: https://www.npmjs.com/package/tcc-primeng

How to Export Components:

After the source code is updated, the components need to be exported to update the TCC node module.

1. Open a Powershell terminal (VSCode Terminal works well)
2. From project root, type (or copy/paste): node_modules/.bin/ngc -p tsconfig-tcc.json
Note: if you get an error about 'ngc is not recognized', make sure you have all the necessary modules installed
by typing: npm install
3. The script will build two folders off root (if not already there), /compiled and npm/components.
Note: There are several /components folders in the project. You know it's the right one because there will be at least one *.d.ts and *.js file in each component folder.
4. The /compiled directory can be ignored. It contains the ngFactories used to create the npm/components.
5. The npm directory needs to be uploaded to NPMJS. Continue to the Update and Publish New NPM steps.

How to Update and Publish New NPM:

1. cd npm
2. Confirm the npm/components folder was just created by the date-time stamp. If not correct, go back and run the Export Component steps.
3. Depending on the update (Major, Minor, Patch), update the npm/package.json by typing: npm version patch, npm version minor, or npm version major. Our 508 updates are considered patches. Major and minor patches will normally come from upstream PrimeNG changes.
4. Confirm the version incremented correctly (i.e. 1.1.1 -> npm version patch -> 1.1.2)
5. Type: npm publish
6. Confirm the update published at https://www.npmjs.com/package/tcc-primeng with the correct version number.
7. Add, Commit, and Push your changes to the GitHub account. In your commit message, include your update version number (ex. Added 508 updates to XXXX v1.1.5). 
8. Inform Adam Clark or James Poer about the update and version change. You may be requested to submit a pull request to PrimeNG to include our updates in their UI components.