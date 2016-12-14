Snippet Plugin for Moodle Atto
===

This is another template solution for Moodle content creation. Templates and variables(placeholders) are declared in the admin settings for the plugin. When the icon is click on the Atto editor, the user can choose the template and the values for each of the variables. The placeholders and template are then merged to create the final content which is then inserted on the page.

Unlike the Generico and PoodLL Atto plugins, this has no filter companion and returns html directly to the text area. This is useful when the content author doesn't need tricky CSS or javascript, and has the benefit that the content is instantly visible in the text area (ie without filtering).

Installation
===
To install it just place the snippet folder in your Moodle's /lib/editor/atto/plugins folder, and visit your site admin's notifications page. The plugin installer will walk through the installation process. At the end you will see a list of 20 templates to be filled in. You can leave them blank and fill them in later. 

Before the icon will be visible in the Atto toolbar you will need to visit site admin -> plugins -> text editors -> atto -> atto toolbar settings, and add "snippet" to somewhere in the list of icons to display. This is a text area towards the bottom of the page.

Usage
===
In the plugin's admin settings, site admin -> plugins -> text editors -> atto -> snippet, enter a name for the snippet, the content of the snippet and any default variable values. Variables can be used in the snippet content and are surrounded by double @ marks. Like this: @@bigvariable@@

An example of a full snippet would be:
Snippet Name
sweety

Snippet
My sweet food on @@weekday@@ is: @@mysweety@@

Defaults
mysweety=candy,weekday=Monday

Good Luck  


Justin Hunt