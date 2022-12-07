# simple-forum
simple forum in node.js, personal project for training purposes.

To run it simply install all packages(both in the server folder and the client one) with:
```
npm install # or
pnpm install # or
yarn install
```

## Client
The client is made using React and some other libraries like stitches, react-icons, etc, they should install with one of the install commands above.
There are only two scripts in this react project, build and watch, build will of course build the project using esbuild and place it in the dist folder on the root of the client, watch is used for development building the project every time some file changes.
```
<npm / yarn / pnpm> run <build / watch>
```
To actually access the web page there is an index.html on the public directory with a link to the bundle, just open it in a web browser.


## Server
The server uses postgresql and express and should also be install with one of the install commands shown before. There are also two scripts in the project , run and start.
Again, to run it use:
```
<npm / yarn / pnpm> run <start / dev>
```
That's it, make sure that both client and server are running and can contact each other and the application should be fully function, enjoy!
