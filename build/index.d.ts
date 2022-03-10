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
import { Config } from "../typedefinitions";
/**
 * main function which begins the process.
 */
export declare const generatePoJson: (config?: Config) => Promise<void>;
