const readline = require('readline-sync')

function start(){
    const content = {}

    content.searchTerm = askAndReturnSearchTerm()

    function askAndReturnSearchTerm(){
        return readline.question('Type a term to theme: ')
    }

    console.log(content)
}

start()