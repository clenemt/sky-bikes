# sky-bikes

Holds the frontend code for the sky-bikes app.

## :tada: Getting Started

### :memo: Prerequisites

Install [nvm](https://github.com/creationix/nvm) globally if you don't have it:

```sh
brew install nvm
nvm install
```

Install [yarn](https://github.com/yarnpkg/yarn) globally if you don't have it:

```sh
brew install yarn
```

### :building_construction: Installing

```sh
nvm use
yarn install
```

and to start the server:

```sh
# local web server accessible at http://localhost:8001
yarn start
```

## :white_check_mark: Running the tests

```sh
yarn test
```

## :rocket: Deployment

```sh
# will output bundles to → /dist
yarn build
```

and to analyze your output:

```sh
# local web server accessible at http://localhost:8888
yarn stats
```
