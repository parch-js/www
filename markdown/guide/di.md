## Dependency Injection

Dependency injection (DI) consists of two concepts in Parch; the Registry and containment. DI is how parch registers its shared dependencies so that they can be used across
different boundaries.

### Registry

The registry is what contains references to all dependencies and allows for injections.

```javascript
import {
  containment: { getOwner }
} from "parch";

export default class UserController extends Controller {
  fooMethod(req, res, next) {
    const registry = getOwner(this);
    const logger = registry.lookup("service:logger");

    registry.register("service:foo", { foo: "bar" });
    registry.lookup("service:foo") // { foo: "bar" }
  }
}
```

### Containment

Containment allows you to set and get the containing object of another. Parch
uses a WeakMap to keep references to all your containers and allows for easy
lookups.

```javascript
import {
  containment: { getOwner, setOwner }
} from "parch";

export default class UserController extends Controller {
  constructor(registry) {
    // this is done automatically in controllers but as an example
    setOwner(this, registry);
  }

  fooMethod(req, res, next) {
    const registry = getOwner(this);
    const logger = registry.lookup("service:logger");

    registry.register("service:foo", { foo: "bar" });
    registry.lookup("service:foo") // { foo: "bar" }
  }
}
```
