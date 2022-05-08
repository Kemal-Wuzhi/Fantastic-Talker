function getUser(req) {
  return req.user
}

function getTeacher(req) {
  return req.teacher
}

module.exports = {
  getUser,
  getTeacher,
}
