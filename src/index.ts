/**
 * ======= Generate JED1.x compatible translations from po files =========
 *
 * @description
 * This node script will generate the translation json
 * in JED1.x format required by Wordpress Gutenberg Block Editor.
 *
 * @author Amal Ajith
 */

import * as fs from 'fs';
import * as path from 'path';
import * as po2json from 'po2json';
import * as clc from 'cli-color';
import {Config} from "../typedefinitions";



class WordpressBlockEditorPoJsonGenerator {

    // domain: string = 'my-custom-domain';

    languagesFolder: string = `./languages`;

    poFileExt: '.po' = '.po';

    wpJsHandleName = 'wp-js-handle';

    constructor(config?: Config) {
        // if(config && config.domain) {
        //     this.domain = config.domain;
        // }
        if(config && config.languagesFolderAbsPath) {
            this.languagesFolder = config.languagesFolderAbsPath;
        }
        if(config && config.wordpressJsHandleName) {
            this.wpJsHandleName = config.wordpressJsHandleName;
        }
    }


    /**
     * Get the po file names from the languages folder
     * @param folderName
     */
     getPoFileNames = async (folderName: string): Promise<Array<string>> => {
        try {
            const files = await fs.promises.readdir(folderName);
            return files.filter(file => path.extname(file) === this.poFileExt);
        } catch (e) {
            throw e;
        }
    };

    /**
     * Generate and save the jed json files
     * @param languageFolderAbsPath
     * @param poFileName
     */
    genAndSaveJedJsonFileFromPoFile = async (languageFolderAbsPath: string, poFileName: string) => {

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
                const poFileBaseName = path.basename(poFileAbsPath,this.poFileExt);
                const jsonFileName = `${poFileBaseName}-${this.wpJsHandleName}.json`;
                const jsonFileAbsPath = `${languageFolderAbsPath}/${jsonFileName}`;
                await fs.promises.writeFile(jsonFileAbsPath, jsonDataString);
                return jsonFileName;
            } catch (e) {
                throw e;
            }
        }

    };

    /**
     * Run the methods to scan for po files and generator json files.
     */
    run = async (): Promise<void> => {

        try {
            console.log(clc.blue(`Language folder has been set as ${this.languagesFolder}`));
            const poFileNames = await this.getPoFileNames(this.languagesFolder);
            console.log(clc.blue('Following po files found'));
            console.log(clc.green(JSON.stringify(poFileNames)));
            console.log(clc.blue('Preparing for json file generation from po files'));
            const genAndSaveJedFilesInParallel = poFileNames.map((poFileName) => {
                return this.genAndSaveJedJsonFileFromPoFile(this.languagesFolder, poFileName);
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

}

/**
 * main function which begins the process.
 */
export const generatePoJson = async (config?: Config): Promise<void> => {
    const wpPoJsonGenerator = new WordpressBlockEditorPoJsonGenerator(config);
    await wpPoJsonGenerator.run();
};
