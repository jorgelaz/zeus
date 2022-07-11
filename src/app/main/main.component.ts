import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  images = [
    { path: 'assets/images/businessman.jpg'},
    { path: 'assets/images/bussiness.jpg'},
    { path: 'assets/images/group.jpg'},
    { path: 'assets/images/millennial.jpg'},
    { path: 'assets/images/top-view-coworkers.jpg'}
  ]

  ngOnInit(): void {
  }

}
