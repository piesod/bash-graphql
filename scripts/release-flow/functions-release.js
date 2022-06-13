const fs = require('fs');

const VERSION_FILE = './package.json';
function getCurrentVersion() {
	try {
	  const data = fs.readFileSync(VERSION_FILE, 'utf8');
	  const match = data.match(/\"version\": \"([0-9]{1,}).([0-9]{1,}).([0-9]{1,})\"/);
	  const [ all, major, minor, patch ] = match;
	  return {major, minor, patch, versionLine: all, content: data};
	} catch (err) {
	  throw Error('Could not read current version', err);
	}
}

module.exports = {
	getCurrentVersion,
	VERSION_FILE
}