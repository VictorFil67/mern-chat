const sendMessage = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  console.log(`The message sent to user ${id}`);
  await res.json(`The message sent to user ${id}`);
};

export default { sendMessage };
