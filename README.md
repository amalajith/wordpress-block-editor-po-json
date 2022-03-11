# Wordpress Gutenberg Block Editor PO file to JED1.X JSON

Generate Wordpress Gutenberg block editor compatible JED1.x JSON 
file from the PO files. 

This package will come in handy, if you have multiple JS files
in the block editor and the wp-cli ends up making multiple JSON
files with md5 handles.

### Credits
This package is a utility tool for generating Wordpress Gutenberg block editor translations and is built on top of
the [po2json](https://www.npmjs.com/package/po2json) npm package. 

## Usage instructions

### Setup the Wordpress Gutenberg block for internationalization

1. Create a `languages` folder in the root of your Gutenberg block. 
2. Use `wp-cli` to generate the `.pot` and `.po` files or add in your `.po` files manually. 
Your `.po` files should be of the format `{domain}-{locale}.po`, where `domain` is the language domain used to mark the translatable text [`__('some text','mydomain')`] in the project. Example `mydomain-fr_FR.po`.
For more detailed instructions refer [Wordpress block editor internationlization](https://developer.wordpress.org/block-editor/how-to-guides/internationalization/)
3. Do not generate the translation JSON files using `wp-cli`, if you have multiple JS files in the block. 
4. Install this package using `npm install --save wordpress-block-editor-po-to-json`.

### CLI Usage
1. Create a new npm script in the package.json scripts section. Add the following cli command.
`'wpbepo2json -lf languages -wjh wp-blockjs-handle`
```
   "scripts" : {
        "build-translation-json" : "wpbepo2json -lf languages -wjh wp-blockjs-handle"
    }
```
where `-lf` is the path to the language folder `language`
and `-wjh` is the Wordpress javascript handle used for the blocks compiled `js` file during the `wp_enqueue_script` or `wp_register_script`.

2. Generate the translations using the command `npm run build-translation-json`.
3. You need to ensure that you have set the `wp_set_script_translations()` function after the `wp_enqueue_script` or `wp_register_script`.
Refer [wp_set_script_translations](https://developer.wordpress.org/reference/functions/wp_set_script_translations/) for more information.

### Script Usage
In progress.

### Author
[Amal Ajith](https://github.com/amalajith)

## Happy Coding!
