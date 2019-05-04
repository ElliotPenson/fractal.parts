exports.handle = async (event, context, other) => {
  const { name } = event.pathParameters;
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `get ${name}`
    })
  };
  return response;
};
