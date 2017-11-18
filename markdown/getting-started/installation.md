## Installation and Scaffolding

Let's assume you already have [node.js](https://nodejs.org) installed. Create a
new directory for you project and move into it.

Install [parch-cli](https://github.com/dylanfoster/parch-cli)

```javascript
npm install -g parch-cli
```

Create your new project directory

```bash
mkdir my-api
cd my-api
```

Scaffold your new project

```javascript
parch new
```

You should now have the following structure

```bash
├── config
│   └── db.js
├── lib
│   ├── controllers
│   │   └── foo.js
│   ├── data
│   │   ├── logs
│   │   └── migrations
│   ├── models
│   │   └── foo.js
│   └── app.js
├── test
│   ├── controllers
│   │   └── foo_tests.js
│   └── models
│       └── foo_tests.js
├── README.md
├── config.js
├── index.js
└── package.json
```
