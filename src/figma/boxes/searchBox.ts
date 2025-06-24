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