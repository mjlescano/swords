export default function css (rules) {
  return Object.keys(rules)
    .map((key) => `${camelToDash(key)}:${rules[key]}`).join(';')
}

function camelToDash (str) {
  return str.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()
}
