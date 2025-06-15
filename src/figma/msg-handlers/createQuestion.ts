/* Imports
------------------------------------------------------------ */
import { sendBox } from '../boxes/sendBox';
import { searchBox } from '../boxes/searchBox';


/* Function to create a question node
------------------------------------------------------------ */
export async function createQuestion() {


    // Data
    const iconComp = figma.currentPage.findOne(searchBox.userIconComp) as ComponentNode;
    const questionComp = figma.currentPage.findOne(searchBox.userQuestionComp) as ComponentNode;
    const chatBox = figma.currentPage.findOne(searchBox.chatBox) as FrameNode;
    const lastMessage = chatBox.children[chatBox.children.length - 1];
    let nextNumber;


    // If it's the first message, add the icon
    if (!lastMessage || lastMessage.name.includes('bot-answer')) {
        const newIcon = iconComp.createInstance();
        nextNumber = String(searchBox.nextUserIconNumber(chatBox));
        newIcon.name = newIcon.name.concat('-', nextNumber);
        chatBox.appendChild(newIcon);
    }


    // Add the new question
    const newAnswer = questionComp.createInstance();
    nextNumber = String(searchBox.nextUserQuestionNumber(chatBox));
    newAnswer.name = newAnswer.name.concat('-', nextNumber);
    chatBox.appendChild(newAnswer);


    // Send to WizardApp every selectable chatbox node and answer node 
    sendBox.sendAll();
}