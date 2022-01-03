# With Next Endpoint

Easily turn simple functions into Next.js handlers. Includes
`withAuthEndpoint()` for Auth0 authentication.

## Example

##### Simple

A request to `/api/getData?a=4&b=6` will return `{ sum: 10 }`. 

```ts
// pages/api/getData.ts

interface GetDataArgs {
  a: number;
  b: number;
}

/**
 * Exporting allows you to call this from other API functions directly, e.g.
 * in your frontend via `import { getData } from ...`.
 */
export const getData: ApiFunction<GetDataArgs> = ({ a, b }) => {
  return {
    sum: Number(a) + Number(b);
  };
}

export default withEndpoint(getData);
```

##### Authentication

You can register an `ApiAuthFunction` to get access to the Auth0 `session`
params. These functions can only run on the server.

```ts
// pages/api/updateUser.ts

/**
 * Every function which relies on auth should accept a { session } param
 * containing the Auth0 session.
 * 
 * You can still import this from other API functions and use it directly,
 * simply pass the { session } param.
 */
export const updateUser: ApiAuthFunction = ({ session, id, params }) => {
  if (isAdmin(session.user.sub)) {
    applyChangesToUser({ id, params });
  }
}

/**
 * Will wrap with Auth0's `withAuthenticationRequired` and assert a valid 
 * session inside the handler.
 */
export default withAuthEndpoint(updateUser);
```

## Developing

This project is a [tszip](https://github.com/tszip/tszip) package written in
TypeScript with the latest ESNext syntax in `src/` and compiled to ES module
output in `dist/`.

### Editing

To watch for changes:

```
yarn dev
```

### Building

To build the release package:

```
yarn build
```

### Publishing

To compile the release build and publish to NPM:

```
yarn publish
```