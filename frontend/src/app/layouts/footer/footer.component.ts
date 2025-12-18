import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() creator: string = 'Elisa Wardhani'
  @Input() createdYear: string = '2025'

  constructor() { }

  ngOnInit() {
  }

}
