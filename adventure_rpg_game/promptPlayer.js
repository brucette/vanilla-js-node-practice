import inquirer from "inquirer";

async function promptPlayer() {
    const question = [{
        type: 'list',
        name: 'direction',
        message: 'Which direction would you like to go?',
        choices: ['Left', 'Right', 'Up', 'Down']
    }];

    const response = await inquirer.prompt(question);

    return response.direction;
}

export default promptPlayer;