/* Imports
------------------------------------------------------------ */
import { sortBox } from './sortBox';
import { searchBox } from './searchBox';


/* Function to handle change text messages from the wizard
------------------------------------------------------------ */
export async function nextQuestionHandler() {

    const userIconComponent = figma.currentPage.findOne(searchBox.searchUserIconComponent) as ComponentNode;         // Retrieval of every component
    const userQuestionComponent = figma.currentPage.findOne(searchBox.searchUserQuestionComponent) as ComponentNode;
    
    const chatBox = figma.currentPage.findOne(searchBox.searchChatBox) as FrameNode;
    // const lastMessage = chatBox.children[chatBox.children.length - 1];

    const newUserIcon = userIconComponent.createInstance();
    const newNumberIcon = String(searchBox.searchNewUserIconNumber(chatBox));
    newUserIcon.name = newUserIcon.name.concat('-', newNumberIcon);
    chatBox.appendChild(newUserIcon);

    const newUserAnswer = userQuestionComponent.createInstance();               // In any case, we need to add the new question
    const newNumber = String(searchBox.searchNewUserQuestionNumber(chatBox));
    newUserAnswer.name = newUserAnswer.name.concat('-', newNumber);
    const newUserAnswerText = newUserAnswer.children[0] as TextNode;
    newUserAnswerText.autoRename = false;                                    // If false, the node name is not changed
    chatBox.appendChild(newUserAnswer);
}