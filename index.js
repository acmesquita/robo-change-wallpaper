const readline = require('readline-sync')
const robots = {
    text: require('./robots/text')
}

async function start(){
    const content = {}

    content.searchTerm = askAndReturnSearchTerm()
    await robots.text(content)

    function askAndReturnSearchTerm(){
        return readline.question('Type a term to theme: ')
    }

    console.log(content)
}

start()