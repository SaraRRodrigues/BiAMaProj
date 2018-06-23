
var express = require('express');
var router = express.Router();
var path = require('path');

var userService = require('../services/userService');
var biamaInfoService = require('../services/biamaInformationService');
var myBiamaInfoService = require('../services/myBiamaInformationService');
var materialInfoService = require('../services/materialInfoService');
var userQuestionService = require('../services/userQuestionService');
var likeQuestionService = require('../services/likesQuestionService');
var likeAnswerService = require('../services/likesAnswerService');
var curiosityService = require('../services/curiosityService');
var worldShareService = require('../services/worldShareService');

var favoriteService = require('../services/favoriteService');
var questionService = require('../services/questionService');
var notificationService = require('../services/notificationService');
var perfilService = require('../services/perfilService');
var compareMaterialService = require('../services/compareMaterialService');

/* GET home page. */
router.get('/', (req, resp, next) => {
	userService.getUsers(( error, users) => {
	});
	resp.render('views/index');
});

/* FOOTER SERVICES */
/* GET biama details: biamaPage, whereWeAre, library */
router.get('/biamaInfo', (req, resp, next) => {
	biamaInfoService.getInformationOfBiama((error, biamaDetails) => {
		resp.json({biamaDetails})
	});
});

/* GET my biama details: your biama */
router.get('/myBiamaInfo', (req, resp, next) => {
	myBiamaInfoService.getMyInformationOfBiama((error, biamaDetails) => {
		resp.json({biamaDetails})
	});
});

/* GET material details: library */
router.get('/materials', (req, resp, next) => {
	materialInfoService.getMaterials((error, materialDetails) => {
		resp.json({materialDetails})
	});
});

/* GET user answer: forum */
router.get('/userQuestions', (req, resp, next) => {
	userQuestionService.getUserQuestion((error, questionDetails) => {
		resp.json({questionDetails})
	});
});

/* GET like answer: forum */
router.get('/userLikeQuestions', (req, resp, next) => {
	likeQuestionService.getLikeQuestion((error, questionDetails) => {
		resp.json({questionDetails})
	});
});

/* GET like question: forum */
router.get('/userLikeAnswers', (req, resp, next) => {
	likeAnswerService.getLikeAnswer((error, questionDetails) => {
		resp.json({questionDetails})
	});
});

/* GET curiosities: forum */
router.get('/curiosities', (req, resp, next) => {
	curiosityService.getCuriosities((error, curiosityDetails) => {
		resp.json({curiosityDetails})
	});
});

/* GET world shares: forum */
router.get('/worldShares', (req, resp, next) => {
	worldShareService.getWorldShares((error, worldShareDetails) => {
		resp.json({worldShareDetails})
	});
});

/* FOOTER SERVICES */
/* GET favorites: favorites */
router.get('/favorites', (req, resp, next) => {
	favoriteService.getMyFavorites((error, favoriteDetails) => {
		resp.json({favoriteDetails})
	});
});

/* GET my questions: My questions */
router.get('/myQuestions', (req, resp, next) => {
	questionService.getMyQuestions((error, questionDetails) => {
		resp.json({questionDetails})
	});
});

/* GET my notifications: Notifications */
router.get('/myNotifications', (req, resp, next) => {
	notificationService.getMyNotifications((error, notificationDetails) => {
		resp.json({notificationDetails})
	});
});

/* GET my perfil: Perfil */
router.get('/myPerfil', (req, resp, next) => {
	perfilService.getMyPerfil((error, perfilDetails) => {
		resp.json({perfilDetails})
	});
});

/* GET my perfil: Perfil */
router.get('/compareMaterials', (req, resp, next) => {
	compareMaterialService.getMaterialComparation((error, comparationDetails) => {
		resp.json({comparationDetails})
	});
});

/* GET user details: used in login */
router.get('/users', (req, resp, next) => {
	userService.getUsers((error, users) => {
		resp.json({users})
	});
});

router.get('/views/:name', (req, resp, next) => {
	resp.render(`views/${req.params.name}`);
});

/*para poder fazer o refresh*/ 
router.get('/BiAMa/:name', (req, resp, next) => {
	resp.render(`views/${req.params.name}`);
});

module.exports = router;
