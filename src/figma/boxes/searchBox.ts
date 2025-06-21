/* Functions for searching nodes in Figma canvas
------------------------------------------------------------ */
export const searchBox = {


    // findOne argument functions
    nodeNamed: function (name: string) {

        if (name === 'bot-icon') {
            return function (node: SceneNode): boolean {
                return (node.name === 'bot-icon'? true:false);
            }
        }

        if (name === 'bot-answer') {
            return function (node: SceneNode): boolean {
                return (node.name === 'bot-answer'? true:false);
            }
        }

        if (name === 'user-icon') {
            return function (node: SceneNode): boolean {
                return (node.name === 'user-icon'? true:false);
            }
        }

        if (name === 'user-question') {
            return function (node: SceneNode): boolean {
                return (node.name === 'user-question'? true:false);
            }
        }

        if (name === 'chat-box') {
            return function (node: SceneNode): boolean {
                return (node.name === 'chat-box'? true:false);
            }
        }
    },


    // Function to search for a new component number
    nextCompNum: function (chatBox: FrameNode, childName: string) {
        let newNum = 1;
        
        chatBox.children.forEach(child => {
            if (child.name.includes(childName)) {
                let number = Number(child.name.split('-').pop());
                if (number == newNum) newNum++;
            }
        });

        return newNum;
    },


    // // Function to search for a new user icon number
    // nextUserIconNumber: function (chatBox: FrameNode) {
    //     let targetNumber = 1;
        
    //     chatBox.children.forEach(child => {
    //         if (child.name.includes('user-icon')) {
    //             let number = Number(child.name.split('-').pop());
    //             if (number == targetNumber) targetNumber++;
    //         }
    //     });

    //     return targetNumber;
    // },


    // // Function to search for a new user question number
    // nextUserQuestionNumber: function (chatBox: FrameNode) {
    //     let targetNumber = 1;
        
    //     chatBox.children.forEach(child => {
    //         if (child.name.includes('user-question')) {
    //             let number = Number(child.name.split('-').pop());
    //             if (number == targetNumber) targetNumber++;
    //         }
    //     });

    //     return targetNumber;
    // },


    // // Function to search for a new bot icon number
    // nextBotIconNumber: function (chatBox: FrameNode): number {
    //     let targetNumber = 1;
        
    //     chatBox.children.forEach(child => {
    //         if (child.name.includes('bot-icon')) {
    //             let number = Number(child.name.split('-').pop());
    //             if (number == targetNumber) targetNumber++;
    //         }
    //     });

    //     return targetNumber;
    // },


    // // Function to search for a new bot answer number
    // nextBotAnswerNumber: function (chatBox: FrameNode): number {
    //     let targetNumber = 1;
        
    //     chatBox.children.forEach(child => {
    //         if (child.name.includes('bot-answer')) {
    //             let number = Number(child.name.split('-').pop());
    //             if (number == targetNumber) targetNumber++;
    //         }
    //     });

    //     return targetNumber;
    // },


    // Function to search for a new variable number
    nextVarNum: async function () {
        let targetNumber = 1;
        const variables = await figma.variables.getLocalVariablesAsync();
        
        variables.forEach(variable => {
            if (variable.name.includes('text-var-')) {
                const number = Number(variable.name.split('-').pop())
                if (number == targetNumber) targetNumber++;
            }
        })

        return targetNumber;
    },
}