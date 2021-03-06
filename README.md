# sky-bikes

Holds the frontend code for the sky-bikes app. See it live at https://clenemt.github.io/sky-bikes/.

![2018-06-20 02 54 55](https://user-images.githubusercontent.com/447956/41631550-822f1a5a-7435-11e8-93d0-77936c06c43b.gif)

## :tada: Getting Started

This project uses [Jekyll](https://jekyllrb.com/) for rendering the page templates into `<html>` and [webpack](https://webpack.js.org/) for bundling the assets.

### :memo: Prerequisites

Install [Yarn](https://github.com/yarnpkg/yarn) and [Ruby](https://www.ruby-lang.org/en/):

```sh
brew install yarn
brew install ruby
```

### :building_construction: Installing

```sh
gem install jekyll
yarn install
```

and to start the server:

```sh
# local web server accessible at http://localhost:4000/sky-bikes/
yarn start
```

## :white_check_mark: Running the tests

```sh
yarn test
# or to see the coverage
yarn coverage
```

## :rocket: Deployment

```sh
# will output files to → /docs
yarn build
```

and to analyze your output:

```sh
# local web server accessible at http://localhost:8888
yarn stats
```

## :page_facing_up: License

Licensed under [MIT](LICENSE.md).
