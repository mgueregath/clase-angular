import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from 'src/app/entities/student';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'modal',
    templateUrl: './modal.html'
})
export class ModalContentComponent {
    public callback;
    public form: FormGroup;
    public student: Student;
    public editing = false;

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private http: HttpClient
    ) {
        this.form = fb.group({
            firstName: [
                null,
                Validators.compose([Validators.required, Validators.minLength(2)])
            ],
            lastName: [
                null,
                Validators.compose([Validators.required, Validators.minLength(2)])
            ],
            email: [
                null,
                Validators.compose([Validators.required, Validators.minLength(2), Validators.email])
            ]
        });
    }

    onConfirm() {
        if (this.editing) {
            this.student.nombre = this.form.get('firstName').value;
            this.student.apellido = this.form.get('lastName').value;
            this.student.correo = this.form.get('email').value;
            this.http.put('http://localhost:3000/alumnos/' + this.student._id, this.student).subscribe(
                response => {
                    this.callback(response);
                    this.activeModal.close();
                }
            )
        } else {
            this.student = new Student(
                this.form.get('firstName').value,
                this.form.get('lastName').value,
                this.form.get('email').value
            );
            this.http.post('http://localhost:3000/alumnos', this.student).subscribe(
                response => {
                    this.callback(response);
                    this.activeModal.close();
                }
            )
        }
    }

    setEditingData(student: Student) {
        this.form.get('firstName').setValue(student.nombre);
        this.form.get('lastName').setValue(student.apellido);
        this.form.get('email').setValue(student.correo);
        this.student = student;
        this.editing = true;
    }
}