const router = require("express").Router();
const categorie = require("../models/Categorie");
const product = require("../models/Product");
const brand = require("../models/Brand");
const ContactForm = require("../models/ContactForm");
const objId = require('mongodb').ObjectID;
const multer = require('multer')
const path = require("path");
const fs = require("fs");

const { ensureAuthenticated } = require("../config/auth");
var storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'./public/uploads');
    },
    filename: function (req,file,cb) {
        cb(null,Date.now() + "_" + path.parse(file.originalname).name + path.parse(file.originalname).ext);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: function (req,file,cb) {
        checkfiletype(file,cb)
    }

})

function checkfiletype(file,cb) {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const ext = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    if (ext) return cb(null,true)
    else {
        cb("Error: Images only !")
    }
}





router.get("/",ensureAuthenticated,(req,res) => {
    categorie.find().then(categories => {
        product.find().then(products => {
            brand.find().then(brands => {
                res.render("admin/acceuil",{ categories: categories,products: products,brands: brands,num: categories.length,num2: products.length,num3: brands.length,username: req.user.username })

            }).catch(() => { res.render("admin/acceuil",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",num: 0,num2: 0,num3: 0,username: req.user.username }) })

        }).catch(() => { res.render("admin/acceuil",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",num: 0,num2: 0,num3: 0,username: req.user.username }) })


    }).catch(() => { res.render("admin/acceuil",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques mxinutes ",type: "error",num: 0,num2: 0,num3: 0,username: req.user.username }) })


})
router.get("/categories",ensureAuthenticated,(req,res) => {
    categorie.find()
        .then(data => {
            res.render("admin/categories",{ categoriesData: data,num: data.length,username: req.user.username })
        })
        .catch(() => {
            return res.render("admin/categories",{ msg: "Oooops! quelque chose s'est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",num: 0,username: req.user.username })
        })
})
//categories 
router.post("/categories",ensureAuthenticated,(req,res) => {


    if (req.body.catName) {
        const categorieName = req.body.catName;

        categorie.findOne({ categorieName })
            .then(data => {
                if (data) {
                    categorie.find()
                        .then(cats => {
                            return res.render("admin/categories",{ msg: "cette catégorie existe déjà",type: "error",value: categorieName,categoriesData: cats,num: cats.length,username: req.user.username })
                        })
                        .catch(() => {
                            return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",categoriesData: data,num: cats.length,username: req.user.username })
                        })
                }
                else {
                    const NewCategorie = new categorie({ categorieName });
                    NewCategorie.save()
                        .then(cat => {
                            categorie.find()
                                .then(cats => {
                                    return res.render("admin/categories",{ msg: `${cat.categorieName} a bien été enregistrée Id : ${cat._id}`,type: "success",categorieName,categoriesData: cats,num: cats.length,username: req.user.username })

                                })
                                .catch(() => {
                                    return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",username: req.user.username })
                                })
                        })
                        .catch(() => {
                            categorie.find()
                                .then(cats => {
                                    return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",value: categorieName,categoriesData: cats,num: cats.length,username: req.user.username })
                                })
                                .catch(() => {
                                    return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",username: req.user.username })
                                })
                        })
                }

            })
            .catch(() => {
                categorie.find()
                    .then(() => {
                        return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",value: categorieName,categoriesData: cats,num: cats.length,username: req.user.username })

                    })
                    .catch(() => {
                        return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",username: req.user.username })
                    })
            })

    }
    if (req.body.catid) {
        const Id = req.body.catid;
        if (!objId.isValid(Id)) {
            categorie.find()
                .then(cats => {
                    return res.render("admin/categories",{ msg: ` l'identifiant  ${Id} est invalide`,type: "error",value2: Id,categoriesData: cats,num: cats.length,username: req.user.username })
                })
                .catch(() => {
                    return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",categoriesData: cats,num: cats.length,username: req.user.username })
                })
        }
        categorie.findByIdAndDelete({ _id: Id })

            .then(data => {
                if (data && req.body.check) {
                    product.find({ productCategorie: Id })
                        .then(datas => {
                            if (datas) {
                                datas.forEach(el => el.remove())
                                categorie.find()
                                    .then(cats => {
                                        return res.render("admin/categories",{ msg: `${data._id} avec le nom de ${data.categorieName} a bien été supprimer avec  tous les produits qui appartiennent à cette catégorie`,type: "success",categoriesData: cats,num: cats.length,username: req.user.username })
                                    })
                                    .catch(() => {
                                        return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",categoriesData: cats,num: cats.length,username: req.user.username })
                                    })

                            }
                        })
                        .catch(() => {
                            categorie.find()
                                .then(cats => {
                                    return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",value2: Id,categoriesData: cats,num: cats.length,username: req.user.username })
                                })
                                .catch(() => {
                                    return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",categoriesData: cats,num: cats.length,username: req.user.username })
                                })
                        })
                }

                else if (data) {
                    categorie.find()
                        .then(cats => {
                            return res.render("admin/categories",{ msg: `${data._id} avec le nom de ${data.categorieName} a bien été supprimer (sans supprimer tous les produits qui appartiennent à cette catégorie )`,type: "success",categoriesData: cats,num: cats.length,username: req.user.username })
                        })
                        .catch(() => {
                            return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",categoriesData: cats,num: cats.length,username: req.user.username })
                        })
                }
                else {
                    categorie.find()
                        .then(cats => {
                            return res.render("admin/categories",{ msg: `l'identifiant  ${Id} n'a pas été trouvée`,type: "error",alue2: Id,categoriesData: cats,num: cats.length,username: req.user.username })
                        })
                        .catch(() => {
                            return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",value2: Id,categoriesData: cats,num: cats.length,username: req.user.username })

                        })
                }
            })
            .catch((err) => {
                categorie.find()
                    .then(cats => {
                        return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes " + err,type: "error",value2: Id,categoriesData: cats,num: cats.length,username: req.user.username })
                    })
                    .catch(() => {
                        return res.render("admin/categories",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",categoriesData: cats,num: cats.length,username: req.user.username })
                    })
            })



    }

})

router.get("/produits",ensureAuthenticated,(req,res) => {
    res.render("admin/produits",{ username: req.user.username })
})

router.post('/produits',upload.single("proPic"),ensureAuthenticated,function (req,res) {
    const { proName,proCat,proMarq,proDesc } = req.body;
    if (proName && proMarq && proCat && proDesc && req.file) {
        const Image = "uploads/" + req.file.filename;

        const newProduct = new product({ productName: proName.split(' ').join('-'),productCategorie: proCat,productPartners: proMarq,productDescription: proDesc,productImage: Image });
        newProduct.save()
            .then(Product => {
                res.render("admin/produits",{ msg: `le Produit avec le nom ${Product.productName} a bien été enregistrée  `,type: "success",username: req.user.username })
            })
            .catch((err) => {
                return res.render("admin/produits",{ msg: "Oooops! quelque chose s'est mal passé! Veuillez réessayer dans quelques minutes 1  " + err,type: "error",username: req.user.username })

            })
    }
    else if (req.body.proId) {

        const { proId } = req.body;
        if (!objId.isValid(proId)) {
            return res.render("admin/produits",{ msg: `  l'identifiant  ${proId} est invalide`,type: "error",value2: proId,username: req.user.username })
        }
        if (objId.isValid(proId)) {
            product.findByIdAndDelete({ _id: proId })
                .then(deleted => {
                    if (deleted) {
                        fs.unlink("public/" + deleted.productImage,(err) => {
                            if (err) throw err;
                        })
                        return res.render("admin/produits",{ msg: `${deleted._id} avec le nom de ${deleted.productName} a bien été supprimer`,type: "success",username: req.user.username })
                    }
                    else {
                        return res.render("admin/produits",{ msg: `l'identifiant  ${proId} n'a pas été trouvée`,type: "error",value2: proId,username: req.user.username })
                    }
                })
                .catch(() => {
                    return res.render("admin/produits",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",username: req.user.username })
                })
        }

    }
    else {
        return res.render("admin/produits",{ msg: "Oooops! quelque chose s'est mal passé! Veuillez réessayer dans quelques minutes  ",type: "error",username: req.user.username })
    }

})


router.get("/marques",ensureAuthenticated,(req,res) => {
    brand.find()
        .then(marques => res.render("admin/marques",{ marquesData: marques,num: marques.length,username: req.user.username }))
        .catch(err => {
            return res.render("admin/marques",{ msg: "Oooops! quelque chose s'est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",num: 0,username: req.user.username })
        })
})
router.post("/marques",upload.single("marqPic"),ensureAuthenticated,function (req,res) {
    if (req.body.marqName && req.file) {
        const flname = req.file.filename;
        const { marqName } = req.body;
        const brandImage = "uploads/" + flname;
        const Newbrand = new brand({ brandName: marqName,brandImage });
        Newbrand.save().
            then(item => {
                brand.find().select("-brandImage")
                    .then(items => {
                        res.render("admin/marques",{ msg: `${item.brandName} a bien été enregistrée Id : ${item._id}`,type: "success",marquesData: items,num: items.length,username: req.user.username })
                    })
                    .catch(err => res.render("admin/marques",{ msg: "Oooops! quelque chose s'est mal passé! Veuillez réessayer dans quelques minutes " + err,type: "error",marquesData: items,num: items.length,username: req.user.username }))
            })
            .catch(err => {
                res.render("admin/marques",{ msg: "Oooops! quelque chose s'est mal passé! Veuillez réessayer dans quelques minutes " + err,type: "error",num: 0,username: req.user.username })
            })

    }
    else if (req.body.marqId) {
        const { marqId } = req.body;
        if (!objId.isValid(marqId)) {
            brand.find().select("-brandImage")
                .then(brands => {
                    return res.render("admin/marques",{ msg: ` l'identifiant  ${marqId} est invalide`,type: "error",value2: marqId,marquesData: brands,num: brands.length,username: req.user.username })
                })
                .catch(() => {
                    return res.render("admin/marques",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",marquessData: [],num: 0,username: req.user.username })
                })
        }
        if (objId.isValid(marqId)) {
            brand.findByIdAndDelete({ _id: marqId })
                .then(deleted => {
                    brand.find().select("-brandImage")
                        .then(brands => {
                            if (deleted) {
                                fs.unlink("public/" + deleted.brandImage,(err) => {
                                    if (err) throw err;
                                })
                                return res.render("admin/marques",{ msg: `${deleted._id} avec le nom de ${deleted.brandName} a bien été supprimer`,type: "success",marquesData: brands,num: brands.length,username: req.user.username })
                            }
                            else {
                                return res.render("admin/marques",{ msg: `l'identifiant  ${marqId} n'a pas été trouvée`,type: "error",value2: marqId,marquesData: brands,num: brands.length,username: req.user.username })
                            }
                        })
                        .catch(() => {
                            return res.render("admin/marques",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",categoriesData: [],num: 0,username: req.user.username })
                        })
                })
                .catch(() => {
                    return res.render("admin/marques",{ msg: "Oooops! quelque chose est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",categoriesData: [],num: 0,username: req.user.username })
                })
        }


    }
    else {
        brand.find().select("-brandImage")
            .then(items => {
                res.render("admin/marques",{ msg: `HTTP / 1.1 401 Non autorisé  WWW-Authenticate: Basic realm = "Accès au site de préparation"`,type: "error",marquesData: items,num: items.length,username: req.user.username })
            })
            .catch(err => res.status(401).render("admin/marques",{ msg: "Oooops! quelque chose s'est mal passé! Veuillez réessayer dans quelques minutes " + err,type: "error",marquesData: [],num: 0,username: req.user.username }))
    }


})

router.get("/commandes",ensureAuthenticated,(req,res) => {
    ContactForm.find({},{ fullName: 1,message: 2,date: 3,favorite: 4,objet: 5 })
        .then(data => {
            res.render("admin/commandes",{ data,username: req.user.username })
        })
        .catch(err => console.log(err))

})

router.get("/commandes/:id",ensureAuthenticated,(req,res) => {
    const Id = req.params.id;
    if (!objId.isValid(Id)) {
        res.render("admin/message",{ msg: "Id invalide",type: "error",username: req.user.username })
    }
    else {
        ContactForm.findById(Id)
            .then(form => {
                if (!form) {
                    res.render("admin/commandes",{ msg: "Oooops! quelque chose s'est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",username: req.user.username })
                }
                res.render("admin/message",{ form,username: req.user.username })

            })
            .catch(() => {
                res.render("admin/commandes",{ msg: "Oooops! quelque chose s'est mal passé! Veuillez réessayer dans quelques minutes ",type: "error",username: req.user.username })
            })
    }
})
router.get("/msg/del/:id",ensureAuthenticated,(req,res) => {
    if (req.params.id && objId.isValid(req.params.id)) {
        ContactForm.findByIdAndDelete(req.params.id).then(res.status(200).json({ status: "success" })).catch(err => res.status(400).json({ status: "failure",err }))
    }
    else{
        res.status(400).json({ status: "failure",err })
    }
})

module.exports = router;