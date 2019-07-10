const algorithmia = require('algorithmia')
const algorithmiaCredential = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')

async function robot(content){
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)

    async function fetchContentFromWikipedia(content){
        var input = {
          "articleName": content.searchTerm,
          "lang": "en"
        };
        const algorithmiaAuth = algorithmia.client(algorithmiaCredential);
        const wikipediaAlgorithm = algorithmiaAuth.algo("web/WikipediaParser/0.1.2")
        const wikipediaResponse = await wikipediaAlgorithm.pipe(input)
        const wikipediaContent = wikipediaResponse.get();
        content.sourceContentOriginal = wikipediaContent.content

    }

    function sanitizeContent(content){
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
        const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)

        content.sourceContentSanitized = withoutDatesInParentheses;
        
        function removeBlankLinesAndMarkdown(text){
            const allLines = text.split('\n')

            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if(line.trim().length === 0 || line.trim().startsWith("=")){
                    return false
                }
                return true
            })

            return withoutBlankLinesAndMarkdown.join(' ')
        }

        function removeDatesInParentheses(text){
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
        }
       
    }

    function breakContentIntoSentences(content){
        content.sentences = []

        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach(sentence => {
            content.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            })
        })

    }

}

module.exports = robot;