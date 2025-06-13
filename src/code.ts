/* Imports 
------------------------------------------------------------ */
import { sortBox } from './figma-tools/sortBox';
import { searchBox } from './figma-tools/searchBox';
import { changeAnswerHandler } from './figma-tools/changeAnswerHandler';
import { createAnswerHandler } from './figma-tools/createAnswerHandler';
import { nextQuestionHandler } from './figma-tools/nextQuestionHandler';


/* ui.html rendering inside Figma popup
------------------------------------------------------------ */
figma.showUI(
    __html__,
    { 
        width: 360,
        height: 580,
        title: "Wizard control panel"
    }
);


/* Figma setup and sending of selectable text nodes
------------------------------------------------------------ */
figma.loadFontAsync({ family: "Inter", style: "Italic" });  // Makes a font available in the plugin for use

let answers: string[] = [];
figma.currentPage.findAll(searchBox.searchAnswers).forEach(node => answers.push(node.name));

figma.ui.postMessage({
    type: 'answers',
    payload: answers
});


/* Handler for messages received from React components
------------------------------------------------------------ */
figma.ui.onmessage = (message) => {

    if (message.type === 'changeAnswer') {
        changeAnswerHandler(message);
    }

    else if (message.type === 'createAnswer') {
        createAnswerHandler(message);
    }

    else if (message.type === 'nextQuestion') {
        nextQuestionHandler();
    }

    else if (message.type && message.type === 'closePlugin') {
        figma.closePlugin();
    }
}