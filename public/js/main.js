let tempoInicial = $("#tempo-digitacao").text();
let campo = $(".campo-digitacao");


$( ()=>{
    atualizaTamanhoFrase(); //$(document).ready(()=>{
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
    inicializaMarcadores();
});

function atualizaTamanhoFrase(){
    let frase = $(".frase").text(); //captura a frase
    let numeroPalavras = frase.split(" ").length; //divide a frase em um array
    let tamanhoFrase = $("#tamanho-frase"); //captura o tamanho do array

    tamanhoFrase.text(numeroPalavras); // substitui a palavra no span pelo numero de palavras do array

}

function inicializaContadores(){
    campo.on("input", () =>{
        let conteudo = campo.val();
        let qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
        let qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro(){
    let tempoRestante = $("#tempo-digitacao").text();

    campo.one("focus", () =>{
        let cronometroId = setInterval(() =>{
            tempoRestante --;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                
                clearInterval(cronometroId);
                finalizaJogo();
            }
        },1000);
    
    });
}

function finalizaJogo(){
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores(){
    let frase = $(".frase").text();
    campo.on("input", () =>{
        let digitado = campo.val();
        let comparavel = frase.substr(0, digitado.length);
        if(digitado == comparavel){
            campo.addClass("campo-correto");
            campo.removeClass("campo-errado")
        }else{
            campo.addClass("campo-errado");
            campo.removeClass("campo-correto");
        }
    });
}

function inserePlacar(){
    let corpoTabela = $(".placar").find("tbody");
    let numPalavras = $("#contador-palavras").text();
    let usuario = "Alexandre";
    let linha = novaLinha(usuario, numPalavras);   
    linha.find(".botao-remover").click(removeLinha)      
    corpoTabela.append(linha);            
}

function novaLinha(usuario, numPalavras){
    let linha = $("<tr>");
    let colunaUsuario = $("<td>").text(usuario);
    let colunaPalavras = $("<td>").text(numPalavras);
    let colunaRemover = $("<td>");
    let link = $("<a>").addClass("botao-remover").attr("href", "#");
    let icone = $("<i>").addClass("material-icons").text("delete_forever");

    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}
function removeLinha(){
    $(".botao-remover").click(function(event){
        event.preventDefault();
        $(this).parent().parent().remove();
    });
}

function reiniciaJogo(){
    
        campo.attr("disabled", false);
        campo.val("");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial);
        inicializaCronometro();
        campo.toggleClass("campo-desativado");
        campo.removeClass("campo-errado");
        campo.removeClass("campo-correto");
        
}

