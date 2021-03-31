let valorDaSol = document.getElementById("valorS")
let razaoSocial = document.getElementById("RazaoSocial")
let cnpj = document.getElementById("cnpj")
let endereco = document.getElementById("endereco")
let telefone = document.getElementById("telefone")
let parcelas = document.getElementById("parcelas")
let pmt = ""
let juros =""





function solicitarValor(){
    if(valorDaSol.value <= null & valorDaSol.value <=0 || razaoSocial.value <= null || cnpj.value <= null || endereco.value <= null || telefone.value <= null || parcelas.value <= null & parcelas.value <= 0  ){
        alert("[ERRO] verifique os campos e tente novamente")

    } else if (parcelas.value > 24) {

        alert("[ERRO] número de parcelas maior do que o permitido")

    } else if (valorDaSol.value > 100000 ){

        alert("[Erro] Crédito indisponível")
    } else {
        

        pmt = valorDaSol.value * ((((1.015) ** parcelas.value) * 0.015) / (((1.015) ** parcelas.value) - 1))

        document.getElementById("valorParcelas").value = Math.round(pmt)

        if (pmt.value !=0){

            juros = ((pmt * parcelas.value) - valorDaSol.value);

            

            document.getElementById("valorTotal").innerHTML = Math.round(juros)

            console.log(juros)

        }
    }
        
}