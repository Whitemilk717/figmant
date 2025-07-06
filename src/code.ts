/* Imports 
------------------------------------------------------------ */
import { sendBox } from './figma/boxes/sendBox';
import { searchBox } from './figma/boxes/searchBox';
import { hideNodes } from './figma/msg-handlers/chat/hideNodes';
import { editAnswer } from './figma/msg-handlers/chat/editAnswer';
import { createChatBox } from './figma/init-functions/createChatBox';
import { createAnswer } from './figma/msg-handlers/chat/createAnswer';
import { editVariant } from './figma/msg-handlers/variants/editVariant';
import { hideVariants } from './figma/msg-handlers/variants/hideVariants';
import { createQuestion } from './figma/msg-handlers/chat/createQuestion';
import { createVariant } from './figma/msg-handlers/variants/createVariant';
import { createComponentsFrame } from './figma/init-functions/createComponentsFrame';
// import { goToDestinationFrame } from './figma/msg-handlers/navigation/goToDestinationFrame';


/* Async function main (it calls some async functions)
------------------------------------------------------------ */
async function main() {


    // Data
    let logsOn;                 // Wizard choice about writing log files
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
    const botAnswerComp = searchBox.nodeNamed('Bot-answer') as FrameNode;
    const botFont = (botAnswerComp.children[0] as TextNode).fontName as FontName;
    const userQuestionComp = searchBox.nodeNamed('User-question') as FrameNode;    
    const userFont = (
        (userQuestionComp.children[0] as FrameNode)
        .children[0] as TextNode
    ).fontName as FontName;

    await figma.loadFontAsync(botFont);
    await figma.loadFontAsync(userFont);
    
    
    // chat box creation
    createChatBox();
    
    
    // Send to WizardApp every selectable chatbox node and answer node
    sendBox.setPreviewLength(previewLength);
    sendBox.chatBoxNodes();

    
    /* Send to WizardApp every selectable component set, frame and created variant
    ---------------------------------------------------------------------------------------------------- */
    sendBox.compSets();
    sendBox.frames();
    sendBox.createdVariants();
    
    
    // Handler for messages received from React components
    figma.ui.onmessage = async (msg) => {
        
        if (msg.type === 'logsOn') {
            logsOn = msg.logsOn;
            if (logsOn === 'ON') await sendBox.logMsg('startSession');
        }
        
        else if (msg.type === 'createAnswer') {
            createAnswer(msg, logsOn);
        }
    
        else if (msg.type === 'editAnswer') {
            editAnswer(msg, logsOn);
        }
    
        else if (msg.type === 'createQuestion') {
            createQuestion(msg, logsOn);
        }
    
        else if (msg.type === 'hideNodes') {
            hideNodes(msg, logsOn);
        }

        else if (msg.type === 'createVariant') {
            createVariant(msg, logsOn);
        }

        else if (msg.type === 'editVariant') {
            editVariant(msg, logsOn);
        }

        else if (msg.type === 'hideVariants') {
            hideVariants(msg, logsOn);
        }

        // else if (msg.type === 'goTo') {
        //     goToDestinationFrame(msg);
        // }
    
        else if (msg.type === 'closePlugin') {
            if (logsOn === 'ON') await sendBox.logMsg('stopSession');
            figma.closePlugin();
        }
    }

}


/* main call
------------------------------------------------------------ */
main();