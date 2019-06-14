var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contrato');

//Contratos

router.get('/contratos', async function (req, res, next) {
    var dados = await Contrato.listarContratos();
    res.jsonp(dados)
});

router.get('/contratos/:id', async function (req, res, next) {
    var dados = await Contrato.infoContrato(req.params.id);
    res.jsonp(dados)
});

//Entidades

router.get('/entidades', async function (req, res, next) {
    var dados = await Contrato.listarEntidades();
    res.jsonp(dados)
});

router.get('/entidades/:id', async function(req, res, next) {
    var dados = await Contrato.infoEntidade(req.params.id);
    res.jsonp(dados)
})

router.get('/entidades/adjudicantes', async function (req, res, next) {
    var dados = await Contrato.entidadesAdjudicantes();
    res.jsonp(dados)
});

router.get('/entidades/adjudicatarias', async function (req, res, next) {
    var dados = await Contrato.entidadesAdjudicatarias();
    res.jsonp(dados)
});

router.get('/entidades/adjudicantes/:id', async function (req, res, next) {
    var dados = await Contrato.adjudicanteDe(req.params.id)
    res.jsonp(dados)
})

router.get('/entidades/adjudicatarias/:id', async function (req, res, next) {
    var dados = await Contrato.adjudicatariaDe(req.params.id);
    console.log(dados)
    res.jsonp(dados)
});

module.exports = router;
