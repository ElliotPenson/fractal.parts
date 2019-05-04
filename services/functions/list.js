exports.handle = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'list'
    })
  };
  return response;
};
