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
 * snippet settings.
 *
 * @package   atto_snippet
 * @copyright COPYRIGHTINFO
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();
require_once($CFG->libdir . '/editor/atto/plugins/snippet/lib.php');

$ADMIN->add('editoratto', new admin_category('atto_snippet', new lang_string('pluginname', 'atto_snippet')));

$settings = new admin_settingpage('atto_snippet_settings', new lang_string('settings', 'atto_snippet'));
if ($ADMIN->fulltree) {
	// An option setting
	for($i=1;$i<ATTO_SNIPPET_COUNT+1;$i++){
		$settings->add(new admin_setting_heading('atto_snippet/snippetheading_' . $i, 
			get_string('snippet', 'atto_snippet') . ' ' . $i, ''));
		$settings->add(new admin_setting_configtext('atto_snippet/snippetname_' . $i,
			get_string('snippetname', 'atto_snippet') . ' ' . $i , '', '', PARAM_TEXT));
		$settings->add(new admin_setting_configtextarea('atto_snippet/snippet_' . $i,
			get_string('snippet', 'atto_snippet'), '', '', PARAM_RAW));
		$settings->add(new admin_setting_configtextarea('atto_snippet/defaults_' . $i,
			get_string('defaults', 'atto_snippet'), '', '', PARAM_RAW));
	}
}
