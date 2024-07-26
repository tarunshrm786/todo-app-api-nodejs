const Session = require('../models/Session');

exports.recordSession = async (user, ipAddress) => {
  const session = new Session({
    userId: user._id,
    ipAddress,
  });
  await session.save();
};

exports.getSessions = async (req, res) => {
  const sessions = await Session.find({ userId: req.user._id });
  res.status(200).json(sessions);
};
