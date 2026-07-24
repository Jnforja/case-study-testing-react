# Testing a React application: case study

A test-driven React case study that explores test boundaries, asynchronous UI
states, API isolation, and incremental implementation.

[Live demo](https://jnforja.github.io/case-study-testing-react/) ·
[Read the full article](https://joaoforja.com/articles/how-to-write-tests-react-app-case-study)

## What it demonstrates

The application fetches and displays characters from the Rick and Morty API.
The small product surface makes it possible to focus on the decisions behind
the tests:

- Starting from behavior visible to the user
- Choosing boundaries that keep tests useful through refactoring
- Covering loading, empty, error, single-result, and multiple-result states
- Using dependency injection to make UI behavior deterministic
- Verifying both sides of a mocked module's contract
- Replacing the remote API with MirageJS in integration tests
- Implementing one observable behavior at a time

## Testing strategy

The UI tests interact with the page through accessible queries and replace the
data-fetching function with controlled test doubles. Separate API tests use a
MirageJS server to verify successful responses, error handling, and the data
shape returned to the UI.

The commit history preserves the incremental process used in the accompanying
article, with a commit for each newly passing behavior.

## Run locally

This is a historical case study and its dependencies reflect the React
ecosystem at the time it was written.

```bash
yarn install
yarn start
```

Run the tests:

```bash
yarn test
```

## Stack

React · Testing Library · Jest · MirageJS · Create React App

## Status

Published as an educational case study. For my current work and recent
engineering experience, visit [joaoforja.com](https://joaoforja.com).
