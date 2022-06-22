const { getCurrentVersion } = require('./functions-release')

const currentVersion = getCurrentVersion();
const { major, minor, patch} = currentVersion;
const newVersion = `${major}.${minor}.${patch}`;
console.log(newVersion);