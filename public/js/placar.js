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