/* Imports
------------------------------------------------------------ */
import { sendBox } from '../boxes/sendBox';
import { searchBox } from '../boxes/searchBox';


/* Function to hide a message
------------------------------------------------------------ */
export async function hideNodes(msg) {


    // General data
    const chatBox = figma.currentPage.findOne(searchBox.nodeNamed('chat-box')) as FrameNode;

    let botHiddenIconNum = 1;
    let userHiddenIconNum = 1;
    let botHiddenAnswerNum = 1;
    let userHiddenQuestionNum = 1;

    let botIconNum = 1;
    let userIconNum = 1;
    let botAnswerNum = 1;
    let userQuestionNum = 1;

    let nodeType;


    // Hide routine
    chatBox.children.forEach(node => {

        // rinomina i nodi nascosti
        if (node.name.includes('bot-hidden-icon')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + botHiddenIconNum;
            botHiddenIconNum++;
        }
        if (node.name.includes('user-hidden-icon')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + userHiddenIconNum;
            userHiddenIconNum++;
        }
        if (node.name.includes('bot-hidden-answer')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + botHiddenAnswerNum;
            botHiddenAnswerNum++;
        }
        if (node.name.includes('user-hidden-question')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + userHiddenQuestionNum;
            userHiddenQuestionNum++;
        }


        // nascondi il nodo
        if (msg.targets.includes(node.name)) {
            node.visible = false;
            nodeType = node.name.substring(0, node.name.lastIndexOf('-'));

            if (nodeType.includes('bot-icon')) {
                node.name = 'bot-hidden-icon-' + botHiddenIconNum;
                botHiddenIconNum++;
            }
            if (nodeType.includes('user-icon')) {
                node.name = 'user-hidden-icon-' + userHiddenIconNum;
                userHiddenIconNum++;
            }
            if (nodeType.includes('bot-answer')) {
                node.name = 'bot-hidden-answer-' + botHiddenAnswerNum;
                botHiddenAnswerNum++;
            }
            if (nodeType.includes('user-question')) {
                node.name = 'user-hidden-question-' + userHiddenQuestionNum;
                userHiddenQuestionNum++;
            }
        }


        // rinomina i nodi non nascosti
        if (node.name.includes('bot-icon')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + botIconNum;
            botIconNum++;
        }
        if (node.name.includes('user-icon')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + userIconNum;
            userIconNum++;
        }
        if (node.name.includes('bot-answer')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + botAnswerNum;
            botAnswerNum++;
        }
        if (node.name.includes('user-question')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + userQuestionNum;
            userQuestionNum++;
        }

    });
    

    // Send to WizardApp every selectable chatbox node and answer node 
    sendBox.sendAll();
}