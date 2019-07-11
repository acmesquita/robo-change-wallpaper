const readline = require('readline-sync')
const robots = {
    text: require('./robots/text')
}

async function start(){
    const content = {
        maximumSentences: 7
    }

    content.searchTerm = askAndReturnSearchTerm()
    await robots.text(content)

    function askAndReturnSearchTerm(){
        return readline.question('Type a term to theme: ')
    }

    console.log(JSON.stringify(content.sentences, null, 2))
}

start()