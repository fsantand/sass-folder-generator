// Dependencies
const fs = require("fs");
const del = require("del");

const pattern = {
    'sevenone': require("./architectures/sevenone"),
    'atomic': require("./architectures/atomic")
}

const DEFAULT_DIRECTORY = './sass';

const toDir = (directory) => `${DEFAULT_DIRECTORY}/${directory}`;

function createDirectory(directories, files) {
    directories.forEach(directory => {
        console.log(`Creating directory ${toDir(directory)}...`);
        fs.mkdirSync(toDir(directory));
    });
    const folders = Object.keys(files);
    folders.forEach(folder => {
        files[folder].forEach(file => {
            let fileDir = toDir(`${folder}/_${file}.scss`);
            console.log(`Creating file ${fileDir}`);
            fs.openSync(fileDir, 'w');
        });
    });
}

function createMainFile(files) {
    console.log("Creating main file...");
    const main = fs.openSync(toDir("main.scss"), "w");
    const folders = Object.keys(files)
    folders.forEach(folder => {
        files[folder].forEach(file => {
            fs.appendFileSync(main, `@import "${folder}/${file}";\n`);
        });
        fs.appendFileSync(main, '\n');
    });
}

function parseArchitecture(architecture) {
    try {
        if (fs.existsSync(DEFAULT_DIRECTORY)) {
            console.log("Directory exists, are you sure you want to delete it ? (Y/N)");
        }
        del.sync(DEFAULT_DIRECTORY);
    } catch(err) {
        console.error("The directory doesn't exist, skipping step...");
    }
    try {
        fs.mkdirSync(DEFAULT_DIRECTORY);   
    } catch {
        console.log("The directory already exists, skipping step...");
    }
    console.log(`Creating ${architecture.name}'s file structure...`);
    createDirectory(architecture.folders, architecture.files);
    createMainFile(architecture.files);
    console.log(`${architecture.name}'s file structure done !`);
}

module.exports = {
    parseArchitecture,
    pattern
}