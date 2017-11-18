## Controllers

- <a class="scrollable link link_primary" href="#structure">Folder Structure</a>
- <a class="scrollable link link_primary" href="#lifecycle-hooks">Lifecycle Hooks</a>
- <a class="scrollable link link_primary" href="#dao">Dao</a>
- <a class="scrollable link link_primary" href="#models">Models</a>

Controllers handle your application logic. By providing the 5 basic CRUD actions,
you can be up and running in no time.

`lib/controllers/users.js`

```javascript
import { Controller } from "parch";

export default UserController extends Controller {
  index(req, res, next) {
    return this.store.findAll("user", req.query).then(users => {
      res.send(this.STATUS_CODES.SUCCESS, { users });
    }).catch(next);
  }

  show(req, res, next) {
    return this.store.findOne("user", req.params.userId).then(user => {
      res.send(this.STATUS_CODES.SUCCESS, { user });
    }).catch(next);
  }

  create(req, res, next) {
    return this.store.createRecord("user", req.body.user).then(user => {
      res.send(this.STATUS_CODES.CREATED, { user });
    }).catch(next);
  }

  update(req, res, next) {
    return this.store.updateRecord("user", req.params.userId, req.body.user).then(user => {
      res.send(this.STATUS_CODES.SUCCESS, { user });
    }).catch(next);
  }

  destroy(req, res, next) {
    return this.store.destroyRecord("user", req.params.userId).then(() => {
      res.send(this.STATUS_CODES.NO_CONTENT);
    }).catch(next);
  }
}
```

Add your route map

`lib/app.js`

```javascript
const app = new Application({
});

app.map(function () {
  this.resource("foo");
});
```

With the above controller and route map, you'll end up with the following


```
GET    /foos
GET    /foos/:fooId
POST   /foos
PUT    /foos/:fooId
DELETE /foos/:fooId
```
<a class="scrollable link link_primary" href="#top">⬆ back to top</a>

<a id="structure"></a>
### Folder Structure

As your app continues to grow, keeping things clean is important to ensure quality and ease of navigation. To this end parch supports a nested controller structure, essentially placing each crud method in its own file.

```
├── lib
│   ├── controllers
│   │   ├── user
│   │   │   ├── create.js
│   │   │   ├── destroy.js
│   │   │   ├── index.js
│   │   │   ├── show.js
│   │   │   └── update.js
```

#### Resource

With this structure in place there are two notable changes. First, the crud method name has changed to `model`.

```
export default class CreateUserController extends parch.Controller {
  model(req, res, next) {
    db.Users.create(req.body.user).then(user => {
      res.send(200, { user });
    }).catch(next);
  }
}
```

In addition to the main action change, hooks have also been renamed and are
defined directly as class methods.

```
export default class CreateUserController extends parch.Controller {
  beforeModel(req, res, next) {
  }

  model(req, res, next) {
  }

  afterModel(req, res, next) {
  }
}
```

#### Route & Namespace

With the nested folder structure, `route` and `namespace` continue to work the same,
only now they as well are defined in their own file.

```
app.map(function () {
  this.route("/foo/bar", { using: "foo:bar", method: "get" });
});
```

With this route defined, the router will look for the `bar.js` file inside the
`foo` folder. When the route is hit, as with resource, the beforeModel, model, and afterModel methods will be called.

<a class="scrollable link link_primary" href="#top">⬆ back to top</a>

<a id="lifecycle-hooks"></a>
### Lifecycle Hooks

Lifecycle hooks allow you to do work before and after the initial request. Each
method (including your own custom ones) can have before and after hooks. Using
the above example, we could add a before create hook to check permissions.

```javascript
import { Controller } from "parch";

export default UserController extends Controller {
  constructor(registry) {
    super(registry);

    this.hooks = {
      create: {
        before(req, res, next) {
          return utils.checkPermissions(req).then(() => next).catch(next);
        }
      }
    }
  }

  index(req, res, next) {
    return this.store.findAll("user", req.query).then(users => {
      res.send(this.STATUS_CODES.SUCCESS, { users });
    }).catch(next);
  }

  show(req, res, next) {
    return this.store.findOne("user", req.params.userId).then(user => {
      res.send(this.STATUS_CODES.SUCCESS, { user });
    }).catch(next);
  }

  create(req, res, next) {
    return this.store.createRecord("user", req.body.user).then(user => {
      res.send(this.STATUS_CODES.CREATED, { user });
    }).catch(next);
  }

  update(req, res, next) {
    return this.store.updateRecord("user", req.params.userId, req.body.user).then(user => {
      res.send(this.STATUS_CODES.SUCCESS, { user });
    }).catch(next);
  }

  destroy(req, res, next) {
    return this.store.destroyRecord("user", req.params.userId).then(() => {
      res.send(this.STATUS_CODES.NO_CONTENT);
    }).catch(next);
  }
}
```
<a class="scrollable link link_primary" href="#top">⬆ back to top</a>

<a id="dao"></a>
### Dao

The dao is how you access your data. The base controller provides you with five
basic dao methods allowing you to find, create, update and delete records. In addition
to querying and creating data, the dao also handles errors and validation for you
as well as provide you with advanced filtering in the case of `findAll` and `findOne`.
For all available options see [sequelize](http://docs.sequelizejs.com/en/v3/docs/querying/).

```javascript
import { Controller } from "parch";

export default UserController extends Controller {
  index(req, res, next) {
    // findAll will return all records and takes an optional query object
    return this.store.findAll("user", req.query).then(users => {
      res.send(this.STATUS_CODES.SUCCESS, { users });
    }).catch(next);
  }

  show(req, res, next) {
    // findOne will return a single record and takes an id
    return this.store.findOne("user", req.params.userId).then(user => {
      res.send(this.STATUS_CODES.SUCCESS, { user });
    }).catch(next);
  }

  create(req, res, next) {
    // builds, validates, and creates the record
    return this.store.createRecord("user", req.body.user).then(user => {
      res.send(this.STATUS_CODES.CREATED, { user });
    }).catch(next);
  }

  update(req, res, next) {
    // updates the record
    return this.store.updateRecord("user", req.params.userId, req.body.user).then(user => {
      res.send(this.STATUS_CODES.SUCCESS, { user });
    }).catch(next);
  }

  destroy(req, res, next) {
    // destroys the record
    return this.store.destroyRecord("user", req.params.userId).then(() => {
      res.send(this.STATUS_CODES.NO_CONTENT);
    }).catch(next);
  }
}
```
<a class="scrollable link link_primary" href="#top">⬆ back to top</a>

<a id="models"></a>
### Models

In addition to the basic dao, you also have access to the raw model classes. The
`model` property will be set based on the controller name (e.g. FooController => `foo`)
and provides low level access to the [sequelize model class](http://docs.sequelizejs.com/en/v3/api/model/#class-model). You also have access to _all_ models via the
`models` property.

```javascript
import { Controller } from "parch";

export default UserController extends Controller {
  index(req, res, next) {
    return this.model.findAll(req.query).then(users => {
      res.send(this.STATUS_CODES.SUCCESS, { users });
    }).catch(next);
  }

  show(req, res, next) {
    return this.models.SomeOtherModel.findOne(req.params.someId).then(user => {
      res.send(this.STATUS_CODES.SUCCESS, { user });
    }).catch(next);
  }
}
```
<a class="scrollable link link_primary" href="#top">⬆ back to top</a>
