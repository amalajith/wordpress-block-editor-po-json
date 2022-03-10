/**
 * ======= Generate JED1.x compatible translations from po files =========
 *
 * @description
 * This node script will generate the translation json
 * in JED1.x format required by Wordpress Gutenberg Block Editor.
 *
 * @author Amal Ajith
 */
import { Config } from "../typedefinitions";
/**
 * main function which begins the process.
 */
export declare const generatePoJson: (config?: Config) => Promise<void>;
