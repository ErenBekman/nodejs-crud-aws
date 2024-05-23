exports.handler = function (event, context) {
  console.log(JSON.stringify(event, null, 2));
  console.log(record.eventID);
  console.log(record.eventName);
  console.log('DynamoDB Record: %j', record.dynamodb);

  switch (event.httpMethod) {
    case 'GET':
      console.log('GET request');
      break;
    case 'POST':
      console.log('POST request');
      break;
    case 'PUT':
      console.log('PUT request');
      break;
    case 'DELETE':
      console.log('DELETE request');
      break;
    default:
      console.log('Unsupported request');
      break;
  }

  context.done(null, 'Successfully processed DynamoDB record');
};

