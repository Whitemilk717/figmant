/* Functions for searching components in Figma
------------------------------------------------------------ */
export const searchBox = {

    /* Function to search for Figma canvas answers frames
    -------------------------------------------------------- */
    searchChatBoxFrames: function (node: SceneNode): boolean {
        return (node.name.includes('answers-frame') || node.name.includes('question-frame')? true:false);
    },

    /* Function to search for Figma canvas answer text nodes
    -------------------------------------------------------- */
    searchAnswerNodes: function (node: SceneNode): boolean {
        return (node.name.includes('bot-answer-text')? true:false);  
    },
}