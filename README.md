# Try it out

https://bethebunny.github.io/lorentz

# Local development

I recommend using VSCode for development.

1. Make sure npm is installed locally.

2. Clone this repo (all further commands run from the root repo directory)

3. Install dependencies

I've tuned the webpack settings purely for development / fast (<2s) iteration time;
this can easily explode if you install any more dependencies, so I recommend the incantations below
```
sudo npm install -g webpack webpack-cli ts-loader
npm install
npm link ts-loader
```

4. Build -- this will set up a watcher to rebuild on file changes

```
webpack build --watch
```

5. Local webserver

```
cp index.html dist/index.html
cd dist
python -m http.server
```

6. Open your browser to https://localhost:8000

Now you should be able to make code changes, save the file, and refresh the browser page to see them reflected! You should also get source maps in the Chrome debugger.