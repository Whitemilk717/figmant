/* Functions for searching components in Figma
------------------------------------------------------------ */
export const searchBox = {

    // /* Function to search for Figma canvas answers frames
    // -------------------------------------------------------- */
    // searchChatBoxFrames: function (node: SceneNode): boolean {
    //     return (node.name.includes('answers-frame-') || node.name.includes('question-frame-')? true:false);
    // },


    // /* Function to search for Figma canvas answer text nodes
    // -------------------------------------------------------- */
    // searchAnswerNodes: function (node: SceneNode): boolean {
    //     return (node.name.includes('bot-answer-text-')? true:false);  
    // },
    
    
    
    
    
    
    /* Function to search for Figma canvas answer nodes
    -------------------------------------------------------- */
    searchAnswers: function (node: SceneNode): boolean {
        return (
            node.name.includes('bot-answer-')
            &&
            node.name != 'bot-answer-text'    
        )? true:false;
    },

    
    /* Function to search for Figma canvas user icon component
    -------------------------------------------------------- */
    searchUserIconComponent: function (node: SceneNode): boolean {
        return (node.name === 'user-icon'? true:false);  
    },


    /* Function to search for Figma canvas user question component
    -------------------------------------------------------- */
    searchUserQuestionComponent: function (node: SceneNode): boolean {
        return (node.name === 'user-question'? true:false);  
    },


    /* Function to search for Figma canvas bot icon component
    -------------------------------------------------------- */
    searchBotIconComponent: function (node: SceneNode): boolean {
        return (node.name === 'bot-icon'? true:false);  
    },


    /* Function to search for Figma canvas bot answer component
    -------------------------------------------------------- */
    searchBotAnswerComponent: function (node: SceneNode): boolean {
        return (node.name === 'bot-answer'? true:false);  
    },


    /* Function to search for Figma canvas chat-box
    -------------------------------------------------------- */
    searchChatBox: function (node: SceneNode): boolean {
        return (node.name === 'chat-box'? true:false);  
    },


    /* Function to search for a new user icon number
    -------------------------------------------------------- */
    searchNewUserIconNumber: function (chatBox: FrameNode) {
        let targetNumber = 1;
        
        chatBox.children.forEach(child => {
            if (child.name.includes('user-icon')) {
                let number = Number(child.name.split('-').pop());
                if (number == targetNumber) targetNumber++;
            }
        });

        return targetNumber;
    },


    /* Function to search for a new user question number
    -------------------------------------------------------- */
    searchNewUserQuestionNumber: function (chatBox: FrameNode) {
        let targetNumber = 1;
        
        chatBox.children.forEach(child => {
            if (child.name.includes('user-question')) {
                let number = Number(child.name.split('-').pop());
                if (number == targetNumber) targetNumber++;
            }
        });

        return targetNumber;
    },


    /* Function to search for a new bot icon number
    -------------------------------------------------------- */
    searchNewBotIconNumber: function (chatBox: FrameNode): number {
        let targetNumber = 1;
        
        chatBox.children.forEach(child => {
            if (child.name.includes('bot-icon')) {
                let number = Number(child.name.split('-').pop());
                if (number == targetNumber) targetNumber++;
            }
        });

        return targetNumber;
    },


    /* Function to search for a new bot answer number
    -------------------------------------------------------- */
    searchNewBotAnswerNumber: function (chatBox: FrameNode): number {
        let targetNumber = 1;
        
        chatBox.children.forEach(child => {
            if (child.name.includes('bot-answer')) {
                let number = Number(child.name.split('-').pop());
                if (number == targetNumber) targetNumber++;
            }
        });

        return targetNumber;
    },
}