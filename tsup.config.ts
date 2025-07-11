import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: process.env.NODE_ENV === 'production',
  external: ['react', 'react-dom'],
  platform: 'browser',
  target: 'es2015',
  keepNames: true,
  globalName: 'DatanovaReact',
});
