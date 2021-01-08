# Slim Timer

Initialized 2020-12-31

From an old SlimTimer project by Richard White.
Since it is not available https://slimtimer.wordpress.com/2019/11/17/slimtimer-shutting-down-on-dec-15-2019/
I just want to get the features to create a new project for learning React & TailwindCSS skills with a performance and offline first approach.

For full features of the original SlimTime see this video of Richard White. : https://www.youtube.com/watch?v=CeedXS-eZTI

## Demo

Hosted on [Vercel](https://vercel.com) here : [https://slimtimer.vercel.app](https://slimtimer.vercel.app/)

## TODO

- [ ] show last elapsed time for each task
- [ ] add tags to tasks
- [ ] List all timelogs in separate page
- [ ] only show current tasks in progress
- [ ] Test service-worker and offline support
- [ ] display a table of tags with elapsed time of each
- [ ] display a graph (camenbert) of tags & task by : day/week/month
- [ ] display a graph (courbes) of tags & task by : day/week/month
- [ ] Simple log message (date/message/tag)
- [ ] Calendar view of timelogs

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
