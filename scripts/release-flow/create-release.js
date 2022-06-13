const fs = require('fs');
const { exit } = require('process');
const { getCurrentVersion, VERSION_FILE } = require('./functions-release')

const BUMP_POSITION = process.argv[2];

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
	})
	return newVersion;
}
try {
	if (!['major', 'minor', 'patch'].includes(BUMP_POSITION)) {
		console.log('No bump position specified major|minor|patch');
		exit(1);
	}
	const currentVersion = getCurrentVersion();
	const bumpedVersion = bumpVersion(BUMP_POSITION, currentVersion);
	const newVersion = writeNewVersion(bumpedVersion);
	console.log(newVersion);
} catch(err) {
	console.log(err);
}
