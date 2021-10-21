# Try it out

https://bethebunny.github.io/lorentz

# Local development

This project is designed to be easy to both read from a browser as well
as fast and easy to develop on. It avoids webpack or similar bundlers in favor
of relying on the browser's module system directly, and minimizing the number
of dependencies, build steps, and obfuscation, while still allowing for
good coding practices like types and modules.

I recommend using VSCode for development.

1. Make sure npm and python >=3 are installed locally.

2. Clone this repo

```
git clone https://github.com/bethebunny/lorentz.git
cd lorentz
```

3. Install dependencies

```
npm install && npm install typescript
```

4. Build 

This will set up a watcher to rebuild on file changes, with <1s build times once running

```
npx tsc --project . --watch
```

5. Local webserver

```
cp index.html dist/index.html
python -m http.server -d dist
```

6. Open your browser to https://localhost:8000

Now you should be able to make code changes, save the file, and refresh the browser page to see them reflected! You should also get source maps in the Chrome debugger.
