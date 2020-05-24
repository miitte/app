const api = {
  currentDir: __dirname,
  request: loc => {
    return new Promise((resolve, reject) => {
      reject('todo')
    })
  }
}

module.exports = api
