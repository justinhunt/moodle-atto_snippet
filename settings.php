<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Snippet settings.
 *
 * @package   atto_snippet
 * @copyright COPYRIGHTINFO
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();
if (is_siteadmin()) {

	require_once($CFG->libdir . '/editor/atto/plugins/snippet/lib.php');

	$conf = get_config('atto_snippet');

    //use this to put it all in a category
	$atto_category='atto_snippet';
    $ADMIN->add('editoratto', new admin_category($atto_category, new lang_string('pluginname', 'atto_snippet')));

    //use this to put it all on one page
   // $atto_category='editoratto';


    //General settings
    $general_settings = new admin_settingpage('atto_snippet_settings',get_string('pluginname', 'atto_snippet'));

    //add basic items to page, snippet count really
    $general_items =  \atto_snippet\settingstools::fetch_general_items($conf);
    foreach ($general_items as $general_item) {
        $general_settings->add($general_item);
    }

    //add table of templates to page
    $snippettable_item =  new \atto_snippet\snippettable('atto_snippet/snippettable',
    get_string('snippets', 'atto_snippet'), '');
    $general_settings->add($snippettable_item);

    //add page to category
    $ADMIN->add($atto_category,$general_settings);

    //add Snippets pages to category (hidden from nav)
    $snippet_pages =  \atto_snippet\settingstools::fetch_snippet_pages($conf);
    foreach ($snippet_pages as $snippet_page) {
        $ADMIN->add($atto_category, $snippet_page);
    }

    //set the default return to null
    $settings=null;

}//end of if site admin