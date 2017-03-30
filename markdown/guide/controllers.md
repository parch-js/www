## Controllers

- <a class="scrollable link link_primary" href="#lifecycle-hooks">Lifecycle Hooks</a>
- <a class="scrollable link link_primary" href="#dao">Dao</a>
- <a class="scrollable link link_primary" href="#models">Models</a>

Controllers handle your application logic. By providing the 5 basic CRUD actions,
you can be up and running in no time.

`lib/controllers/user_controller.js`

```javascript
import { Controller } from "parch";

export default UserController extends Controller {
  index(req, res, next) {
    return this.findAll(req.query).then(users => {
      res.send(this.STATUS_CODES.SUCCESS, { users });
    }).catch(next);
  }

  show(req, res, next) {
    return this.findOne(req.params.userId).then(user => {
      res.send(this.STATUS_CODES.SUCCESS, { user });
    }).catch(next);
  }

  create(req, res, next) {
    return this.createRecord(req.body.user).then(user => {
      res.send(this.STATUS_CODES.CREATED, { user });
    }).catch(next);
  }

  update(req, res, next) {
    return this.updateRecord(req.params.userId, req.body.user).then(user => {
      res.send(this.STATUS_CODES.SUCCESS, { user });
    }).catch(next);
  }

  destroy(req, res, next) {
    return this.updateRecord(req.params.userId).then(() => {
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
    return this.findAll(req.query).then(users => {
      res.send(this.STATUS_CODES.SUCCESS, { users });
    }).catch(next);
  }

  show(req, res, next) {
    return this.findOne(req.params.userId).then(user => {
      res.send(this.STATUS_CODES.SUCCESS, { user });
    }).catch(next);
  }

  create(req, res, next) {
    return this.createRecord(req.body.user).then(user => {
      res.send(this.STATUS_CODES.CREATED, { user });
    }).catch(next);
  }

  update(req, res, next) {
    return this.updateRecord(req.params.userId, req.body.user).then(user => {
      res.send(this.STATUS_CODES.SUCCESS, { user });
    }).catch(next);
  }

  destroy(req, res, next) {
    return this.updateRecord(req.params.userId).then(() => {
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
    return this.findAll(req.query).then(users => {
      res.send(this.STATUS_CODES.SUCCESS, { users });
    }).catch(next);
  }

  show(req, res, next) {
    // findOne will return a single record and takes an id
    return this.findOne(req.params.userId).then(user => {
      res.send(this.STATUS_CODES.SUCCESS, { user });
    }).catch(next);
  }

  create(req, res, next) {
    // builds, validates, and creates the record
    return this.createRecord(req.body.user).then(user => {
      res.send(this.STATUS_CODES.CREATED, { user });
    }).catch(next);
  }

  update(req, res, next) {
    // updates the record
    return this.updateRecord(req.params.userId, req.body.user).then(user => {
      res.send(this.STATUS_CODES.SUCCESS, { user });
    }).catch(next);
  }

  destroy(req, res, next) {
    // destroys the record
    return this.updateRecord(req.params.userId).then(() => {
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
