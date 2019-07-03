# Frontend

## Components

This project leverages [Ant Design](https://ant.design/docs/react/introduce).
All custom React components live in `src/components/`.

## Graphics

The website draws fractal templates and attractors with HTML Canvas. Shapes are
represented with a
[chain-of-responsibility](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern). A fractal is represented as a set of
[transformation matrices](https://github.com/ElliotPenson/fractal.parts/blob/master/frontend/src/graphics/Transformation.js).

## Development

After installing dependencies (`npm i`), launch the app with `npm start`. Run
tests with `npm test`. Deploy to production with `./deploy`.
