/* Imports
------------------------------------------------------------ */
import { searchBox } from '../searchBox';


/* Function to create an answer node
------------------------------------------------------------ */
export async function createAnswer(message) {


    // Data
    const iconComp = figma.currentPage.findOne(searchBox.botIconComp) as ComponentNode;
    const answerComp = figma.currentPage.findOne(searchBox.botAnswerComp) as ComponentNode;
    const chatBox = figma.currentPage.findOne(searchBox.chatBox) as FrameNode;
    const lastMessage = chatBox.children[chatBox.children.length - 1];
    let nextNumber;


    // If it's the first message, add the icon
    if (!lastMessage || lastMessage.name.includes('user-question')) {
        const newIcon = iconComp.createInstance();
        nextNumber = String(searchBox.nextBotIconNumber(chatBox));
        newIcon.name = newIcon.name.concat('-', nextNumber);
        chatBox.appendChild(newIcon);
    }


    // Add the new answer and edit its characters
    const newAnswer = answerComp.createInstance();
    nextNumber = String(searchBox.nextBotAnswerNumber(chatBox));
    newAnswer.name = newAnswer.name.concat('-', nextNumber);

    const newText = newAnswer.children[0] as TextNode;
    newText.characters = message.payload;
    chatBox.appendChild(newAnswer);


    // Send to WizardApp every selectable answer
    let answers: string[] = [];
    figma.currentPage.findAll(searchBox.answers).forEach(node => answers.push(node.name));
    figma.ui.postMessage({
        type: 'answers',
        payload: answers
    });
}