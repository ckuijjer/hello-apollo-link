# hello-apollo-link

Playground for [apollo-link-rest](https://github.com/apollographql/apollo-link-rest).

It retrieves _ckuijjer_'s github profile and repositories either via the GraphQL GitHub API v4 or via the REST GitHub API v3. In the latter case it uses _apollo-link-rest_ to query the REST endpoints.

To play with this

Create a `.env.local` in the root folder containing a [GitHub Personal access token](https://github.com/settings/tokens)

```
REACT_APP_PERSONAL_ACCESS_TOKEN=XXX
```

Switch between v3 and v4 of the API by changing `USE_REST` constant in _GitHubUser.js_