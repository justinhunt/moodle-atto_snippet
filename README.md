
Snippet is a template solution for Moodle content creation. Templates and variables(placeholders) are declared in the admin settings for the plugin. When the icon is clicked on the Atto editor, the user can choose the template and enter/select values for each of the variables. The placeholders and template are then merged to create the final content which is inserted on the page.

Snippet has no filter plugin companion. It returns html directly to the text area. This is useful when the content doesn't need javascript, and has the benefit that the content is instantly visible and editable in the text area (ie without filtering). As an example of this, the Youtube template will display a Youtube video in the html editor text area immediately.


## Installation
If using zip, first download and unzip the file, and place the snippet folder in your Moodle's /lib/editor/atto/plugins folder. Or use git directly from the /lib/editor/atto/plugins folder, ie
git clone https://github.com/justinhunt/moodle-atto_snippet.git snippet

Then visit your site admin's notifications page. The plugin installer will walk through the installation process. At the end you will see a list of 5 templates. You can leave them for now and fill them in later.  3 of the templates are blank, and a helloworld and a youtube template are automatically created for you.

Before the Snippet icon will be visible in the Atto toolbar you will need to visit site admin -> plugins -> text editors -> atto -> atto toolbar settings, and add "snippet" to the list of icons to display. There is a text area towards the bottom of the page for this purpose.


## Using Snippet
To use a snippet, look for the spider web/cog icon on the text editor. (Feel free to submit a cooler icon.) Checking on that should open the Snippet dialog with a button for each snippet.

To make a snippet, find an empty snippet template page in the plugin's admin settings, site admin -> plugins -> text editors -> atto -> Snippet(Atto) -> Snippets. Enter a name for the snippet, the content of the snippet and any default variable values. Variables can be used in the snippet content and are surrounded by {{ or }} marks. Like this: {{bigvariable}}


### An example snippet:
Snippet Name
```
sweety
```

Snippet
```
My sweet food on {{weekday}} is: {{mysweety}}
```

Defaults
```
mysweety=candy,weekday=Monday
```

This could display as
```
My sweet food on Thursday is: cake
```

If you run out of blank snippet templates, you can always create more. Set the number of snippets on the general settings page.
site admin -> plugins -> text editors -> atto -> Snippet(atto) -> General Settings

## Presets
There is a dropdown list of presets at the top of each snippet settings page. These will fill the template page in with the details of a preset template. You can make your own presets and share them too. To do this you can export the template by mouse clicking on the green "bundle" box on the top right of the template settings page. It will download as a .txt file. Drag an exported .txt file over the green bundle box on a blank template settings page to import it.

If you wish your exported template to appear in the presets dropdown you must place the .txt file in the presets folder under /lib/editor/atto/plugins/snippet. Or in a folder called "snippet" in your theme.

## For Theme Developers
It is possible to distribute snippets with your theme. Create a folder called "snippet" in the root folder of your theme and place your template bundle files in there. Your theme snippets will then appear in the drop down list of presets on each blank snippet template settings page. 

## See also
 Mark Sharp's [templates](https://github.com/sharpchi/moodle-atto_templates) plugin
