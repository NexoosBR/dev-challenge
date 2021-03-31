function insert(){

    let razaoSocial = $("#RazaoSocial").val();
    let cnpj = $("#cnpj").val();
    let endereco = $("#endereco").val();
    let telefone = $("#telefone").val();
    let valorSolicitado = $("#valorS").val();
    let parcelas = $("#parcelas").val();
    let valorparcelas = $("#valorParcelas").val();

    $.ajax({
        url:"php/insert.php",
        type:"POST",
        data:{
            razaosocial: razaoSocial,
            cnpj: cnpj,
            endereco: endereco,
            telefone: telefone,
            valorSolicitado:valorSolicitado,
            parcelas:parcelas,
            valorparcelas:valorparcelas
        },
        beforeSend: function(){
            console.log('corregando...');
        },
        success: function(res){
            console.log(res);
        },
        error: function(){
            console.log("deu merdaaa!");
        }
    });
}