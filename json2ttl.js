const jsonfile = require('jsonfile')
const file = 'contratos3.json'

reverseDate = function (txt) {
	var ret = txt.split("-");
	return ret.reverse().join("-");
}

typeOutros = function (txt) {
	var ret = txt.split("(")[1]
	ret = ret.split(")")[0];
	return ret;
}

jsonfile.readFile(file)
        .then(obj => {
            var entidades = [];
	    var outros = false;
	    var outrosType= "";
	    var aspasRegex= new RegExp('"','g')
	    var nonWord = new RegExp('\W','g')
            for(var i=0; i<obj.length; i++) {
            	var contrato="";
            	contrato += ":c_Contrato" + i + " a owl:NamedIndividual, :Contrato";
		for(var j=0; j<obj[i]["Tipo\(s\) de Contrato"].length; j++) {
			if(obj[i]["Tipo\(s\) de Contrato"][j].includes("Outros Tipos")) {
				contrato += ", :Outros"
				outros=true;
				outrosType = typeOutros(obj[i]["Tipo\(s\) de Contrato"][j])
			}
			if(obj[i]["Tipo\(s\) de Contrato"][j].includes("Aquisição de bens móveis")) {
				contrato += ", :AquisicaoBensMoveis"
			}
			if(obj[i]["Tipo\(s\) de Contrato"][j].includes("Concessão de serviços públicos")) {
				contrato += ", :ConcessaoServicosPublicos"
			}
			if(obj[i]["Tipo\(s\) de Contrato"][j].includes("Aquisição de serviços")) {
				contrato += ", :AquisicaoServicos"
			}
			if(obj[i]["Tipo\(s\) de Contrato"][j].includes("Empreitadas de obras públicas")) {
				contrato += ", :EmpreitadasObrasPublicas"
			}
			if(obj[i]["Tipo\(s\) de Contrato"][j].includes("Concessão de obras públicas")) {
				contrato += ", :ConcessaoObrasPublicas"
			}
			if(obj[i]["Tipo\(s\) de Contrato"][j].includes("Sociedade")) {
				contrato += ", :Sociedade"
			}
			if(obj[i]["Tipo\(s\) de Contrato"][j].includes("Locação de bens móveis")) {
				contrato += ", :LocacaoBensMoveis"
			}
		}

		contrato += ";\n";
		if(outros === true) {
			contrato += "\t:outrosDesc \"" + outrosType + "\";\n"
			outrosType= ""
			outros = false
		}
		objetoContrato = obj[i]["Objeto do Contrato"];
		objetoContrato = objetoContrato.replace(aspasRegex, "")
		//console.log(objetoContrato)
		contrato += "\t:objetoContrato \"" + objetoContrato/*obj[i]["Objeto do Contrato"]*/ + "\";\n"
		contrato += "\t:cpv \"" + obj[i]["CPVs"] + "\";\n"
		entAdjudicantes = obj[i]["Entidade\(s\) Adjudicante\(s\)"].split(")").map((text) => {return text.split("(")});

		for(var j=0; j<entAdjudicantes.length; j++) {
			if(entAdjudicantes[j][1] !== undefined){
				if(entidades.map((a) => {return a.id}).indexOf(entAdjudicantes[j][1])=== -1) {
					var newEnt = '{"id": "'+entAdjudicantes[j][1] + '", "Nome" : "' + entAdjudicantes[j][0] +'"}'
					newEnt = JSON.parse(newEnt)
					entidades.push(newEnt)
				}
				contrato += "\t:entidadeAdjudicante :e_"+entAdjudicantes[j][1] + ";\n";
			}
		}
		entAdjudicatarias = obj[i]["Entidade\(s\) Adjudicatária\(s\)"].split(")").map((text) => {return text.split("(")});
		for(var j=0; j<entAdjudicatarias.length; j++) {
			if(entAdjudicatarias[j][1] !== undefined){
				if(entidades.map((a) => {return a.id}).indexOf(entAdjudicatarias[j][1])=== -1) {
					var newAdju = '{"id": "'+entAdjudicatarias[j][1] + '", "Nome" : "' + entAdjudicatarias[j][0] +'"}'
					newAdju = JSON.parse(newAdju)
					entidades.push(newAdju)
				}
				contrato += "\t:entidadeAdjudicataria :e_"+entAdjudicatarias[j][1] + ";\n";
			}
		}
		contrato += "\t:precoContratual \"" + obj[i]["Preço Contratual"] + "\";\n"
		contrato += "\t:dataPublicacao \"" + reverseDate(obj[i]["Data de Publicação"]) + "\";\n"
		contrato += "\t:dataCelebracaoContrato \"" + reverseDate(obj[i]["Data de Celebração do Contrato"]) + "\";\n"
		contrato += "\t:prazoExecucao \"" + obj[i]["Prazo de Execução"] + "\";\n"
		contrato += "\t:localExecucao \"" + obj[i]["Local de Execução"] + "\";\n"
		contrato += "\t:fundamentacao \"" + obj[i]["Fundamentação"] + "\";\n"
		contrato += "\t:dataFechoContrato \"" + reverseDate(obj[i]["Data de Fecho do Contrato"]) + "\";\n"
		contrato += "\t:precoTotalEfetivo \"" + obj[i]["Preço Total Efetivo"] + "\";\n"
		contrato += "\t:causasAlteracoesPreco \"" + obj[i]["Causas das Alterações ao Preço"] + "\";\n"
		contrato += "\t:causasAlteracoesPrazo \"" + obj[i]["Causas das Alterações ao Prazo"] + "\";\n"
		contrato += "\t:estado \"" + obj[i]["Estado"] + "\";\n"
		contrato += "\t:numeroRegistoAcordoQuadro \"" + obj[i]["N.º registo do Acordo Quadro"] + "\";\n"
		contrato += "\t:descricaoAcordoQuadro \"" + obj[i]["Descrição do Acordo Quadro"] + "\";\n"
		contrato += "\t:procedimentoCentralizado " + obj[i]["Procedimento Centralizado"] + ".\n" 

                console.log(contrato);
            }
	    entidades.forEach(target => {
		var entidade = "";
		if(typeof target["id"] == "string") {target.id=target.id.replace(nonWord,"_")}
		entidade += ":e_" + target["id"] + " a owl:NamedIndividual, :Entidade;\n"
		entidade += "\t:nomeEntidade \"" + target["Nome"] + "\".\n"  	    
		console.log(entidade)
	    })
        })
        .catch(error => console.log(error))
