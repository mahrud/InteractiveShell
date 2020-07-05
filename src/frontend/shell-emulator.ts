// initialize with ID (string) of field that should act like a shell,
//  i.e., command history, taking input and replacing it with output from server

// shell functions for
// * interrupt
/* eslint-env browser */
/* eslint "max-len": "off" */
const keys = {
    // The keys 37, 38, 39 and 40 are the arrow keys.
  arrowUp: 38,
  arrowDown: 40,
  arrowLeft: 37,
  arrowRight: 39,
  cKey: 67,
  zKey: 90,
  ctrlKeyCode: 17,
  metaKeyCodes: [224, 17, 91, 93],
  backspace: 8,
  tab: 9,
  enter: 13,
  ctrlc: "\x03",
};

import {Socket} from "./mathProgram";
const unicodeBell = "\u0007";
//const setCaretPosition = require("set-caret-position");
const scrollDown = require("scroll-down");
//const getSelected = require("get-selected-text");
declare const katex;
declare const Prism;
declare const M2symbols;

function dehtml(s) { // these are all the substitutions performed by M2
    s=s.replace(/&amp;/g,"&");
    s=s.replace(/&lt;/g,"<");
    s=s.replace(/&gt;/g,">");
    s=s.replace(/&quot;/g,"\"");
    s=s.replace(/&bsol;/g,"\\");
    return s;
}

/* caret/selection issues:
- in chrome, anchor*=base* = start, extent*=focus* = end. *node = the DOM element itself
- in firefox, anchor* = start, focus* = end.              *node = the text node inside the dom element
*/

function addToEl(el,pos,s) { // insert into a pure text element
    var msg=el.textContent;
    el.textContent = msg.substring(0,pos)+s+msg.substring(pos,msg.length);
    // put the caret where it should be
    el.focus();
    var sel=window.getSelection();
    sel.collapse(el.firstChild,pos+s.length); // remember inputEl can only contain one (text) node. or should we relax this? anyway at this stage we rewrote its textContent
}

function placeCaretAtEnd(el,flag?) { // flag means only do it if not already in input. returns position
    if ((!flag)||(document.activeElement!=el))
    {
	el.focus();
/*	var range = document.createRange();
	range.selectNodeContents(inputEl);
	range.collapse(false);
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
*/
	var sel = window.getSelection();
	if (el.childNodes.length>0)
	{
	    var node = el.lastChild;
	    var len = node.textContent.length;
	    sel.collapse(node,len);
	    return len;
	}
	else return 0;
    }
    else return window.getSelection().focusOffset; // correct only if one text node TODO think about this
}

const postRawMessage = function(msg: string, socket: Socket) {
  socket.emit("input", msg);
  return true;
};

const interrupt = function(socket: Socket) {
  return function() {
    postRawMessage(keys.ctrlc, socket);
  };
};

module.exports = function() {
  const create = function(shell, editorArea, socket: Socket) {
      const editor = editorArea;
      var cmdHistory: any = []; // History of commands for shell-like arrow navigation
      cmdHistory.index = 0;
      var inputEl; // the input HTML element at the bottom of the shell. note that inputEl should always have *one text node*
      var autoComplete=null; // autocomplete HTML element (when tab is pressed)
      // mathJax/katex related stuff
      var mathJaxState = "<!--txt-->"; // txt = normal output, html = ordinary html, etc
      var htmlComment= /(<!--txt-->|<!--inp-->|<!--con-->|<!--html-->|<!--out-->|\\\(|\\\))/; // the hope is, these <!--*--> sequences are never used in M2
      var htmlCode=""; // saves the current html code to avoid rewriting
      var texCode=""; // saves the current TeX code
      var htmlSec; // html element of current output section

      const inputElCreate = function() {
	  // (re)create the input area
	  if (inputEl) inputEl.parentElement.removeChild(inputEl);
	  inputEl = document.createElement("span");
	  inputEl.contentEditable = true; // inputEl.setAttribute("contentEditable",true);
	  inputEl.spellcheck = false; // sadly this or any of the following attributes are not recognized in contenteditable :(
	  inputEl.autocapitalize = "off";
	  inputEl.autocorrect = "off";
	  inputEl.autocomplete = "off";
	  inputEl.classList.add("M2Input");
	  inputEl.classList.add("M2CurrentInput");
	  shell[0].appendChild(inputEl);
	  inputEl.focus();
      }

      inputElCreate();

      const upDownArrowKeyHandling = function(shell, e: KeyboardEvent) {
	  e.preventDefault();
	  if (cmdHistory.length === 0) {
              // Maybe we did nothing so far.
	      return;
	  }
	  if (e.keyCode === keys.arrowDown) { // DOWN
	      if (cmdHistory.index < cmdHistory.length) {
		  cmdHistory.index++;
		  if (cmdHistory.index === cmdHistory.length) {
		      inputEl.textContent=cmdHistory.current;
		  } else {
		      inputEl.textContent=cmdHistory[cmdHistory.index];
		  }
	      }
	  }
	  else if ((e.keyCode === keys.arrowUp) && (cmdHistory.index > 0)) { // UP
	      if (cmdHistory.index === cmdHistory.length) {
		  cmdHistory.current = inputEl.textContent;
	      }
	      cmdHistory.index--;
	      inputEl.textContent=cmdHistory[cmdHistory.index];
	  }
	  placeCaretAtEnd(inputEl);
    scrollDown(shell);
      };
      
      const codeInputAction = function(e) {
	  // will only trigger if selection is empty
	  if (window.getSelection().isCollapsed)
	  {
	      inputEl.textContent = this.textContent;
	      placeCaretAtEnd(inputEl);
	      scrollDown(shell);
	  }
      };

      const toggleOutput = function(e) {
	  if (window.getSelection().isCollapsed&&(e.target.tagName!="A"))
	  {
	      if (this.classList.contains("M2Html-wrapped")) {
		  this.classList.remove("M2Html-wrapped");
		  var ph = document.createElement("span");
		  ph.classList.add("M2-hidden");
		  var thisel=this; // because of closure, the element will be saved
		  ph.addEventListener("click", function(e) { // so we can restore it later
		      shell[0].insertBefore(thisel,ph);
		      shell[0].removeChild(ph);
		      e.stopPropagation();
		      return false;
		  } );
		  ph.addEventListener("mousedown", function(e) { if (e.detail>1) e.preventDefault(); });
		  shell[0].insertBefore(ph,this);
		  shell[0].removeChild(this);
	      }
	      else this.classList.add("M2Html-wrapped");
	      e.stopPropagation();
	      return false;
	  }
      };

      function removeAutoComplete(flag) { // flag means insert the selection or not
	  if (autoComplete)
	  {
	      var pos=inputEl.textContent.length;
	      inputEl.textContent+=autoComplete.lastChild.textContent;
	      if (flag) {
		  var el=document.getElementById("autocomplete-selection");
		  if (el)
		      addToEl(inputEl,pos,el.textContent+" ");
		  else
		      addToEl(inputEl,pos,autoComplete.word);
	      }
	      else addToEl(inputEl,pos,autoComplete.word);
	      autoComplete.parentElement.removeChild(autoComplete); autoComplete=null;
	  }
      }

      const symbols = {
	  0x3B1:"alpha",0x3B2:"beta",0x3B3:"gamma",0x3B4:"delta",0x3B5:"epsilon",0x3B6:"zeta",0x3B7:"eta",0x3B8:"theta",0x3B9:"iota",0x3BA:"kappa",0x3BB:"lambda",0x3BC:"mu",0x3BD:"nu",0x3BE:"xi",0x3C0:"pi",0x3C1:"rho",0x3C3:"sigma",0x3C2:"varsigma",0x3C4:"tau",0x3C5:"upsilon",0x3C6:"phi",0x3C7:"chi",0x3C8:"psi",0x3C9:"omega",
	  0x393:"Gamma",0x394:"Delta",0x398:"Theta",0x39B:"Lambda",0x39E:"Xi",0x3A0:"Pi",0x3A3:"Sigma",0x3A5:"Upsilon",0x3A6:"Phi",0x3A8:"Psi",0x3A9:"Omega",
	  0x2102:"CC",0x210D:"HH",0x2115:"NN",0x2119:"PP",0x211A:"QQ",0x211D:"RR",0x2124:"ZZ"
      }; // partial support for unicode symbols

      shell.on("postMessage", function(e,msg,flag1,flag2) { // send input, adding \n if necessary
	  removeAutoComplete(false); // remove autocomplete menu if open
	  if (msg.length>0) {
	      shell.trigger("addToHistory",msg);
	      if (msg[msg.length-1] != "\n") msg+="\n";
	      inputEl.textContent=msg;
	      if (flag1&&((<any>document.getElementById("editorToggle")).checked)) shell.trigger("addToEditor",msg);
	      if (flag2) placeCaretAtEnd(inputEl);
	      // sanitize input
	      var clean = "";
	      for (var i=0; i<msg.length; i++) {
		  var c = msg.charCodeAt(i);
		  if (c<128) clean+=msg.charAt(i); // a bit too inclusive
		  else if (symbols[c]) clean+=symbols[c];
	      }
	      postRawMessage(clean, socket);
	  }
      });

    shell.on("addToEditor", function(e, msg) { // add command to editor area
      if (typeof msg !== "undefined") {
        if (editor !== undefined) {
	    editor[0].appendChild(document.createTextNode(msg));
          scrollDown(editor);
        }
      }
    });

    shell.on("addToHistory", function(e, msg) {
        // This function will track the messages, i.e. such that arrow up and
        // down work, but it will not put the msg in the editor textarea. We
        // need this if someone uses the shift+enter functionality in the
        // editor area, because we do not want to track these messages.
      const input = msg.split("\n");
      for (const line in input) {
        if (input[line].length > 0) {
          cmdHistory.index = cmdHistory.push(input[line]);
        }
      }
    });

      shell.bind('paste',function(e) {
	  placeCaretAtEnd(inputEl,true);
      });

      shell.click(function(e) { if (window.getSelection().isCollapsed) placeCaretAtEnd(inputEl,true) });

    // If something is entered, change to end of textarea, if at wrong position.
      shell.keydown(function(e: KeyboardEvent) {
	  removeAutoComplete(false); // remove autocomplete menu if open
      if (e.keyCode === keys.enter) {
	  const msg=inputEl.textContent;
	  shell.trigger("postMessage",[msg,true,true]);
	  scrollDown(shell);
	  return false; // no crappy <div></div> added
      }

      if ((e.keyCode === keys.arrowUp) || (e.keyCode === keys.arrowDown)) {
          upDownArrowKeyHandling(shell, e);
	  return;
      }

	  if (e.ctrlKey || (e.keyCode === keys.ctrlKeyCode)) { // do not jump to bottom on Ctrl
        return;
      }
        // for MAC OS
      if ((e.metaKey && e.keyCode === keys.cKey) || (keys.metaKeyCodes.indexOf(e.keyCode) > -1)) { // do not jump to bottom on Command+C or on Command
        return;
      }
      var pos = placeCaretAtEnd(inputEl,true);

	  /*
      if (e.ctrlKey && e.keyCode === keys.cKey) {
        interrupt(socket);
      }
	  */ // for now CTRL-C is usual "copy"

	  // auto-completion code
	  if (e.keyCode === keys.tab) {
	      var msg = inputEl.textContent;
	      var i=pos-1;
	      while ((i>=0)&&(((msg[i]>="A")&&(msg[i]<="Z"))||((msg[i]>="a")&&(msg[i]<="z")))) i--; // would be faster with regex
	      var word = msg.substring(i+1,pos);
	      // find all M2symbols starting with last word of msg
	      var j=0;
	      while ((j<M2symbols.length)&&(M2symbols[j]<word)) j++;
	      if (j<M2symbols.length) {
		  var k=j;
		  while ((k<M2symbols.length)&&(M2symbols[k].substring(0,word.length)==word)) k++;
		  if (k>j) {
		      if (k==j+1) { // yay, one solution
			  addToEl(inputEl,pos,M2symbols[j].substring(word.length,M2symbols[j].length)+" ");
		      }
		      else { // more interesting: several solutions
			  // obvious implementation would've been datalist + input; sadly, the events generated by the input are 200% erratic, so can't use
			  autoComplete = document.createElement("span");
			  autoComplete.classList.add("autocomplete");
			  autoComplete.word=word;
			  var tabMenu = document.createElement("ul");
			  tabMenu.setAttribute("tabindex","0"); // hack
			  for (var l=j; l<k; l++)
			  {
			      var opt = document.createElement("li");
			      opt.textContent=M2symbols[l];
			      if (l==j) opt.id="autocomplete-selection";
			      opt.addEventListener("mouseover", function() {
				  var el=document.getElementById("autocomplete-selection");
				  if (el) el.removeAttribute("id");
				  this.id="autocomplete-selection";
			      });
			      tabMenu.appendChild(opt);
			  }
			  autoComplete.appendChild(tabMenu);
			  autoComplete.appendChild(document.createTextNode(inputEl.textContent.substring(pos,inputEl.textContent.length)));
			  inputEl.textContent=inputEl.textContent.substring(0,i+1);
			  inputEl.parentElement.appendChild(autoComplete);
			  tabMenu.addEventListener("click", function(e) {
				  removeAutoComplete(true);
				  e.preventDefault();
				  e.stopPropagation();
				  return false;			      
			  });
			  tabMenu.addEventListener("keydown", function(e) {
			      if (e.keyCode === keys.enter) {
				  removeAutoComplete(true);
				  e.preventDefault();
				  e.stopPropagation();
				  return false; // probably overkill
			      }
			      if (e.keyCode === keys.arrowDown) {
				  var el=document.getElementById("autocomplete-selection");
				  if (el) {
				      if (el!=this.lastElementChild) {
					  el.id="";
					  el.nextElementSibling.id="autocomplete-selection";
				      }
				  } else {
				      this.firstElementChild.id="autocomplete-selection";
				  }
				  e.preventDefault();
				  e.stopPropagation();
				  return false; // probably overkill
			      }
			      if (e.keyCode === keys.arrowUp) {
				  var el=document.getElementById("autocomplete-selection");
				  if (el) {
				      if (el!=this.firstElementChild) {
					  el.id="";
					  el.previousElementSibling.id="autocomplete-selection";
				      }
				  } else {
				      this.lastElementChild.id="autocomplete-selection";
				  }
				  e.preventDefault();
				  e.stopPropagation();
				  return false; // probably overkill
			      }
			  });
			  tabMenu.focus();
//			  scrollDown(shell); // not to the bottom: input should still be visible
		      }
		}
	    }
	    e.preventDefault();
	}
      });

      const createSpan = function(className?) {
	  htmlSec=document.createElement('span');
	  if (className) {
	      htmlSec.className=className;
	      if (className.indexOf("M2HtmlOutput")>=0) {
		  htmlSec.addEventListener("click",toggleOutput);
		  htmlSec.addEventListener("mousedown", function(e) {
		      if (e.detail>1) e.preventDefault();
		  });
	      }
	      if (className.indexOf("M2Html")>=0) htmlCode=""; // need to keep track of innerHTML because html tags may get broken
	  }
	  shell[0].insertBefore(htmlSec,inputEl);
      }

    shell.on("onmessage", function(e, msgDirty) {
      if (msgDirty === unicodeBell) {
        return;
      }
        // If we get a 'Session resumed.' message, we check whether it is
        // relevant.
	// seems a bit brutal. what if there's more stuff in there? TODO
	/*
      if (msgDirty.indexOf("Session resumed.") > -1) {
        if (mathProgramOutput.length > 0) { 
          return;
        }
      }
*/

      let msg: string = msgDirty.replace(/\u0007/g, ""); // remove bells -- typically produced by tab characters
      msg = msg.replace(/\r\n/g, "\n"); // that's right...
	//      msg = msg.replace(/\r/g, "\n");
      msg = msg.replace(/\r./g, ""); // fix for the annoying mess of the output, hopefully
      msg = msg.replace(/file:\/\/\/.*\/Macaulay2Doc/g,"http://www2.Macaulay2.com/Macaulay2/doc/Macaulay2-1.11/share/doc/Macaulay2/Macaulay2Doc");
      inputEl.textContent=""; // input will eventually be regurgitated by M2. TOOD: maybe only erase in certain states

      if (!htmlSec) createSpan("M2Text"); // for very first time
      //	console.log("state='"+mathJaxState+"',msg='"+msg+"'");
      var txt=msg.split(htmlComment);
      for (var i=0; i<txt.length; i+=2)
	{
//	    console.log("state='"+mathJaxState+"|"+txt[i-1]+"',txt='"+txt[i]+"'");
	    // if we are at the end of an input section
	    if ((mathJaxState=="<!--inpend-->")&&(((i==0)&&(txt[i].length>0))||((i>0)&&(txt[i-1]!="<!--con-->")))) {
		if (inputEl.parentElement != shell[0]) { // if we moved the input because of multi-line
		    var flag = document.activeElement == inputEl;
		    shell[0].appendChild(inputEl); // move it back
		    if (flag) inputEl.focus();
		}
		// remove the final \n and highlight
		htmlSec.innerHTML=Prism.highlight(htmlSec.firstChild.textContent.substring(0,htmlSec.textContent.length-1),Prism.languages.macaulay2);
		//htmlSec.textContent=htmlSec.textContent.substring(0,htmlSec.textContent.length-1);
		htmlSec.classList.add("M2PastInput");
		htmlSec.addEventListener("click",codeInputAction);
		htmlSec.addEventListener("mousedown", function(e) { if (e.detail>1) e.preventDefault(); });
		// reintroduce a line break
		//		shell[0].insertBefore(document.createTextNode("\n"),inputEl);
		shell[0].insertBefore(document.createElement("br"),inputEl);
		if (i==0) { // manually start new section
		    mathJaxState="<!--txt-->";
		    createSpan("M2Text");
		}
	    }
	    if (i>0) {
		var oldState = mathJaxState;
		mathJaxState=txt[i-1];
		if (mathJaxState=="<!--html-->") { // html section beginning
		    createSpan("M2Html");
		}
		else if (mathJaxState=="<!--out-->") { // pretty much the same
		    createSpan("M2Html M2HtmlOutput");
		}
		else if (mathJaxState=="\\(") { // tex section beginning. should always be in a html section
		    if ((oldState=="<!--html-->")||(oldState=="<!--out-->"))
			texCode="";
		    else {
			mathJaxState=oldState;
			txt[i]="\\("+txt[i]; // if not, treat as ordinary text
		    }
		}
		else if (mathJaxState=="\\)") { // tex section ending
		    if (oldState=="\\(") { // we're not allowing for complicated nested things yet. TODO???
			texCode=dehtml(texCode);
			htmlSec.innerHTML=htmlCode+=katex.renderToString(texCode);
			//htmlSec.innerHTML=htmlCode+=katex.renderToString(texCode,  {macros: {"\\frac" : "\\left( #1 \\middle)\\middle/\\middle( #2 \\right)"}});

			mathJaxState="<!--html-->"; // back to ordinary HTML -- actually, could be outputHTML, but do we care? TODO
		    }
		    else {
			mathJaxState=oldState;
			txt[i]="\\)"+txt[i]; // if not, treat as ordinary text
		    }
		}
		else if (mathJaxState=="<!--inp-->") { // input section: a bit special (ends at first \n)
		    createSpan("M2Input");
		}
		else if (mathJaxState=="<!--con-->") { // continuation of input section
		    // sadly, chrome refuses focus on empty text node *at start of line*
		    // current workaround: extra invisible blank...
		    var lame=document.createElement("span"); lame.innerHTML="&#8203;"; htmlSec.appendChild(lame);
		    var flag = document.activeElement == inputEl;
		    htmlSec.appendChild(inputEl); // !!! we move the input inside the current span to get proper indentation !!! potentially dangerous (can't rewrite the textContent any more)
		    if (flag) inputEl.focus();
		}
		else { // ordinary text (error messages, prompts, etc)
		    createSpan("M2Text");
		}
	    }
	    if (txt[i].length>0) {
		// for next round, check if we're nearing the end of an input section
		if ((mathJaxState=="<!--inp-->")||(mathJaxState=="<!--con-->")) {
		    var ii=txt[i].indexOf("\n");
		    if (ii>=0) {
			mathJaxState="<!--inpend-->";
			if (ii<txt[i].length-1) {
			    // need to do some surgery: what's after the \n is some <!--txt--> stuff
			    txt.splice(i,1,txt[i].substring(0,ii+1),"<!--txt-->",txt[i].substring(ii+1,txt[i].length));
			}
		    }
		}

		if (mathJaxState=="\\(") texCode+=txt[i];
		else if ((mathJaxState=="<!--html-->")||(mathJaxState=="<!--out-->")) htmlSec.innerHTML=htmlCode+=txt[i];
		else { // all other states are raw text
		   // don't rewrite htmlSec.textContent+=txt[i] directly though -- because of multi-line input
		    if (htmlSec.firstChild)
			htmlSec.firstChild.textContent+=txt[i];
		    else
			htmlSec.appendChild(document.createTextNode(txt[i]));
		}
	    }
	}
	scrollDown(shell);
    });

      shell.on("reset", function() {
	  console.log("Reset");
	  removeAutoComplete(false); // remove autocomplete menu if open
	  inputElCreate(); // recreate the input area
//	  shell[0].insertBefore(document.createTextNode("\n"),inputEl);
	  shell[0].insertBefore(document.createElement("br"),inputEl);
	  mathJaxState = "<!--txt-->";
	  htmlSec=null;
    });
  };

  return {
    create,
    interrupt,
  };
};
