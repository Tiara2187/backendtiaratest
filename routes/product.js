const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const multer = require('multer') 
const UserAuth = require('../helpers/authentication')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null,'./uploadsProduct/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() +  file.originalname);
    }
  });
    
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      console.log('format must jpg,jpeg,png')
    }
  };
  const uploads = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

    router.post('/product',uploads.single('image'),ProductController.createProduct) 
    router.post('/createproduct',ProductController.createProduct)
    router.get('/listproduct',ProductController.listProduct)
    router.get('/detailproduct/:productId',ProductController.getOneProduct) 
    router.get('/product/category/:categoryId',ProductController.getCategory)



  module.exports = router