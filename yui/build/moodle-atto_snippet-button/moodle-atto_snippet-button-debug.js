YUI.add('moodle-atto_snippet-button', function (Y, NAME) {

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

/*
 * @package    atto_snippet
 * @copyright  COPYRIGHTINFO
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_snippet-button
 */

/**
 * Atto text editor snippet plugin.
 *
 * @namespace M.atto_snippet
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_snippet';
var LOGNAME = 'atto_snippet';

var CSS = {
        INPUTSUBMIT: 'atto_media_urlentrysubmit',
        INPUTCANCEL: 'atto_media_urlentrycancel',
        KEYBUTTON: 'atto_snippet_snippetbutton',
        HEADERTEXT: 'atto_snippet_headertext',
        INSTRUCTIONSTEXT: 'atto_snippet_instructionstext',
        TEMPLATEVARIABLE: 'atto_snippet_snippetvariable',
    };

var FIELDSHEADERTEMPLATE = '' +
        '<div id="{{elementid}}_{{innerform}}" class="mdl-align">' +
            '<h4 class="' + CSS.HEADERTEXT + '">{{headertext}} {{snippetname}}</h4>' +
            '<div class="' + CSS.INSTRUCTIONSTEXT + '">{{instructions}}</div>' +
        '</div>';

var BUTTONSHEADERTEMPLATE = '' +
        '<div id="{{elementid}}_{{innerform}}" class="mdl-align">' +
            '<h4 class="' + CSS.HEADERTEXT + '">{{headertext}}</h4>' +
        '</div>';
        
var BUTTONTEMPLATE = '' +
        '<div id="{{elementid}}_{{innerform}}" class="atto_snippet_buttons mdl-align">' +
            '<button class="' + CSS.KEYBUTTON + '_{{snippetindex}}">{{snippetname}}</button>' +
        '</div>';

var FIELDTEMPLATE = '' +
        '<div id="{{elementid}}_{{innerform}}" class="mdl-align">{{snippetvar}}' +
            '&nbsp;<input type="text" class="' + CSS.TEMPLATEVARIABLE + '_{{variableindex}}" value="{{defaultvalue}}"></input>' +
        '</div>';
        
var SELECTCONTAINERTEMPLATE = '' +
            '<div id="{{elementid}}_{{innerform}}" class="mdl-align">{{variable}}</div>';
			
var SELECTTEMPLATE = '' +
            '<select class="' + CSS.TEMPLATEVARIABLE + '_{{variableindex}} atto_snippet_field"></select>';

var OPTIONTEMPLATE ='' +
		'<option value="{{option}}">{{option}}</option>';


var SUBMITTEMPLATE = '' +
  '<form class="atto_form">' +
   '<div id="{{elementid}}_{{innerform}}" class="mdl-align">' +
	'<button class="' + CSS.INPUTSUBMIT +'">{{inserttext}}</button>' +
    '</div>' +
	'</form>';

Y.namespace('M.atto_snippet').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

    /**
     * A reference to the current selection at the time that the dialogue
     * was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,

    initializer: function() {
        // If we don't have the capability to view then give up.
        if (this.get('disabled')){
            return;
        }

        var theicon = 'iconone';


            // Add the snippet icon/buttons
            this.addButton({
                icon: 'ed/' + theicon,
                iconComponent: 'atto_snippet',
                buttonName: theicon,
                callback: this._displayDialogue,
                callbackArgs: theicon
            });

    },


     /**
     * Display the snippet buttons dialog
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(e, clickedicon) {
        e.preventDefault();
        var width=400;


        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
            width: width + 'px',
            focusAfterHide: clickedicon
        });
		//dialog doesn't detect changes in width without this
		//if you reuse the dialog, this seems necessary
        if(dialogue.width !== width + 'px'){
            dialogue.set('width',width+'px');
        }
        
        //create content container
        var bodycontent =  Y.Node.create('<div></div>');
        
        //create and append header
        var template = Y.Handlebars.compile(BUTTONSHEADERTEMPLATE),
            	content = Y.Node.create(template({
                headertext: M.util.get_string('chooseinsert', COMPONENTNAME)
            }));
         bodycontent.append(content);

        //get button nodes
        var buttons = this._getButtonsForSnippets(clickedicon);

        
         Y.Array.each(buttons, function(button) {  	 
            //loop start
                bodycontent.append(button);
            //loop end
        }, bodycontent);
     

        //set to bodycontent
        dialogue.set('bodyContent', bodycontent);
        dialogue.show();
        this.markUpdated();
    },

	    /**
     * Display the form for each snippet
     *
     * @method _displayDialogue
     * @private
     */
    _showSnippetForm: function(e,snippetindex) {
        e.preventDefault();
        var width=400;

		
        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
            width: width + 'px'
        });
		//dialog doesn't detect changes in width without this
		//if you reuse the dialog, this seems necessary
        if(dialogue.width !== width + 'px'){
            dialogue.set('width',width+'px');
        }

        //get fields , 1 per variable
        var fields = this._getSnippetFields(snippetindex);
        var instructions = this.get('instructions')[snippetindex];
            instructions = decodeURIComponent(instructions);
	
		//get header node. It will be different if we have no fields
		if(fields && fields.length>0){
			var useheadertext  = M.util.get_string('fieldsheader', COMPONENTNAME);
		}else{
			var useheadertext =  M.util.get_string('nofieldsheader', COMPONENTNAME);
		}
		var template = Y.Handlebars.compile(FIELDSHEADERTEMPLATE),
            	content = Y.Node.create(template({
                snippetname: this.get('snippetnames')[snippetindex],
                headertext: useheadertext,
                instructions: instructions
            }));
        var header = content;
		
		//set container for our nodes (header, fields, buttons)
        var bodycontent =  Y.Node.create('<div></div>');
        
        //add our header
         bodycontent.append(header);
        
        //add fields
         Y.Array.each(fields, function(field) {  	 
            //loop start
                bodycontent.append(field);
            //loop end
        }, bodycontent);
     
     	//add submit button
     	var submitbuttons = this._getSubmitButtons(snippetindex);
     	bodycontent.append(submitbuttons)

        //set to bodycontent
        dialogue.set('bodyContent', bodycontent);
        dialogue.show();
        this.markUpdated();
    },

  /**
     * Return the dialogue content for the tool, attaching any required
     * events.
     *
     * @method _getSubmitButtons
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getSubmitButtons: function(snippetindex) {
  
        var template = Y.Handlebars.compile(SUBMITTEMPLATE),
        	
            content = Y.Node.create(template({
                elementid: this.get('host').get('elementid'),
                inserttext:  M.util.get_string('insert', COMPONENTNAME)
            }));
     
		content.one('.' + CSS.INPUTSUBMIT).on('click', this._doInsert, this, snippetindex);
        return content;
    },


   /**
     * Return a field (yui node) for each variable in the template
     *
     * @method _getDialogueContent
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getSnippetFields: function(snippetindex) {
    
    	var allcontent=[];
    	var thevariables=this.get('snippetvars')[snippetindex];
    	var thedefaults=this.get('defaults')[snippetindex];
    	
    	//defaults array 
    	var defaultsarray=thedefaults;

    	 Y.Array.each(thevariables, function(thevariable, currentindex) { 	 
            //loop start

			if((thevariable in defaultsarray) && defaultsarray[thevariable].indexOf('|')>-1){
			
				var containertemplate = Y.Handlebars.compile(SELECTCONTAINERTEMPLATE),
					content = Y.Node.create(containertemplate({
					elementid: this.get('host').get('elementid'),
					variable: thevariable,
					defaultvalue: defaultsarray[thevariable],
					variableindex: currentindex
				}));
			
				var selecttemplate = Y.Handlebars.compile(SELECTTEMPLATE),
					selectbox = Y.Node.create(selecttemplate({
					variable: thevariable,
					defaultvalue: defaultsarray[thevariable],
					variableindex: currentindex
				}));
			
				var opts = defaultsarray[thevariable].split('|');
				var htmloptions="";
				var opttemplate = Y.Handlebars.compile(OPTIONTEMPLATE);
				Y.Array.each(opts, function(opt, optindex) {
					var optcontent = Y.Node.create(opttemplate({
							option: opt
						}));
					selectbox.appendChild(optcontent);
				});
				content.appendChild(selectbox);
				
			}else{
      
				 var template = Y.Handlebars.compile(FIELDTEMPLATE),
					content = Y.Node.create(template({
					elementid: this.get('host').get('elementid'),
					snippetvar: thevariable,
					defaultvalue: defaultsarray[thevariable],
					variableindex: currentindex
				}));
            }//end of if | char
            allcontent.push(content);
            //loop end
        }, this);


        return allcontent;
    },


     /**
     * Return the dialogue content for the tool, attaching any required
     * events.
     *
     * @method _getDialogueContent
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getButtonsForSnippets: function(clickedicon) {
    
    	var allcontent=[];
    	 Y.Array.each(this.get('snippetnames'), function(thesnippetname, currentindex) {
            //loop start
             var template = Y.Handlebars.compile(BUTTONTEMPLATE),
            	content = Y.Node.create(template({
            	elementid: this.get('host').get('elementid'),
                snippetname: thesnippetname,
                snippetindex: currentindex
            }));
            this._form = content;
            content.one('.' + CSS.KEYBUTTON + '_' + currentindex).on('click', this._showSnippetForm, this,currentindex);
            allcontent.push(content);
            //loop end
        }, this);

        return allcontent;
    },

    /**
     * Inserts the users input onto the page
     * @method _getDialogueContent
     * @private
     */
    _doInsert : function(e,snippetindex){
        e.preventDefault();
        this.getDialogue({
            focusAfterHide: null
        }).hide();
        
        var retcontent = '';
        var retstring = this.get('snippets')[snippetindex];
        var thesnippetname = this.get('snippetnames')[snippetindex];
        var thevariables=this.get('snippetvars')[snippetindex];
        
        //Do the merge (old way)
         Y.Array.each(thevariables, function(variable, currentindex) {
        	var thefield = Y.one('.' + CSS.TEMPLATEVARIABLE + '_' + currentindex);
        	var thevalue = thefield.get('value');
        	//retstring = retstring.replace('{{' + variable + '}}',thevalue);
             retstring = retstring.replace(new RegExp('{{' + variable + '}}', 'g'),thevalue);
        }, this);
        retcontent = retstring;
 

        //Do the merge the YUI way
        /*
        var mergevars={};
          Y.Array.each(thevariables, function(variable, currentindex) {
        	var thefield = Y.one('.' + CSS.TEMPLATEVARIABLE + '_' + currentindex);
        	var thevalue = thefield.get('value');
        	mergevars[variable] = thevalue;
        }, this);
        var template = Y.Handlebars.compile(retstring),
            	content = Y.Node.create(template(mergevars));
        //fails here because the retcontent is a YUI node and tostring delivers garbage
		//all the data is nested.
		//this only works for text content
        retcontent = content._node.data;
		//this doesn't really work
        var nodelist = content.get('childNodes');
        nodelist.each(function (aNode) {
			retcontent = retcontent + aNode.getHTML();
			});
			*/
	
        this.editor.focus();
        this.get('host').insertContentAtFocusPoint(retcontent);
        this.markUpdated();

    }
}, { ATTRS: {
    disabled: {
        value: false
    },
    snippets: {
        value: null
    },
    snippetnames: {
        value: null
    },
    snippetvars: {
        value: null
    },
    defaults: {
        value: null
    },
    instructions: {
        value: null
    }
 }
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
