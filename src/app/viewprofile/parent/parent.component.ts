import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  kidsArray = [
    {
      name: 'ouss',
      age: 5,
      ageChoice: 'preschooler',
      specialNeeds: ['autistic', 'mute', 'handicapped'],
      otherInfo : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna align.'
    },
    {
      name: 'anis',
      age: 4,
      ageChoice: 'infant',
      specialNeeds: ['autistic', 'nigger', 'handicapped'],
      otherInfo : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna align.'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
