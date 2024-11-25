const sendMessage = async (req, res) => {
  console.log("The message sent");
  await res.json("The message sent");
};

export default { sendMessage };
