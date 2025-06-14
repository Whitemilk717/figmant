/* Imports 
------------------------------------------------------------ */
import { editAnswer } from './figma/msg-handlers/editAnswer';
import { searchBox } from './figma/searchBox';
import { createAnswer } from './figma/msg-handlers/createAnswer';
import { createQuestion } from './figma/msg-handlers/createQuestion';


/* ui.html rendering inside Figma ui popup
------------------------------------------------------------ */
figma.showUI(
    __html__,
    { 
        width: 360,
        height: 580,
        title: "Wizard control panel"
    }
);


/* Figma setup and sending of selectable answer nodes
------------------------------------------------------------ */
figma.loadFontAsync({ family: "Inter", style: "Italic" });  // Makes a font available in the plugin for use

let answers: string[] = [];
figma.currentPage
    .findAll(searchBox.answers)
    .forEach(node => answers.push(node.name));

figma.ui.postMessage({
    type: 'answers',
    payload: answers
});


/* Handler for messages received from React components
------------------------------------------------------------ */
figma.ui.onmessage = (msg) => {
    
    if (msg.type === 'createAnswer') {
        createAnswer(msg);
    }

    else if (msg.type === 'editAnswer') {
        editAnswer(msg);
    }

    else if (msg.type === 'createQuestion') {
        createQuestion();
    }

    else if (msg.type === 'closePlugin') {
        figma.closePlugin();
    }
}