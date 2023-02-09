# Smart Storage System

## Available Scripts

In the project directory, you can run:

### `pnpm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `pnpm test`

### `pnpm build`

## Rules

- Import order in packages: 
  1. External Packages first.
  2. Local Packages.
  3. Style last.
```
import React from 'react';
import App from './App';
import './assets/scss/main.scss';
```