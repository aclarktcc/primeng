# PrimeNG
UI Components for Angular

See [PrimeNG homepage](http://www.primefaces.org/primeng) for live showcase and documentation.

![alt text](https://www.primefaces.org/primeng/assets/showcase/images/primeng-sidebar.svg "PrimeNG")

How to Export Components:

After the source code is updated, the components need to be exported to update the TCC node module.

1. Open a Powershell terminal
2. From project root, type: node_modules/.bin/ngc -p tsconfig-tcc.json
Note: if you get an error about 'ngc is not recognized', make sure you have all the necessary modules installed
by typing: npm install
3. The script will build two folders off root (if not already there), /compiled and npm/components.
Note: There are several /components folders in the project. You know it's the right one because there will be at least one *.d.ts and *.js file in each component folder.
4. The npm directory needs to be uploaded. Update the version and publish to NPM.
5. The /compiled directory can be ignored. It contains the ngFactories used to create the /components.
