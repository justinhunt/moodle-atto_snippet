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
 * Atto Snippet installation tasks
 *
 * @package    atto_snippet
 * @copyright  2017 Justin Hunt {@link http://poodll.com}
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Install the plugin.
 */
function xmldb_atto_snippet_install() {
    $presets = \atto_snippet\snippetpresets::fetch_presets();
	$forinstall = array('helloworld','youtube');
	$templateindex=0;
	foreach($presets as $preset){			
		if(in_array($preset['key'],$forinstall)){
			$templateindex++;
			//set the config
			\atto_snippet\snippetpresets::set_preset_to_config($preset,$templateindex);
		}
	}//end of for each presets	
}
