export const startCall = (req, res) => {
  res.status(200).json({ message: "Call Started!" });
};

export const endCall = (req, res) => {
  res.status(200).json({ message: "Call Ended!" });
};
