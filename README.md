# Simple Forum
Simple forum in node.js, personal project for studying purposes, it uses typescript and libraries such as react, express, stitches, multer and others.

To run it first change directory and install all packages(both in the server folder and the client one):

```
cd <server / client>
```
```
npm install # or
pnpm install # or
yarn install
```

## Client
The client is made using react and some other libraries like vite, stitches, react-icons, etc, they should be installed with one of the install commands above. The scripts to run are dev, build and preview, choose the one that fits you best.
```
<npm / yarn / pnpm> run < dev/ build / preview >
```
## Database
In the server/config/db folder there is a sql file, run it however you like(CLI, Dbeaver, azure data studio...)e, just make sure you got a more recent Postgresql version

## Server
The server uses express and should also be installed with one of the install commands shown before. There are also two scripts in the project , dev and build.
Again, to run it use:
```
<npm / yarn / pnpm> run < dev / build >
```
That's it, make sure that the database, client and server are running and can contact each other and the application should be fully functional, have fun.
