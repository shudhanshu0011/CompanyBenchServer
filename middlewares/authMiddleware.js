module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not Authenticated" });
  }
};

module.exports.isClient = (req, res, next) => {
  let role = "CLIENT";
  checkIfUserIsAuthAndHasRole(role);
};

module.exports.isIndividual = (req, res, next) => {
  let role = "INDIVIDUAL";
  checkIfUserIsAuthAndHasRole(role);
};

module.exports.isVendor = (req, res, next) => {
  let role = "VENDOR";
  checkIfUserIsAuthAndHasRole(role);
};

module.exports.isAdmin = (req, res, next) => {
  let role = "ADMIIN";
  checkIfUserIsAuthAndHasRole(role);
};

function checkIfUserIsAuthAndHasRole(role) {
  if (req.isAuthenticated() && req.user.userType === role) {
    next();
  } else {
    res.status(403).json({
      msg: `You are not authorized to view this resource because you are not ${role}.`,
    });
  }
}
