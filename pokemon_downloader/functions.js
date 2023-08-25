import fetch from 'node-fetch';
import inquirer from "inquirer";
import { API_URL } from './utils.js';
import { parseOptions } from './savings.js';

export const promptForName = async () => {

    const question = [{
        type: 'input',
        name: 'name',
        message: 'Pokemon name: '
    }];

    const name = await inquirer.prompt(question);
    return name;
};


export const promptForInformation = async () => {

    const question = [{
        type: 'checkbox',
        name: 'toDownload',
        message: 'Pokemon info to download: ',
        choices: ['Stats', 'Sprites', 'Artwork']
    }];

    const toDownload = await inquirer.prompt(question);
    
    return toDownload;
};


export const fetchPokemon = async (name) => {
    
    const response = await fetch(API_URL(name.toLowerCase()));

    if (response.status === 404) {
        return "not found"
    } else {
        return await response.json();
    }
};

const promptToContinue = async () => {
    
    const question = [{
        type: 'list',
        name: 'continue',
        message: 'Would you like to search for another pokemon?',
        choices: ['Yes', 'No']
    }];

    const toContinue = inquirer.prompt(question);

    return toContinue;
};

export const promptUser = async () => {
    
    while (true) {
        
        const name = await promptForName();
        const pokemon = await fetchPokemon(name.name);
        
        if (pokemon === "not found") {
            return console.log("Sorry, pokemon not found")
        } 

        const info = await promptForInformation();
        
        // create a folder for pokemon
        await parseOptions(pokemon, info);
        
        const searchAgain = await promptToContinue();

        if (searchAgain.continue === "No") break;
    }
}