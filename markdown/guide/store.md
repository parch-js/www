## Accessing Data

The Parch data store provides an interface for accessing your data.

In addition to retrieving records, the store also handles fetching relationships
and giving you meaningful errors should something go wrong.

### Finding Records

To find records you can use the `findAll`, `findOne`, or `queryRecord` methods.

#### `findAll`

The findAll method returns all instances of a type and allows you to query the
database.

```javascript
return store.findAll("user");
// returns all instances of type 'user'

return store.findAll("user", { firstName: { $like: "jon" }});
// returns all instances with a name like jon
```

#### `findOne`

The findOne method allows you to find a single instance.

```javascript
return store.findOne("user", 1);
```

#### `queryRecord`

The queryRecord method allows you to query for a single record.

```javascript
return store.queryRecord("user" { firstName: "john" });
```

### Creating, Updating, and Deleting Records

#### `createRecord`

```javascript
return store.createRecord("user" {
  firstName: "John",
  lastName: "Smith"
});
```

#### `updateRecord`

```javascript
return store.updateRecord("user", 1, { firstName: "Joe" });
```

#### `destroyRecord`

```javascript
return store.destroyRecord("user", 1);
```
