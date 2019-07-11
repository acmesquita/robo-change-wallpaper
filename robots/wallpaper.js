const exec = require('child_process').exec;

async function robot(){

    changeWallPaper()

    function changeWallPaper(){
        const min=0; 
        const max=7;  
        const number =Math.floor(Math.random() * (+max - +min)) + +min;
        const path = `file:///home/infoway/Workspace/estudos/robots/playlist-deschamps/robo-change-wallpaper/content/${number}-original.png`

        const cmd = `gsettings set org.gnome.desktop.background picture-uri '${path}'`;

        exec(cmd, function(error, stdout, stderr) {
            if(error){
                throw new Error(`> Erro ao mudar a tela de fundo: ${error}`)
            }
            console.log("Mudança realizada com sucesso!")
        });
    }

}

module.exports = robot