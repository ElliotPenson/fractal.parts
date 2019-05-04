exports.handle = async (event, context) => {
  const { body } = event;
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'create',
      body: JSON.parse(body)
    })
  };
  return response;
};
