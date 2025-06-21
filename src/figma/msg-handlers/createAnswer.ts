/* Imports
------------------------------------------------------------ */
import { sendBox } from '../boxes/sendBox';
import { searchBox } from '../boxes/searchBox';


/* Function to create an answer node
------------------------------------------------------------ */
export async function createAnswer(msg) {


    // Data
    const iconComp = figma.currentPage.findOne(searchBox.nodeNamed('bot-icon')) as ComponentNode;
    const answerComp = figma.currentPage.findOne(searchBox.nodeNamed('bot-answer')) as ComponentNode;
    const chatBox = figma.currentPage.findOne(searchBox.nodeNamed('chat-box')) as FrameNode;
    const lastMsg = chatBox.children[chatBox.children.length - 1];
    let nextNumber;


    // If it's the first msg, add the icon
    if (msg.iconFlag) {
        const newIcon = iconComp.createInstance();
        nextNumber = String(searchBox.nextCompNum(chatBox, 'bot-icon'));
        newIcon.name = newIcon.name.concat('-', nextNumber);
        chatBox.appendChild(newIcon);
    }


    // Add the new answer and edit its characters
    const newAnswer = answerComp.createInstance();
    nextNumber = String(searchBox.nextCompNum(chatBox, 'bot-answer'));
    newAnswer.name = newAnswer.name.concat('-', nextNumber);

    const newText = newAnswer.children[0] as TextNode;
    newText.characters = msg.payload;
    chatBox.appendChild(newAnswer);


    // Send to WizardApp every selectable chatbox node and answer node 
    sendBox.sendAll();
}