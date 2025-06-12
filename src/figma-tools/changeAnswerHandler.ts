/* Function to handle change text messages from the wizard
------------------------------------------------------------ */
export function changeAnswerHandler(message): void {

    let botAnswer: TextNode = figma.currentPage.findOne(node => (
        node.type === 'TEXT' 
        && 
        node.name === message.textNodeName
    )) as TextNode;

    let botAnswerBox: RectangleNode = figma.currentPage.findOne(node => (
        node.type === 'RECTANGLE'
        && 
        node.name === 'bot-answer-box-'.concat(message.textNodeName.split('-').pop())
    )) as RectangleNode;

    if (botAnswer && botAnswerBox) {
        botAnswer.autoRename = false;                                           // If false, the node name is not changed
        botAnswer.characters = message.newCharacters;                           // Text node content replacement
        botAnswerBox.resize(botAnswerBox.width, botAnswer.height + (23 * 2));   // Text block resizing + margin top and bottom
    }
}