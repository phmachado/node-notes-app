const fs = require('fs');
const chalk = require('chalk');

// chalk shortcuts
const SUCCESS = chalk.inverse.bold.green;
const DANGER = chalk.inverse.bold.red;

const getNotes = () => "Your notes...";

// adding a note
const addNote = (noteTitle, noteBody) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title === noteTitle);

    if(!duplicateNote) {
        notes.push({
            title: noteTitle,
            body: noteBody
        });
    
        saveNotes(notes);

        console.log(SUCCESS('Note successfully added.'));
        
    } else {
        console.log(DANGER('Note title already exists.'));        
    }        
};

// removing a note
const removeNote = (noteTitle) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => note.title !== noteTitle);

    if(notesToKeep.length < notes.length) {
        saveNotes(notesToKeep);
        console.log(SUCCESS('Note successfully removed.'));
        
    } else {
        console.log(DANGER('Note does not exist.'));
        
    }    
};

// listing all notes
const listNotes = () => {
    console.log(chalk.inverse.bold('YOUR NOTES:'));

    const notes = loadNotes();
    
    notes.forEach((note) => {
        console.log(note.title);
    });
};

// reading a note
const readNote = (noteTitle) => {
    const notes = loadNotes();
    
    const foundNote = notes.find((note) => note.title === noteTitle);

    if(foundNote !== undefined) {        
        console.log(chalk.inverse.bold(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(DANGER('Note does not exist.'));
    }    
};

//auxiliar functions
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
                
    } catch (error) {
        return [];
    }
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};