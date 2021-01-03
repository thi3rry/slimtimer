# Slim Timer

Initialized 2020-12-31

From : https://slimtimer.wordpress.com/2019/11/17/slimtimer-shutting-down-on-dec-15-2019/
Features : https://www.youtube.com/watch?v=CeedXS-eZTI

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and enzyme
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).

## Resources

- [Preact](https://preactjs.com/guide/v10/getting-started/)
- [React Lifecycle](https://twitter.com/dan_abramov/status/981712092611989509)
- [TailwindCSS with pReact](https://dev.to/boywithsilverwings/configuring-preact-cli-with-tailwind-css-3ckj)
  - https://nystudio107.com/blog/speeding-up-tailwind-css-builds
  - [Tailwindcss slow webpack compilation](https://rubyyagi.com/solve-slow-webpack-compilation/)
- [FontAwesome with React](https://fontawesome.com/how-to-use/on-the-web/using-with/react)

### PostCSS8 compatibility

- [Compatibility with preact/tailwindcss/postcss7](https://tailwindcss.com/docs/installation#post-css-7-compatibility-build)

```shell
npm uninstall tailwindcss @tailwindcss/postcss7-compat
npm install tailwindcss@latest postcss@latest autoprefixer@latest
```
