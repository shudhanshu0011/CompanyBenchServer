'use strict'

const app = require('./app');
const port = process.env.STORY_PORT || 3001

app.listen(port, () =>
  console.log(`[TIQ-SVC] Service is listening on port ${port}.`)
);
