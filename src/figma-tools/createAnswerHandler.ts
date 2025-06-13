/* Imports
------------------------------------------------------------ */
import { searchBox } from './searchBox';


/* Function to handle change text messages from the wizard
------------------------------------------------------------ */
export async function createAnswerHandler(message) {

    // const userIconComponent = figma.currentPage.findOne(searchBox.searchUserIconComponent) as ComponentNode;         // Retrieval of every component
    // const userQuestionComponent = figma.currentPage.findOne(searchBox.searchUserQuestionComponent) as ComponentNode;
    const botIconComponent = figma.currentPage.findOne(searchBox.searchBotIconComponent) as ComponentNode;
    const botAnswerComponent = figma.currentPage.findOne(searchBox.searchBotAnswerComponent) as ComponentNode;
    
    const chatBox = figma.currentPage.findOne(searchBox.searchChatBox) as FrameNode;
    const lastMessage = chatBox.children[chatBox.children.length - 1];

    if (lastMessage.name.includes('user-question')) {                           // If it's the bot's first message, add its icon
        const newBotIcon = botIconComponent.createInstance();
        const newNumber = String(searchBox.searchNewBotIconNumber(chatBox));
        newBotIcon.name = newBotIcon.name.concat('-', newNumber);
        chatBox.appendChild(newBotIcon);
    }

    const newBotAnswer = botAnswerComponent.createInstance();               // In any case, we need to add the new answer
    const newNumber = String(searchBox.searchNewBotAnswerNumber(chatBox));
    newBotAnswer.name = newBotAnswer.name.concat('-', newNumber);
    const newBotAnswerText = newBotAnswer.children[0] as TextNode;
    newBotAnswerText.autoRename = false;                                    // If false, the node name is not changed
    
    newBotAnswerText.characters = message.characters;
    chatBox.appendChild(newBotAnswer);

    let answers: string[] = [];
    figma.currentPage.findAll(searchBox.searchAnswers).forEach(node => answers.push(node.name));
    figma.ui.postMessage({
        type: 'answers',
        payload: answers
    });
}