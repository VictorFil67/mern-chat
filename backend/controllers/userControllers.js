import User from "../models/User.js";

const getUsersForSidebar = async (req, res) => {
  try {
    const { _id: loggedInUserId } = req.user;
    //the first variant
    // const filteredUsers = await User.find({
    //   _id: { $ne: loggedInUserId },
    // }).select("-password");
    //the second variant
    const filteredUsers = await User.find(
      {
        _id: { $ne: loggedInUserId },
      },
      "-password"
    );

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default { getUsersForSidebar };
