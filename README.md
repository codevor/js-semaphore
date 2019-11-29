# 🚦js-semaphore - Syncronization Using Promises

[![License][license-badge]][license-url] [![Travis CI][travis-badge]][travis-url] [![Coverage Status][coverage-badge]][coverage-url] [![Commitizen][commitizen-badge]][commitizen-url]

🚦`js-semaphore` is a simple **Semaphore** implementation using **Promises** for JavaScript aplications.

If you ever find a need for a syncronization mechanism usage into your application, you can use a Semaphore. If you want to use a Semaphore and you develop in JavaScript, you can use `js-semaphore`!

If your need is simple and a small mechanism with just **1 shared resource**, you can use `js-semaphore` as a **Mutex** too!

The source code comprehends the full **Semaphore** implementation with some basics tests and some applications. Actually, we have:

- 🤔🍜 Philosophers Dinner

#### Common questions

- _Why the tests take so long to complete?_

As this is a Semaphore implementation, the tests are based in time and waiting for a specific resource to continue the execution. We emulate this as a test in order to validate the correct behavior of the lib.

- _Why implement a Semaphore? Using Promises?_

As a common solver for deadlocks avoidance, we found an util lib to create and test! The Promises usage is just a matter of asynchronous need.

## Installation

`js-semaphore` is available with npm/yarn:

```bash
$ npm install @codevor/js-semaphore --save
$ yarn add @codevor/js-semaphore
```

## Usage

### With ES6/import

```js
import { Semaphore } from '@codevor/js-semaphore';

// Semaphore with 1 resource = Mutex
const semaphore = Semaphore();

// Semaphore with 1 resource, starting at 0 value
const semaphore = Semaphore({ resource: 1, start: 0 });

// Semaphore with 3 resources
const semaphore = Semaphore({ resource: 3 });

// acquire the semaphore
semaphore.acquire().then(() => {
  // Your code goes here
  const x = 2 + 3;

  // remember to release the semaphore at the end of your usage
  semaphore.release();
});
```

### With require

```js
const Semaphore = require('@codevor/js-semaphore').Semaphore;

// Semaphore with 1 resource = Mutex
const semaphore = Semaphore();

// Semaphore with 1 resource, starting at 0 value
const semaphore = Semaphore({ resource: 1, start: 0 });

// Semaphore with 3 resources
const semaphore = Semaphore({ resource: 3 });

// acquire the semaphore
semaphore.acquire().then(() => {
  // Your code goes here
  const x = 2 + 3;

  // remember to release the semaphore at the end of your usage
  semaphore.release();
});
```

### Control timeout

If you want, you can control the timeout. We **hardly** suggest not let this below `0.2s`, but you can try if you want.

```js
import { Semaphore, setTimespan, timespan } from '@codevor/js-semaphore';

// creates the Semaphore
const semaphore = Semaphore();

// get the actual Timespan
const actualTimespan = timespan();

// set the actual Timespan, in seconds
setTimespan(actualTimespan / 2);

// acquire the semaphore
semaphore.acquire().then(() => {
  // Your code goes here
  const x = 2 + 3;

  // remember to release the semaphore at the end of your usage
  semaphore.release();
});
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Changelog

This project adheres to [Semantic Versioning](https://semver.org/). Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/codevor/js-semaphore/releases) page.

## Bugs and Sugestions

Report bugs or do suggestions using the [issues](https://github.com/codevor/js-semaphore/issues).

## License

[MIT License](LICENSE) © [Codevor](https://github.com/codevor)

[license-badge]: https://img.shields.io/github/license/codevor/js-semaphore.svg
[license-url]: https://opensource.org/licenses/MIT
[coverage-badge]: https://coveralls.io/repos/github/codevor/js-semaphore/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/codevor/js-semaphore?branch=master
[travis-badge]: https://travis-ci.org/codevor/js-semaphore.svg?branch=master
[travis-url]: https://travis-ci.org/codevor/js-semaphore
[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
