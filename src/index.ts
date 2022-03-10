/**
 * ======= NodeJS CMD script to generate translations from po files =========
 *
 * @description
 * This node typescript file will generate the translation json
 * in jed1.x format needed by cg-blocks plugin.
 *
 * This code is written in Typescript. The JS file generated is
 * compiled from Typescript.
 *
 * This file should be kept in the same hierarchy as languages folder
 * since it's relatively indexed in code.
 *
 * @author Amal Ajith
 */

import * as fs from 'fs';
import * as path from 'path';
import * as po2json from 'po2json';
import * as clc from 'cli-color';

//Language folder location without trailing slashes
const languagesFolder: string = `${__dirname}/languages`;

const poFileExt: '.po' = '.po';

const wpJsHandlerName = 'cg-blocks-js';

/**
 * Get the po file names from the languages folder
 * @param folderName
 */
const getPoFileNames = async (folderName: string): Promise<Array<string>> => {
    try {
        const files = await fs.promises.readdir(folderName);
        return files.filter(file => path.extname(file) === poFileExt);
    } catch (e) {
        throw e;
    }
};

/**
 * Generate and save the jed json files
 * @param languageFolderAbsPath
 * @param poFileName
 */
const genAndSaveJedJsonFileFromPoFile = async (languageFolderAbsPath: string, poFileName: string) => {

    const poFileAbsPath = `${languageFolderAbsPath}/${poFileName}`;

    //Since po2json doesn't have built in promise support, we are wrapping it in a custom promise.
    //This will help it in working smoothly with the async await in main()
    const genJsonAsync = new Promise((resolve, reject) => {
        try {
            po2json.parseFile(poFileAbsPath, { format: 'jed1.x' }, function async (err, jsonData) {
                resolve(jsonData);
            });
        } catch (e) {
            reject(e);
        }
    });

    const jsonDataString = JSON.stringify(await genJsonAsync);

    //Save the jsonData to the file
    if(jsonDataString) {
        try {
            const poFileBaseName = path.basename(poFileAbsPath,poFileExt);
            const jsonFileName = `${poFileBaseName}-${wpJsHandlerName}.json`;
            const jsonFileAbsPath = `${languageFolderAbsPath}/${jsonFileName}`;
            await fs.promises.writeFile(jsonFileAbsPath, jsonDataString);
            return jsonFileName;
        } catch (e) {
            throw e;
        }
    }

};


/**
 * main function which begins the process.
 */
const main = async (): Promise<void> => {
    try {
        console.log(clc.blue(`Language folder has been set as ${languagesFolder}`));
        const poFileNames = await getPoFileNames(languagesFolder);
        console.log(clc.blue('Following po files found'));
        console.log(clc.green(JSON.stringify(poFileNames)));
        console.log(clc.blue('Preparing for json file generation from po files'));
        const genAndSaveJedFilesInParallel = poFileNames.map((poFileName) => {
            return genAndSaveJedJsonFileFromPoFile(languagesFolder, poFileName);
        });
        console.log(clc.blue('Generating and saving jed json files'));
        const generatedFileNames = await Promise.all(genAndSaveJedFilesInParallel);
        console.log(clc.green('Successfully generated and saved the following jed json files'));
        console.log(clc.green(JSON.stringify(generatedFileNames)));
    } catch (e) {
        console.log(clc.red('Unable to generate jed json file due to the following error'));
        console.log(e);
    }
};

/**
 * Begin process
 */
export default main;
