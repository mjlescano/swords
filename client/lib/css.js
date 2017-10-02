export default function css (rules) {
  return Object.keys(rules)
    .map((key) => `${camelToDash(key)}:${rules[key]}`).join(';')
}

const camelRegexp = /([a-z\d])([A-Z])/g

function camelToDash (str) {
  return str.replace(camelRegexp, '$1-$2').toLowerCase()
}
