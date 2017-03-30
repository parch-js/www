## Controllers

Controllers handle your application logic. The base Parch controller provides you
with lifecycle hooks, models, finders and error handling and allows you to extend
it with your own functionality

A very basic controller will look like this

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
