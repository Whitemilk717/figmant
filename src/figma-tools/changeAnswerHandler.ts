/* Function to handle change text messages from the wizard
------------------------------------------------------------ */
export function changeAnswerHandler(message): void {

    let botAnswer = figma.currentPage.findOne(node => (
        node.name === message.answer
    )) as InstanceNode;

    if (botAnswer) {
        const botAnswerText = botAnswer.children[0] as TextNode;
        botAnswerText.characters = message.newCharacters;                           // Text node content replacement
    }
}