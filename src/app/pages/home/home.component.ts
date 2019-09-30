import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './components/modal/modal.component';

@Component({
  selector: 'home',
  templateUrl: './home.html'
})
export class HomeComponent {

  private students = [];

  constructor(
      private http: HttpClient,
      private modalService: NgbModal
    ) {
    this.http.get('http://localhost:3000/alumnos').subscribe(
        response => {
            this.students = <Array<Object>>response;
        }
    );
  }

  openModal() {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.callback = (result) => {
        this.students.push(result);
    };
  }
}
