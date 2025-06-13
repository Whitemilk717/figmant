/* functions to sort nodes obtained from Figma canvas
------------------------------------------------------------ */
export const sortBox = {

    /* Function to sort bot-answer-text-<num> nodes
    -------------------------------------------------------- */
    sortAnswerTexts: function (answerA: SceneNode, answerB: SceneNode): number {
        const numA = Number(answerA.name.split('-').pop());
        const numB = Number(answerB.name.split('-').pop());
        return numA - numB;
    },


    /* Function to sort <question/answers>-frame-<num> nodes
    -------------------------------------------------------- */
    sortChatBoxMessages: function (frameA: SceneNode, frameB: SceneNode): number {
        const [qaA, , numA] = frameA.name.split('-');                               // qa can be 'question' or 'answers'
        const [qaB, , numB] = frameB.name.split('-');
        
        if (numA != numB) return Number(numA) - Number(numB)
        
        return qaB.localeCompare(qaA);
    },
}