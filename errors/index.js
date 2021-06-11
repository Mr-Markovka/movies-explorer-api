const NotFoundError = require('./NotFoundErr');
const UnauthorizedErr = require('./UnauthorizedErr');
const BadRequestErr = require('./BadRequestErr');
const ConflictErr = require('./ConflictErr');
const ForbiddenErr = require('./ForbiddenErr');

module.exports = {
  NotFoundError,
  UnauthorizedErr,
  BadRequestErr,
  ConflictErr,
  ForbiddenErr,
};
