import { Component, OnInit } from '@angular/core';
import {ParentModal} from '../../services/parentModal.service';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  parentProfile: ParentModal;
  parentId: string;
  pageReady = false;
  profileImage = 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.parentId = this.route.snapshot.params.id;
    this.parentProfile = new ParentModal('' , '' , '' , '' , '', '', '' , '' , [], []);
    firebase.database().ref().child(`parents/${this.parentId}`).once('value' , (res) => {
      this.parentProfile.firstName = res.exportVal().firstName;
      this.parentProfile.lastName = res.exportVal().lastName;
      this.parentProfile.city = res.exportVal().city;
      this.parentProfile.ZIP = res.exportVal().ZIP;
      this.parentProfile.imageUrl = res.exportVal().imageURL;
      if (this.parentProfile.imageUrl) {
        this.profileImage = this.parentProfile.imageUrl;
      }
      res.child('kids').forEach(kid => {
        const y = [];
        kid.child('specialNeeds').forEach(specialNeed => {
          if ((specialNeed.key.toString() !== 'others') && specialNeed.exportVal()) {
            y.push(specialNeed.key);
          }
        });
        const x = {
          idKid: kid.exportVal().idKid,
          kidName: kid.exportVal().kidName,
          kidAge: kid.exportVal().kidAge,
          childAge: kid.exportVal().childAge,
          specialNeeds: y,
          otherSpecialNeed: kid.child('specialNeeds').exportVal().others,
          additionalInfo: kid.exportVal().additionalInfo
        };
        this.parentProfile.kids.push(x);
      });
    }).then(() => this.pageReady = true);


    }
}
