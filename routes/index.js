
var express = require('express');
var router = express.Router();

var userService = require('../services/userService');
var biamaInfoService = require('../services/biamaInformationService');
var myBiamaInfoService = require('../services/myBiamaInformationService');
var materialInfoService = require('../services/materialInfoService');
var categoryInfoService = require('../services/categoryInfoService');
var userQuestionService = require('../services/userQuestionService');
var likeQuestionService = require('../services/likesQuestionService');
var likeAnswerService = require('../services/likesAnswerService');
var curiosityService = require('../services/curiosityService');
var worldShareService = require('../services/worldShareService');
var worldShareForumService = require('../services/worldShareServiceForum');
var forumService = require('../services/forumService');

/* insert services */
var insertAnswerService = require('../services/insertAnswerService');
var insertFavoriteService = require('../services/insertFavoriteService');
var deleteFavoriteService = require('../services/deleteFavoriteService');

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
router.get('/materialsCategories', (req, resp, next) => {
	materialInfoService.getMaterials((error, materialsCategories) => {
		resp.json({materialsCategories})
	});
});

/* GET material details: library */
router.get('/materialSchool', (req, resp, next) => {
	var materialId = req.query.data;
	materialInfoService.getSchoolOfMaterial(materialId,(error, materialSchools) => {
		resp.json({materialSchools})
	});
});


/* GET categories details: library */
router.get('/categories', (req, resp, next) => {
	categoryInfoService.getCategories((error, categoryDetails) => {
		resp.json({categoryDetails})
	});
});

/* INSERT material: my new biama  */
router.post('/insertMaterial', (req, resp, next) => {
	var data = req.body;
	categoryInfoService.insertMaterialDetails(data, (error, categoryDetails) => {
		resp.json({categoryDetails})
	});
});


/* GET user question: forum */
router.get('/userQuestions', (req, resp, next) => {
	userQuestionService.getUserQuestion((error, questionDetails) => {
		resp.json({questionDetails})
	});
	
});
/* GET details of user questions and answer: forum */
router.get('/userAnswerAndQuestion', (req, resp, next) => {
	userQuestionService.getQuestionAnswer((error, questionDetails) => {
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
router.get('/worldMyShares', (req, resp, next) => {
	var data = req.query.data;
	worldShareService.getAllMyWorldShares((error, worldShareDetails) => {
		resp.json({worldShareDetails})
	});
});

/* FOOTER SERVICES */

/* GET Forum */
router.get('/forum', (req, resp, next) => {
	forumService.getForum((error, forumDetails) => {
		resp.json({forumDetails})
	});
});

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

/* GET my questions logged in: My questions */
router.get('/myQuest', (req, resp, next) => {
	userService.getMyQuestionsLogged((error, questions) => {
		resp.json({questions})
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

/* UPDATE user details: used in login */
router.post('/updateUserDetails', (req, resp, next) => {
	var data = req.body;
	userService.updateUserSettings(data, (error, userDetails) => {
		resp.json({userDetails})
	});
});

/* INSERT user details: used in login */
router.post('/insertUserDetails', (req, resp, next) => {
	var data = req.body;
	userService.insertUserSettings(data, (error, userDetails) => {
		resp.json({userDetails})
	});
});

/* INSERT user library details: used on regist of user */
router.post('/insertLibraryUser', (req, resp, next) => {
	var data = req.body;
	userService.insertLibraryUserDetails(data, (error, userLibrary) => {
		resp.json({userLibrary})
	});
});

/* INSERT user material details: used on regist of user */
router.post('/insertLibraryMaterial', (req, resp, next) => {
	var data = req.body;
	userService.insertLibraryMaterialDetails(data, (error, userLibrary) => {
		resp.json({userLibrary})
	});
});

/* GET user library details: used on regist of user */
router.get('/getLibraryUser', (req, resp, next) => {
	var data = req.body;
	userService.getLibraryUserDetails(data, (error, userLibrary) => {
		resp.json({userLibrary})
	});
});

/* GET world shares forum: forum */
router.get('/worldSharesForum', (req, resp, next) => {
	worldShareForumService.getWorldSharesForum((error, worldShareForumDetails) => {
		resp.json({worldShareForumDetails})
	});
});

/* INSERT world shares */
router.post('/insertWorldShares', (req, resp, next) => {
	var newWorldShare = req.body;
	worldShareService.insertWorldShares(newWorldShare, (error, worldShareDetails) => {
		resp.json({worldShareDetails})
	});
});

/* INSERT question : forum */
router.post('/insertAnswer', (req, resp, next) => {
	var answer = req.body;
	insertAnswerService.putAnswer(answer ,(error, insertServiceDetails) => {
		resp.json({insertServiceDetails})
	});
});

/* INSERT favorite question : forum */
router.post('/insertFavoriteQuestion', (req, resp, next) => {
	var favorite = req.body;
	insertFavoriteService.insertFavoriteQuestion(favorite ,(error, insertServiceDetails) => {
		resp.json({insertServiceDetails})
	});
});

/* DELETE favorite question : forum */
router.post('/deleteFavoriteQuestion', (req, resp, next) => {
	var favorite = req.body;
	deleteFavoriteService.deleteFavoriteQuestion(favorite,(error, deleteServiceDetails) => {
		resp.json({deleteServiceDetails})
	});
});

/* INSERT my biama */
router.post('/insertMyBiama', (req, resp, next) => {
	var myBiama = req.body;
	userService.insertMyBiama(myBiama,(error, myBiamaDetails) => {
		resp.json({myBiamaDetails})
	});
});

router.get('/views/:name', (req, resp, next) => {
	resp.render(`views/${req.params.name}`);
});
/*para poder fazer o refresh*/ 
router.get('/BiAMa/:name', (req, resp, next) => {
	console.log('params:', req.params)
	resp.render(`views/${req.params.name}`);
});

/*para poder fazer o refresh*/ 
router.get('/BiAMa/:name/:atributes', (req, resp, next) => {
	console.log('params:', req.params)
	resp.render(`views/${req.params.name}`);
});
module.exports = router;
