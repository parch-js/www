## Logging

Logging is handled via an internal [Bunyan](https://github.com/trentm/node-bunyan)
instance. The logger is then injected into both the application instance, the
registry, and the req object.

```javascript
import {
  containment: { getOwner }
} from "parch";

export default class UserController extends Controller {
  index(req, res, next) {
    // const log = req.log;
    // const log = req.app.logger;
    // const log = getOwner(this).lookup("service:logger");
  }
}
```

## Errors

[restify](http://restify.com/) provides us with an easy way to render errors,
which means all we have to do in our handlers is `.catch(next)` and they will be
automatically handled for you. Parch controllers contain a reference to
[restify-errors](https://github.com/restify/errors) which means you can also
provide your own errors if you wish.

```javascript
export default class UserController extends Controller {
  show(req, res, next) {
    return this.findOne(id).then().catch(next);

    // this will return an error with the format
    // { code: "NotFound", message: "User with id 1 not found" }
  }
}
```

And with your own errors

```javascript
export default class UserController extends Controller {
  someCustomMethod(req, res, next) {
    return this.doStuff().then(stuff => {
      if (!stuff) {
        const Conflict = this.errors.ConflictError("no stuff");

        throw new Conflict();
      }
    }).catch(next);

    // this will return an error with the format
    // { code: "Conflict", message: "no stuff" }
  }
}
```
