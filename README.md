# Wordpress Gutenberg Block Editor PO file to JED1.X JSON

Generate Wordpress Gutenberg block editor compatible JED1.x JSON 
file from the PO files. 

This library will come in handy, if you have multiple JS files
in the block editor and the wp-cli ends up making multiple JSON
files with md5 handles.

This npm package is a utility wrapper package built around
the po2json npm package. 

## Usage instructions

### Setup the Wordpress Gutenberg for internationalization
1. Create a `languages` folder in the root of your Gutenberg block. 
2. Use `wp-cli` to generate the `.pot` and `.po` files or add in your `.po` files manually. Your `.po` files should be of the format `{domain}-{locale}.po`, where `domain` is the language domain used in the project. Example `mydomain-fr_FR.po`.
3. Do not generate the translation JSON files using `wp-cli`
4. Install this package using `npm install --save wp-block-editor-po-to-json`.
5. Create a new npm script in the package.json scripts section.
```aidl
    "scripts": {
        "build-translation-json": "block-editor-po2json -lf languages -wjh cg-blocks-js"
    },
```
where `-lf` is the path to the language folder `language`
and `-wjh` is the Wordpress javascript handle used for the blocks compiled `js` file during the `wp_enqueue_script` or `wp_register_script`.
6. Generate the translations using the command `npm run build-translation-json`


## Author
Amal Ajith

## Happy Coding!
