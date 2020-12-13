# Bitbucket Pull Request Dashboard

A Bitbucket Pull Request Dashboard

## Why
It's very hard to tell when a pull request is ready for review or working in progress or under review

### How it works
- Using [bitbucket rest api](https://api.bitbucket.org/) with [app password](https://bitbucket.org/account/settings/app-passwords/)
- [Vue](https://vuejs.org/) and [Quasar framework](https://quasar.dev/)

Note: the app password will be stored in local storage now, **ALWAYS logout on devices you don't trust**

### Features
- listing pull requests with chosen project and repositories
- showing build status
- showing user with recognizable avatar from bitbucket
- auto reload in specified secs
- update pull request state with title prefix, so the status is both visible in the dashboard and bitbucket
  - Ready: `make login credential only stored in localStorage when user ask to`, no prefix since this is the nature status when PR first created
  - WIP: `[WIP]make login credential only stored in localStorage when user ask to`
  - REVIEWING: `[REVIEWING]make login credential only stored in localStorage when user ask to`
  
### Live demo with github pages
https://lessmind.github.io/bitbucket-pr-dashboard/#

Again, the app password will be stored in local storage now, **ALWAYS logout on devices you don't trust**

### TODOs
- [ ] make login credential only stored in localStorage when user ask to

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
