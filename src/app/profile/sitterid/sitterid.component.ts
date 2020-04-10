import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sitterid',
  templateUrl: './sitterid.component.html',
  styleUrls: ['./sitterid.component.scss']
})
export class SitteridComponent implements OnInit {
  url: string | ArrayBuffer = 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
  accepted = false;
  rejected = false;
  available = false;
  newsLetterChecked = false;
  checkBoxChecked = false;
  jobs = [
    {
      idSender: '1',
      nameSender: 'Oussama',
      phoneNumber: '24772681',
      jobDate: '06/04/2020', /*Date*/
      jobLength: '2 days', /*format: n days / one day / one week*/
      jobLocation: 'Your House', /*format: your house / address */
      numChildren: '2',
      openForRegularJob: 'yes'
    },
    {
      idSender: '2',
      nameSender: 'achoik',
      phoneNumber: '24772681',
      jobDate: '06/04/2020', /*Date*/
      jobLength: ' 1 day', /*format: n days / one day / one week*/
      jobLocation: 'Your House', /*format: your house / address */
      numChildren: '3',
      openForRegularJob: 'no',
      accepted: false,
      rejected: false
    }

  ];

  ratings = [
    {},
    {}
  ];

  constructor() { }

  deleteJob(i) {
    this.jobs.splice(i, 1);
  }

  acceptClick(i) {
    this.jobs[i].accepted = true;
  }

  rejectClick(i) {
    this.jobs[i].rejected = true;
  }

  changeAvailability() {
    this.available = !this.available;
  }

  checkBoxChange() {
    this.checkBoxChecked = !this.checkBoxChecked;
  }
  subscribeChange() {
    this.newsLetterChecked = !this.newsLetterChecked;
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

  ngOnInit(): void {
  }

}
