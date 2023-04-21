import xml2js from 'xml2js'
const parser = new xml2js.Parser()

const resx2jsClb = (str, withComments, cb) => {
  if (!cb && typeof withComments === 'function') {
    cb = withComments
    withComments = false
  }

  if (typeof str !== 'string') return cb(new Error('The first parameter was not a string'))

  const result = {}

  parser.parseString(str, (err, data) => {
    if (err) return cb(err)

    if (data && data.root && data.root.data && data.root.data.length > 0) {
      data.root.data.forEach((d) => {
        if (d && d.$ && d.$.name && d.value && d.value.length > 0) {
          const key = d.$.name
          const value = d.value[0]

          if (!withComments) {
            result[key] = value
          } else {
            result[key] = {
              value
            }
            if (d.comment) {
              const comment = d.comment[0]
              result[key].comment = comment
            }
          }
        }
      })
    }

    cb(null, result)
  })
}

export default function resx2js (str, withComments, cb) {
  if (!cb && withComments === undefined) {
    return new Promise((resolve, reject) => resx2jsClb(str, withComments, (err, ret) => err ? reject(err) : resolve(ret)))
  }
  if (!cb && typeof withComments !== 'function') {
    return new Promise((resolve, reject) => resx2jsClb(str, withComments, (err, ret) => err ? reject(err) : resolve(ret)))
  }
  resx2jsClb(str, withComments, cb)
}
