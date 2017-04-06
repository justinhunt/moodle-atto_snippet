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
 * Atto text editor integration version file.
 *
 * @package    atto_snippet
 * @copyright  COPYRIGHTINFO
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();


/**
 * Initialise this plugin
 * @param string $elementid
 */
function atto_snippet_strings_for_js() {
    global $PAGE;

    $PAGE->requires->strings_for_js(array('insert',
                                          'cancel',
                                          'chooseinsert',
                                          'fieldsheader',
                                          'nofieldsheader',
                                          'dialogtitle'),
                                    'atto_snippet');
}

/**
 * Return the js params required for this module.
 * @return array of additional params to pass to javascript init function for this module.
 */
function atto_snippet_params_for_js($elementid, $options, $fpoptions) {
	global $USER, $COURSE;
	
	//coursecontext
	$coursecontext=context_course::instance($COURSE->id);	
	
	//snippet specific
    //this has to be established. It will basically be an array of regular expressions
    //each with a title.
    $conf=get_config('atto_snippet');
	$snippets = get_object_vars($conf);
    $allsnippets=array();
    $allsnippetnames=array();
    $allvariables = array();
    $allinstructions = array();

    //Get the snippet count
     if($conf && property_exists($conf,'snippetcount')){
            $snippetcount = $conf->snippetcount;
        }else{
            $snippetcount = \atto_snippet\settingstools::ATTO_SNIPPET_SNIPPET_COUNT;
        }

    //put our template into a form thats easy to process in JS
    for($snippetindex=1;$snippetindex<$snippetcount+1;$snippetindex++) {
        if (empty($snippets['snippet_' . $snippetindex])) {
            continue;
        }
        $allsnippets[]=$snippets['snippet_' . $snippetindex];
        $allsnippetnames[]=$snippets['snippetname_' . $snippetindex];
        $allvariables[] = atto_snippet_fetch_variables($snippets['snippet_' . $snippetindex]);
        $alldefaults[]=atto_snippet_fetch_default_properties($snippets['defaults_' . $snippetindex]);
		$allinstructions[] = rawurlencode($snippets['snippetinstructions_' . $snippetindex]);
    }

    //fetch any snippet from the theme and also display those
    //the admin can disable this via the loadfromtheme setting on the snippet general settings page
    if($conf->loadfromtheme) {
        $themeonly = true;
        $themepresets = \atto_snippet\snippetpresets::fetch_presets($themeonly);
        foreach ($themepresets as $preset) {
            $allsnippets[] = $preset['body'];
            $allsnippetnames[] = $preset['name'];
            $allvariables[] = atto_snippet_fetch_variables($preset['body']);
            $alldefaults[] = atto_snippet_fetch_default_properties($preset['defaults']);
            $allinstructions[] = rawurlencode($preset['instructions']);
        }
    }

	//If they don't have permission don't show it
	$disabled = false;
	if(!has_capability('atto/snippet:visible', $coursecontext) ){
		$disabled=true;
	 }
	
	//add our disabled param
	$params['disabled'] = $disabled;
    $params['snippets']= $allsnippets;
    $params['snippetnames']= $allsnippetnames;
    $params['snippetvars']= $allvariables;
    $params['defaults']= $alldefaults;
    $params['instructions']= $allinstructions;

    return $params;
}

/**
 * Return an array of variable names
 * @param string template containing @@variable@@ variables 
 * @return array of variable names parsed from template string
 */
function atto_snippet_fetch_variables($snippet){
	$matches = array();
	$t = preg_match_all('/{{(.*?)}}/s', $snippet, $matches);
	//this was for the handlebars support, but dropped it, couldn't make it work
	if(count($matches)>1){
		//this was for the handlebars support, but dropped it, couldn't make it work
		/*
		$retmatches[] =array();
		foreach($matches[1] as $match){
			if(strpos($match,'/')===0 || $match=='this' || $match=="." || trim($match)==''){
				continue;
			}elseif(strpos($match,'#')===0){
				$matcharray = explode(' ',$match);
				if(count($matcharray)>1){
					$match=$matcharray[1];
				}else{
					$match=str_replace('#','',$match);
				}
			}
			if(!empty($match)){
				$retmatches[] =$match;
			}
		}
		return($retmatches);
		*/
        $uniquearray= array_unique($matches[1]);
		return array_values($uniquearray);
	}else{
		return array();
	}
}

function atto_snippet_fetch_default_properties($propstring){
	//Now we just have our properties string
	//Lets run our regular expression over them
	//string should be property=value,property=value
	//got this regexp from http://stackoverflow.com/questions/168171/regular-expression-for-parsing-name-value-pairs
	$regexpression='/([^=,]*)=("[^"]*"|[^,"]*)/';
	$matches=array();

	//here we match the filter string and split into name array (matches[1]) and value array (matches[2])
	//we then add those to a name value array.
	$itemprops = array();
	if (preg_match_all($regexpression, $propstring,$matches,PREG_PATTERN_ORDER)){		
		$propscount = count($matches[1]);
		for ($cnt =0; $cnt < $propscount; $cnt++){
			// echo $matches[1][$cnt] . "=" . $matches[2][$cnt] . " ";
			$newvalue = $matches[2][$cnt];
			//this could be done better, I am sure. WE are removing the quotes from start and end
			//this wil however remove multiple quotes id they exist at start and end. NG really
			$newvalue = trim($newvalue,'"');
			$itemprops[trim($matches[1][$cnt])]=$newvalue;
		}
	}
	return $itemprops;
}
