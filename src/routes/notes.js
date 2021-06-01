const { response } = require('express');
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const {isAuthenticated} = require('../helpers/auth');


router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

//Crear nota
router.post('/notes/new-note',isAuthenticated, async (req, res) => {
    const {title, description} = req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Please write a title'});
    }
    if(!description){
        errors.push({text: 'Please add a description'});
    }
    if(errors.length > 0){
        res.render('notes/new-note',{
            errors,
            title,
            description
        });
    }else{
      const newNote = new Note({title, description});
      newNote.user = req.user.id;
      await newNote.save();
      req.flash('success_msg', 'Note added succesfully');
      res.redirect('/notes');
    }
});

//Vista general de las notas
router.get('/notes', isAuthenticated, async(req, res) =>{ 
    await Note.find({user: req.user.id}).sort({date:'desc'}) 
    .then(data => {
        const context ={
            notes: data.map(data =>{
                return{
                    _id:data._id,
                    title:data.title,
                    description:data.description
                }
            })
        }
        res.render('notes/all-notes',{notes:context.notes})
    })
})


router.get('/notes/edit/:id',isAuthenticated, async (req,res) =>{
    await Note.findById(req.params.id).then(data => {
        const context = {
            _id:data._id,
            title: data.title,
            description: data.description
        }
        res.render('notes/edit-note',{note: context});
    })
})

//Editar nota
router.put('/notes/edit-note/:id' ,isAuthenticated, async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title,description});
    req.flash('success_msg', 'Note updated succesfully');
    res.redirect('/notes');
});

//Borrar nota
router.delete('/notes/delete/:id' , isAuthenticated,async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note deleted succesfully');
    res.redirect('/notes');
})

module.exports = router;
