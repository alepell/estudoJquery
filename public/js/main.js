let tempoInicial = $("#tempo-digitacao").text();
let campo = $(".campo-digitacao");


$( ()=>{
    atualizaTamanhoFrase(); //$(document).ready(()=>{
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
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
                campo.attr("disabled", true);
                clearInterval(cronometroId)
                alert('Fim de jogo HAHAHA');
                campo.addClass("campo-desativado");
            }
        },1000);
    
    });
}

function reiniciaJogo(){
    
        campo.attr("disabled", false);
        campo.val("");
        campo.addClass("campo-ativado");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial);
        inicializaCronometro();
        
        
}