<a id="toc"></a>
## Configuration

- <a class="scrollable link link_primary" href="#authentication">Authentication</a>
- <a class="scrollable link link_primary" href="#controllers">Controllers</a>
- <a class="scrollable link link_primary" href="#serializers">Serializers</a>
- <a class="scrollable link link_primary" href="#database">Database</a>
- <a class="scrollable link link_primary" href="#initializers">Initializers</a>
- <a class="scrollable link link_primary" href="#logging">Logging</a>
- <a class="scrollable link link_primary" href="#server">Server</a>
- <a class="scrollable link link_primary" href="#namespace">Namespace</a>

Parch makes it easy to configure your API with sensible defaults. *Most* options
can be left alone and will be configured for you, however each can be overridden.

<a id="authentication"></a>
### Authentication

Authentication in Parch is handled via [jwt](https://jwt.io/) and can be configured with the
authentication object

```javascript
import { Application } from "parch";

const app = new Application({
  authentication: {
    secret: "foo"
  }
});
```

Routes that should not be behind authentication can be configured via the
`unauthenticated` property which is passed to [restify-jwt](https://www.npmjs.com/package/restify-jwt)

```javascript
import { Application } from "parch";

const app = new Application({
  authentication: {
    secret: "foo",
    unauthenticated: [/\users\/authenticate/, { url: "/users", methods: ["post"] }]
  }
});
```
<a class="link link_primary" href="#toc">⬆ back to top</a>

<a id="controllers"></a>
### Controllers

By default, Parch will look for your controllers in the controllers directory
relative to where you constructed your application. For example, if using parch-cli,
your controllers will be located in `<app-name>/lib/controllers/`. This can be
overridden by passing the `controllers.dir` option

```javascript
import { Application } from "parch";

const app = new Application({
  controllers: {
    dir: path.resolve(__dirname, "some/path/to/controllers")
  }
});
```
<a class="link link_primary" href="#toc">⬆ back to top</a>

<a id="serializers"></a>
### Serializers

Serializers allow you to customize how your data is transformed. By default parchuses a plain JSONSerializer, however this can be overridden by specifying a serializer for each model you want to customize

#### JSONSerializer

The JSONSerializer is the most basic building block of all the serializers. It
simply returns the exact instance that is passed to it.

```javascript
const instance = await UserModel.create({});

const serialized = await serializer.normalizeResponse(instance, "createRecord");

// instance === serialized
```

#### RESTSerializer

The RESTSerializer formats your data following the `{ [key]: [instance(s)] }` format. This fits well the [Ember's RESTAdapter](https://www.emberjs.com/api/ember-data/2.15.3/classes/DS.RESTAdapter)
and is based loosely on that concept. In addition to formatting the basic
structure, this serializer also adds your model relationships automatically as
an array of ids

```javascript
const instance = await UserModel.create({});

const serialized = await serializer.normalizeResponse(instance, "createRecord")

/**
 * {
 *   "user": {
 *     "someHasMany": [1, 2, 3]
 *   }
 * }
 */
```

#### JSONAPISerializer

> TBD

<a class="link link_primary" href="#toc">⬆ back to top</a>

<a id="database"></a>
### Database

The database options allow you to configure both your database connection as well
as your models location. Parch offers you a default connection setting for
[sqlite](https://www.npmjs.com/package/sqlite) with `test` as the username and
password so this should be changed before shipping to production. For all available
connection options see [Sequelize](http://docs.sequelizejs.com/en/v3/docs/getting-started/#setting-up-a-connection). Like controllers, Parch will look for your models
in the `models` directory relative to where you construct your app unless you
specify otherwise.

```javascript
import { Application } from "parch";

const app = new Application({
  database: {
    connection: {
      dialect: "postgres",
      database: "postgres",
      username: "username",
      password: "password"
    },
    models: {
      dir: path.resolve(__dirname, "some/path/to/models")
    }
  }
});
```
<a class="link link_primary" href="#toc">⬆ back to top</a>

<a id="initializers"></a>
### Initializers

Initializers allow you run customizations as your app boots. Here you can do things like register extra dependencies.

```javascript
module.exports = {
  initialize(application, registry) {
    registry.register("service:worker", Worker, {
      instantiate: true,
      singleton: true
    });

    registry.inject(application, "service:worker");
  },

  name: "worker"
}
```
<a class="link link_primary" href="#toc">⬆ back to top</a>

<a id="logging"></a>
### Logging

Parch offers its own instance of [Bunyan](https://github.com/trentm/node-bunyan)
with a default stream of stdout. The logger itself, a logging directory and custom
serializers can be configured.

To pass your own logger use the `log` option

```javascript
import { Application } from "parch";

const app = new Application({
  log: Bunyan.createLogger({ name: "api" })
});
```

To add a log directory or custom serializers, use the `logging` option

```javascript
import { Application } from "parch";

const app = new Application({
  logging: {
    dir: path.resolve(__dirname, "lib/data/logs"),
    serializers: {
      req(req) {
        return {
          httpVersion: req.httpVersion,
          method: req.method,
          params: req.params,
          query: req.query,
          url: req.url
        };
      },
      res(res) {
        if (!res) { return false; }

        return {
          statusCode: res.statusCode,
          headers: res.headers
        };
      }
    }
  }
});
```
<a class="link link_primary" href="#toc">⬆ back to top</a>

**Note: in 2.x, all logging options will be combined in the `logging` option**

<a id="server"></a>
### Server

The server options allow you to configure your server as well as your
custom middleware. Your middleware will always be run *after* Parch's. All server
options with the exception of `middleware` are passed directly to [restify](http://restify.com/).

```javascript
import { Application } from "parch";

const app = new Application({
  server: {
    middleware: [fooMiddleware(), barMiddleware]
  }
});
```
<a class="link link_primary" href="#toc">⬆ back to top</a>

<a id="namespace"></a>
### Namespace

Namespace allows you to add a global namespace to all your routes (e.g. `/api`)

```javascript
import { Application } from "parch";

const app = new Application({
  namespace: "api"
});
```
<a class="link link_primary" href="#toc">⬆ back to top</a>
