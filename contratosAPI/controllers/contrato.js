const axios = require('axios');
const Contrato = module.exports;

normalize = function(response) {
    return response.results.bindings.map(obj =>
        Object.entries(obj)
            .reduce((new_obj, [k,v]) => (new_obj[k] = v.value, new_obj),
                    new Object()));
};

async function execQuery(q){
    try{
        var encoded = encodeURIComponent(q);
        response = await axios.get("http://localhost:7200/repositories/TP" + '?query=' + encoded);
        return(normalize(response.data));
    }
    catch(error) {
        return('ERRO: ' + error)
    }
}

Contrato.listarContratos = async () => {
    const query = `PREFIX : <http://www.semanticweb.org/beggar/ontologies/2019/5/untitled-ontology-26#>
    select * where {
        ?contrato a :Contrato.
        ?contrato :objetoContrato ?objeto;
                  :entidadeAdjudicante ?eAdjudicante;
                  :entidadeAdjudicataria ?eAdjudicataria;
                  :precoContratual ?preco.
    }`
    var res = await execQuery(query);
    return res;
};

Contrato.listarEntidades = async () => {
    const query = `PREFIX : <http://www.semanticweb.org/beggar/ontologies/2019/5/untitled-ontology-26#>
    select * where {
        ?entidade a :Entidade.
        ?entidade :nomeEntidade ?nome.
    } order by asc(?nome)`
    var res = await execQuery(query);
    return res;
}

Contrato.infoContrato = async (id) => {
    const query = `PREFIX : <http://www.semanticweb.org/beggar/ontologies/2019/5/untitled-ontology-26#>
    select * where {
        :${id} :objetoContrato ?objetoContrato;
               :numeroRegistoAcordoQuadro ?numeroRegisto;
               :descricaoAcordoQuadro ?descricaoAcordo;
               :procedimentoCentralizado ?procedimentoCentralizado;
               :estado ?estado;
               :causasAlteracoesPrazo ?causasAlteracaoPrazo;
               :causasAlteracoesPreco ?causasAlteracaoPreco;
               :precoTotalEfetivo ?precoEfetivo;
               :dataFechoContrato ?fechoContrato;
               :fundamentacao ?fundamentacao;
               :localExecucao ?local;
               :prazoExecucao ?prazo;
               :dataCelebracaoContrato ?dataCelebracao;
               :dataPublicacao ?dataPublicacao;
               :precoContratual ?precoContratual;
               :entidadeAdjudicante ?adjudicante;
               :entidadeAdjudicataria ?adjudicataria;
               :cpv ?cpv.
    }`
    var res = await execQuery(query);
    return res;
}

Contrato.entidadesAdjudicantes = async () => {
    const query = `PREFIX : <http://www.semanticweb.org/beggar/ontologies/2019/5/untitled-ontology-26#>
    select ?s ?n where {
        ?s :entidadeAdjudicante ?o.
        ?o :nomeEntidade ?n.
    } order by (?s)`
    var res = await execQuery(query)
    return res
}

Contrato.entidadesAdjudicatarias = async () => {
    const query = `PREFIX : <http://www.semanticweb.org/beggar/ontologies/2019/5/untitled-ontology-26#>
    select ?s ?n where {
        ?s :entidadeAdjudicataria ?o.
        ?o :nomeEntidade ?n.
    } order by (?n)`
    var res = await execQuery(query)
    return res
}

Contrato.adjudicatariaDe = async (id) => {
    const query = `PREFIX : <http://www.semanticweb.org/beggar/ontologies/2019/5/untitled-ontology-26#>
    select ?s ?o ?p where {
        ?s :entidadeAdjudicataria :${id}.
        ?s :objetoContrato ?o;
           :precoContratual ?p.
    } order by (?n)`
    var res = await execQuery(query)
    return res
}

Contrato.adjudicanteDe = async (id) => {
    const query = `PREFIX : <http://www.semanticweb.org/beggar/ontologies/2019/5/untitled-ontology-26#>
    select ?s ?o ?p where {
        ?s :entidadeAdjudicante :e_509821197.
        ?s :objetoContrato ?o;
           :precoContratual ?p.
    } order by (?n)`
    var res = await execQuery(query)
    return res
}

Contrato.infoEntidade = async (id) => {
    var query = `PREFIX : <http://www.semanticweb.org/beggar/ontologies/2019/5/untitled-ontology-26#>
    select ?n ?colaboradores where {
        :${id} :nomeEntidade ?n.
        ?colaboradores ?p :${id}.
    }  `
    var res = await execQuery(query)
    return res
}