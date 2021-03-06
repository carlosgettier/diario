const { sequelize } = require("../database/models")
const db = require("../database/models")
const fs = require('fs');
const path = require("path")
const Blob = require("buffer")
const buffer = require("buffer")




let apiController = {
    all: async (req, res) => {

        const todos = await db.noti.findAll({
            include: [{ association: 'imagenPrincipal' }]
        })

        res.json(todos)

    },
    local: async (req, res) => {
        const todos = await db.noti.findAll({
            where: {
                tipo: 'locales'
            },
            include: [{ association: 'imagenPrincipal' }]
        })
        res.json(todos)
    },
    provinciales: async (req, res) => {
        const todos = await db.noti.findAll({
            where: {
                tipo: 'provincial'
            },
            include: [{ association: 'imagenPrincipal' }]
        })
        res.json(todos)
    },
    nacionales: async (req, res) => {
        const todos = await db.noti.findAll({
            where: {
                tipo: 'nacional'
            },
            include: [{ association: 'imagenPrincipal' }]
        })
        res.json(todos)
    },
    deportes: async (req, res) => {
        const todos = await db.noti.findAll({
            where: {
                tipo: 'deportes'
            },
            include: [{ association: 'imagenPrincipal' }]
        })
        res.json(todos)
    },
    pedir: async (req, res) => {
        const todos = await db.film.findAll({
            where: {
                nombre: { [db.Sequelize.Op.like]: `%${req.params.dato}%` }
            }
        })
        res.json(todos)
    },
    add: async (req, res) => {

        try {
            const data = fs.readFileSync(path.join(__dirname, '../image/' + req.file.filename))
            const name = req.file.filename

            let prepararFotoPrincipal = function (req, idNoticia) {
                if (req.file.filename) {
                    return {
                        nombre: name,
                        idNoticia: idNoticia,
                        data: data

                    }
                }
            }


            const todos = await db.noti.create({
                titulo: req.body.titulo,
                bajada: req.body.bajada,
                desarrollo: req.body.desarrollo,
                portada: req.body.portada,
                tipo: req.body.tipo
            })
            let imagenPrincipal = prepararFotoPrincipal(req, todos.id);

            if (imagenPrincipal) {
                const imagenePrin = await db.img.create(imagenPrincipal);
                await db.noti.update(
                    { id_imagen_principal: imagenePrin.idimg },
                    { where: { id: todos.id } }
                )
            }


            res.json(todos)
        }
        catch (err) {
            res.send('Algo salio mal XP');
        }


    },
    edit: async (req, res) => {
        const todos = await db.noti.findByPk(req.params.id)
        res.json(todos)
    },
    img: async (req, res) => {
        const todos = await db.img.findAll({ where: { idNoticia: req.params.id } }
        )
        res.json(todos)
    },
    editado: async (req, res) => {
        await db.film.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({ success: 'editado' })
    },
    delete: async (req, res) => {
        const todos = await db.noti.destroy({
            where: {
                id: req.params.id
            }
        })
        const img = await db.img.destroy({
            where: {
                idNoticia: req.params.id
            }
        })


        res.json(todos)
    }
}
module.exports = apiController;

