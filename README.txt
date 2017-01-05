Snippet Plugin for Moodle Atto
===========================

This is a template solution for Moodle content creation. Templates and variables(placeholders) are declared in the admin settings for the plugin. When the icon is click on the Atto editor, the user can choose the template and the values for each of the variables. The placeholders and template are then merged to create the final content which is then inserted on the page.

Unlike the Generico and PoodLL Atto plugins, this has no filter companion and returns html directly to the text area. This is useful when the content author doesn't need tricky CSS or javascript, and has the benefit that the content is instantly visible in the text area (ie without filtering). As an example of this, the Youtube template will display a Youtube video in the html editor text area immediately.

Installation
===
If using zip, first download and unzip the file, and place the snippet folder in your Moodle's /lib/editor/atto/plugins folder. Or use git directly from the /lib/editor/atto/plugins folder, ie 
git clone https://github.com/justinhunt/moodle-atto_snippet.git snippet 

Then visit your site admin's notifications page. The plugin installer will walk through the installation process. At the end you will see a list of 5 templates. You can leave them for now and fill them in later.  3 of the templates are blank, and a helloworld and a youtube template are automatically created for you. 

Before the Snippet icon will be visible in the Atto toolbar you will need to visit site admin -> plugins -> text editors -> atto -> atto toolbar settings, and add "snippet" to the list of icons to display. There is a text area towards the bottom of the page for this purpose.

Usage
=====
In the plugin's admin settings, site admin -> plugins -> text editors -> atto -> snippet, enter a name for the snippet, the content of the snippet and any default variable values. Variables can be used in the snippet content and are surrounded by {{ or }} marks. Like this: {{bigvariable}}

An example of a full snippet would be:
Snippet Name
sweety

Snippet
My sweet food on {{weekday}} is: {{mysweety}}

Defaults
mysweety=candy,weekday=Monday

Presets
======
There is a dropdown list of presets at the top of each snippet settings page. These will fill the template page in with the details of a preset template. You can make your own presets and share them too. To do this you can export the template by mouse clicking on the green "bundle" box on the top right of the template settings page. It will download as a .txt file. Drag an exported .txt file over the green bundle box on a blank template settings page to import it. 

If you wish your exported template to appear in the presets dropdown you must place the .txt file in the presets folder under /lib/editor/atto/plugins/snippet.


Good Luck  


Justin Hunt
