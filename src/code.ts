/* Imports 
------------------------------------------------------------ */
import { sendBox } from './figma/boxes/sendBox';
import { searchBox } from './figma/boxes/searchBox';
import { hideNodes } from './figma/msg-handlers/hideNodes';
import { editAnswer } from './figma/msg-handlers/editAnswer';
import { createAnswer } from './figma/msg-handlers/createAnswer';
import { createQuestion } from './figma/msg-handlers/createQuestion';


/* Data
------------------------------------------------------------ */
const uiWidth = 360;
const uiHeight = 710;
const previewLength = 30;



/* ui.html rendering inside Figma ui popup
------------------------------------------------------------ */
figma.showUI(
    __html__,
    { 
        width: uiWidth,
        height: uiHeight,
        title: "Wizard control panel"
    }
);


/* Figma font setup
------------------------------------------------------------ */
const botAnswerComp = figma.currentPage.findOne(searchBox.botAnswerComp) as FrameNode;
const botFont = (botAnswerComp.children[0] as TextNode).fontName as FontName;
const userQuestionComp = figma.currentPage.findOne(searchBox.userQuestionComp) as FrameNode;
const userFont = (userQuestionComp.children[0] as TextNode).fontName as FontName;

figma.loadFontAsync(botFont);   // Makes a font available in the plugin to use
figma.loadFontAsync(userFont);


/* Send to WizardApp every selectable chatbox node and answer node 
------------------------------------------------------------ */
sendBox.setPreviewLength(previewLength);
sendBox.sendAll()


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

    else if (msg.type === 'hideNodes') {
        hideNodes(msg);
    }

    else if (msg.type === 'closePlugin') {
        figma.closePlugin();
    }
}