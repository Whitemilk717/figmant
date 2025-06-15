/* Functions for searching nodes in Figma canvas
------------------------------------------------------------ */
export const searchBox = {
    

    // Function to search for Figma canvas answer nodes
    answers: function (node: SceneNode): boolean {
        return (
            node.name.includes('bot-answer-')
            &&
            node.name != 'bot-answer-text'    
        )? true:false;
    },


    // Function to search for Figma canvas bot icon component
    botIconComp: function (node: SceneNode): boolean {
        return (node.name === 'bot-icon'? true:false);  
    },


    // Function to search for Figma canvas bot answer component
    botAnswerComp: function (node: SceneNode): boolean {
        return (node.name === 'bot-answer'? true:false);  
    },

    
    // Function to search for Figma canvas user icon component
    userIconComp: function (node: SceneNode): boolean {
        return (node.name === 'user-icon'? true:false);  
    },


    // Function to search for Figma canvas user question component
    userQuestionComp: function (node: SceneNode): boolean {
        return (node.name === 'user-question'? true:false);  
    },


    // Function to search for Figma canvas chat-box
    chatBox: function (node: SceneNode): boolean {
        return (node.name === 'chat-box'? true:false);  
    },


    // Function to search for a new user icon number
    nextUserIconNumber: function (chatBox: FrameNode) {
        let targetNumber = 1;
        
        chatBox.children.forEach(child => {
            if (child.name.includes('user-icon')) {
                let number = Number(child.name.split('-').pop());
                if (number == targetNumber) targetNumber++;
            }
        });

        return targetNumber;
    },


    // Function to search for a new user question number
    nextUserQuestionNumber: function (chatBox: FrameNode) {
        let targetNumber = 1;
        
        chatBox.children.forEach(child => {
            if (child.name.includes('user-question')) {
                let number = Number(child.name.split('-').pop());
                if (number == targetNumber) targetNumber++;
            }
        });

        return targetNumber;
    },


    // Function to search for a new bot icon number
    nextBotIconNumber: function (chatBox: FrameNode): number {
        let targetNumber = 1;
        
        chatBox.children.forEach(child => {
            if (child.name.includes('bot-icon')) {
                let number = Number(child.name.split('-').pop());
                if (number == targetNumber) targetNumber++;
            }
        });

        return targetNumber;
    },


    // Function to search for a new bot answer number
    nextBotAnswerNumber: function (chatBox: FrameNode): number {
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