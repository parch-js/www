## Models

- <a class="link link_primary" href="#relationships">Relationships</a>
- <a class="link link_primary" href="#hooks-and-methods">Hooks, Methods, and Configuration</a>

Models define your data. The base model provides you with ways to define your
attributes, add relationships, and run lifecycle hooks. For all available definition
options, see [sequelize](http://docs.sequelizejs.com/en/v3/docs/models-definition/#data-types)

`lib/models/user_model.js`

```javascript
import { Model } from "parch";

export default class UserModel extends Model {
  define(dataTypes) {
    const user = {
      firstName: {
        type: dataTypes.STRING
      },
      email: {
        type: dataTypes.STRING,
        validate: {
          isEmail: true
        }
      }
    };

    return user;
  }
}
```
<a class="link link_primary" href="#top">⬆ back to top</a>

<a id="relationships"></a>
### Relationships

Relationships are defined through the `associate` hook. Methods and accessors
are defined by [sequelize](http://docs.sequelizejs.com/en/v3/docs/associations/)

```javascript
import { Model } from "parch";

export default class UserModel extends Model {
  associate(User, models) {
    User.hasMany(models.Post);
    User.belongsToMany(models.Project, { through: "UserProject" });
  }

  define(dataTypes) {
    const user = {
      firstName: {
        type: dataTypes.STRING
      },
      email: {
        type: dataTypes.STRING,
        validate: {
          isEmail: true
        }
      }
    };

    return user;
  }
}
```
<a class="link link_primary" href="#top">⬆ back to top</a>

<a id="hooks-and-methods"></a>
### Lifecycle Hooks, Class Methods and Instance Methods

The rest of model definition is done through the constructor. Lifecycle hooks,
instance and class methods, validations, etc are all passed directly to [sequelize](http://docs.sequelizejs.com/en/v3/docs/models-definition/)

```javascript
import { Model } from "parch";

export default class UserModel extends Model {
  constructor() {
    super({
      classMethods: {
        sendUserEmail(email) {
          return helpers.sendEmail(email);
        }
      },

      hooks: {
        beforeCreate(user) {
          return utils.password
            .hash(user.password)
            .then(hashed => {
              user.password = hashed;
            });
        }
      },

      instanceMethods: {
        hasPassword(password) {
          return utils.password.compare(password, this.password);
        }
      },

      validate: {
        notDisabled() {
          if (this.disabled && !this.changed("disabled")) {
            throw new Error("User is disabled");
          }
        }
      }
    });
  }

  define(dataTypes) {
    const user = {
      firstName: {
        type: dataTypes.STRING
      },
      email: {
        type: dataTypes.STRING,
        validate: {
          isEmail: true
        }
      }
    };

    return user;
  }
}
```
<a class="link link_primary" href="#top">⬆ back to top</a>
