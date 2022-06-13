const fs = require('fs');
const { exit } = require('process');

const BUMP_POSITION = process.argv[2];
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
function bumpVersion(position, versionObj) {
	const copy = {...versionObj};
	copy[position] = parseInt(copy[position]) + 1;
	if (position === 'major') {
		copy['minor'] = 0;
		copy['patch'] = 0;
	} else if (position === 'minor') {
		copy['patch'] = 0;
	}
	return copy;
}
function writeNewVersion(bumpedVersion) {
	const {major, minor, patch, content, versionLine} = bumpedVersion;
	const newVersion = `${major}.${minor}.${patch}`;
	const newContent = content.replace(versionLine, `"version": "${newVersion}"`);
	fs.writeFile(VERSION_FILE, newContent, err => {
		if (err) {
			throw (err);
		}
		console.log('Successfully wrote new version: ', newVersion);
	})
}
try {
	if (!['major', 'minor', 'patch'].includes(BUMP_POSITION)) {
		console.log('No bump position specified major|minor|patch');
		exit(1);
	}
	const currentVersion = getCurrentVersion();
	const bumpedVersion = bumpVersion(BUMP_POSITION, currentVersion);
	writeNewVersion(bumpedVersion);
} catch(err) {
	console.log(err);
}
