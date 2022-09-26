import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  noteForm!: FormGroup
  editForm!: FormGroup
  notesData: any = [];
  noteDetails: any;
  noteObj: Note = {
    id: '',
    note_title: '',
    not_dec: ''
  }
  constructor(private fb:FormBuilder, private noteService: NoteService, private spinner: NgxSpinnerService) { 

    this.noteForm = this.fb.group({
      title:['', Validators.required],
      description: ['', Validators.required],
    })

    this.editForm = this.fb.group({
      edit_title:['', Validators.required],
      edit_description: ['', Validators.required],
    })
    
  }

  ngOnInit() {
    this.getAllNotes();
  }
    // Add Notes in database
  addNote(){
    const {value} = this.noteForm
    console.log(value);

    this.noteObj.id = '',
    this.noteObj.note_title = value.title;
    this.noteObj.not_dec = value.description;

    this.noteService.addNote(this.noteObj).then((note)=>{
      if(note){
        alert("data add successsfully")
        this.noteForm.reset();
      }
    }) 
  }

  // get all notes from database

  getAllNotes(){
    this.spinner.show();
    this.noteService.getNotes().subscribe((res:Note[])=>{
      console.log("firebase dtaa", res);
      this.notesData = res;
      this.spinner.hide();
      
    })
  }


// delete  notes from database

deleteNotes(note:Note){
  let descision = confirm("Do you wwant to delete ? ")
  if(descision == true){
    this.noteService.deleteNote(note);
  }
}


getAllDetails(row: Note){
  this.noteObj.id = row.id;
    this.editForm.controls['edit_title'].setValue(row.note_title);
    this.editForm.controls['edit_description'].setValue(row.not_dec);
    
}


// update notes 

// ******************************update m kuch masla h 

updateNotes(){

  this.noteObj.note_title = this.editForm.value.edit_title;
  this.noteObj.not_dec = this.editForm.value.edit_description;
  console.log("update", this.noteObj)
  
  this.noteService.updateNote(this.noteObj, this.noteObj).then(()=>{
    alert("note Updated successfully")
    this.editForm.reset();
  })
  
  

}








}
