const readline = require('readline-sync')
const state = require('./state')

function robot() {

    const content = {
        maximumSentences: 7
    }
    
    content.searchTerm = askAndReturnSearchTerm()
    state.save(content)

    function askAndReturnSearchTerm(){
        return readline.question('Type a term to theme: ')
    }

}

module.exports = robot