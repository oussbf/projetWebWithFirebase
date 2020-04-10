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
    status : 'Declined'
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
