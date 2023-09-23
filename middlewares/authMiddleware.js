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
  checkIfUserIsAuthAndHasRole(role, req, res, next);
};

module.exports.isIndividual = (req, res, next) => {
  let role = "INDIVIDUAL";
  checkIfUserIsAuthAndHasRole(role, req, res, next);
};

module.exports.isVendor = (req, res, next) => {
  let role = "VENDOR";
  checkIfUserIsAuthAndHasRole(role, req, res, next);
};

module.exports.isAdmin = (req, res, next) => {
  let role = "ADMIIN";
  checkIfUserIsAuthAndHasRole(role, req, res, next);
};

function checkIfUserIsAuthAndHasRole(role, req, res, next) {
  if (req.isAuthenticated() && req.user.userType === role) {
    next();
  } else {
    res.status(403).json({
      msg: `You are not authorized to view this resource because you are not ${role}.`,
    });
  }
}
