/* Imports 
------------------------------------------------------------ */
import { sendBox } from './figma/boxes/sendBox';
import { searchBox } from './figma/boxes/searchBox';
import { createChatBox } from './figma/createChatBox';
import { hideNodes } from './figma/msg-handlers/hideNodes';
import { editAnswer } from './figma/msg-handlers/editAnswer';
import { createAnswer } from './figma/msg-handlers/createAnswer';
import { createQuestion } from './figma/msg-handlers/createQuestion';
import { createComponentsFrame } from './figma/createComponentsFrame';


/* Async function main (it calls some async functions)
------------------------------------------------------------ */
async function main() {


    // Data
    const uiWidth = 360;
    const uiHeight = 750;
    const previewLength = 30;
    
    
    
    // ui.html rendering inside Figma ui popup
    figma.showUI(
        __html__,
        { 
            width: uiWidth,
            height: uiHeight,
            title: "Wizard control panel"
        }
    );
    
    
    // Components frame creation
    await createComponentsFrame();

    
    // Figma font setup (if it has been customized)
    const botAnswerComp = figma.currentPage.findOne(searchBox.botAnswerComp) as FrameNode;
    const botFont = (botAnswerComp.children[0] as TextNode).fontName as FontName;
    const userQuestionComp = figma.currentPage.findOne(searchBox.userQuestionComp) as FrameNode;    
    const userFont = (userQuestionComp.children[0] as TextNode).fontName as FontName;
    
    await figma.loadFontAsync(botFont);
    await figma.loadFontAsync(userFont);
    
    
    // chat-box check
    createChatBox();
    
    
    // Send to WizardApp every selectable chatbox node and answer node
    sendBox.setPreviewLength(previewLength);
    sendBox.sendAll();
    
    
    // Handler for messages received from React components
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
}


/* main call
------------------------------------------------------------ */
main();