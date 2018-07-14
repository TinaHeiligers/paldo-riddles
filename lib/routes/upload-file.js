'use strict';
const fs = require('fs');
const Boom = require('boom');

module.exports = {
    method: 'POST',
    path: '/upload-file',
    options: {
      tags: ['api'],
      payload: {
        maxBytes: 209715200,
        output: 'file',
        parse: true
      },
      handler: (request, h) => {
        const payload = request.payload
        console.log(payload)
        return 'Received your data'
      },
      
    }
};
