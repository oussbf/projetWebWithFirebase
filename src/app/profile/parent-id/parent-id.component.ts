import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-id',
  templateUrl: './parent-id.component.html',
  styleUrls: ['./parent-id.component.scss']
})

export class ParentIdComponent implements OnInit {
  url: string | ArrayBuffer = 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
  ArrayofkidsId = ['Achoik'];
  newsLetterChecked = false;
  checkBoxChecked = false;
  otherSelectedChecked = false;

  messages = [
    {
      IDSender : '1',
      sender: 'Oussama',
      status : 'Declined',
      phoneNumber : '24772681'
    },
    {
      IDSender : '2',
      sender: 'Anis',
      status : 'Accepted',
      phoneNumber : '24772681'
    }
  ];
  favSitters = [
    {
      firstName : 'Oussama',
      lastName : 'Ben Fredj',
      experience: '5',
      distance: '2',
      location: 'Sousse , Sousse 4004',
      // tslint:disable-next-line:max-line-length
      describtion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      rating : '4',
      certificates: ['CPR' , 'Special Needs Care']
    },
    {
      firstName : 'anis',
      lastName : 'Ben Ghanem',
      experience: '3',
      distance: '5',
      location: 'Tunis , Hay Khadra 1003',
      // tslint:disable-next-line:max-line-length
      describtion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      rating : '4',
      certificates: ['CPR' , 'Special Needs Care']
    }
  ];


  addKid() {
    this.ArrayofkidsId.push('oussama');
  }

  deleteMessage(i) {
    this.messages.splice(i, 1);
  }


  deleteChild( i) {
    this.ArrayofkidsId.splice(i, 1);
  }

  deleteFavourite(i) {
    this.favSitters.splice(i, 1);
  }

  subscribeChange() {
    this.newsLetterChecked = !this.newsLetterChecked;
  }
  checkBoxChange() {
    this.checkBoxChecked = !this.checkBoxChecked;
  }
  othersSelectedChange() {
    this.otherSelectedChecked = !this.otherSelectedChecked;
  }
  clickPic() {
    document.getElementById('imageUpload').click();
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
