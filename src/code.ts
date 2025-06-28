/* Imports 
------------------------------------------------------------ */
import { sendBox } from './figma/boxes/sendBox';
import { searchBox } from './figma/boxes/searchBox';
import { hideNodes } from './figma/msg-handlers/hideNodes';
import { editAnswer } from './figma/msg-handlers/editAnswer';
import { createAnswer } from './figma/msg-handlers/createAnswer';
import { createQuestion } from './figma/msg-handlers/createQuestion';
import { createChatBox } from './figma/init-functions/createChatBox';
import { createComponentsFrame } from './figma/init-functions/createComponentsFrame';


/* Async function main (it calls some async functions)
------------------------------------------------------------ */
async function main() {


    // Data
    const uiWidth = 370;
    const uiHeight = 700;
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
    const botAnswerComp = figma.currentPage.findOne(searchBox.nodeNamed('Bot-answer')) as FrameNode;
    const botFont = (botAnswerComp.children[0] as TextNode).fontName as FontName;
    const userQuestionComp = figma.currentPage.findOne(searchBox.nodeNamed('User-question')) as FrameNode;    
    const userFont = (
                        (userQuestionComp.children[0] as FrameNode)
                        .children[0] as TextNode
                    )
                    .fontName as FontName;

    await figma.loadFontAsync(botFont);
    await figma.loadFontAsync(userFont);
    
    
    // chat box creation
    createChatBox();
    
    
    // Send to WizardApp every selectable chatbox node and answer node
    sendBox.setPreviewLength(previewLength);
    sendBox.chatBoxNodes();

    
    /* Send to WizardApp every selectable component set and frame
    ---------------------------------------------------------------------------------------------------- */
    sendBox.compSets();
    sendBox.frames();
    
    
    // Handler for messages received from React components
    figma.ui.onmessage = (msg) => {
        
        if (msg.type === 'createAnswer') {
            createAnswer(msg);
        }
    
        else if (msg.type === 'editAnswer') {
            editAnswer(msg);
        }
    
        else if (msg.type === 'createQuestion') {
            createQuestion(msg);
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