import {ParentAccountService} from './parent-account.service';

export class ParentModal {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  notifications: {
    emailSub: string,
    favsAvailability: boolean,
    messagesReceived: boolean
  };
  city: string;
  ZIP: string;
  messages: {
    idMessage: string,
    idSender: string,
    firstNameSender: string,
    lastNameSender: string,
    status: string,
    phoneNumber: string,
    imageURL: string
  } [];
  kids: {
    idKid: string
    kidName: string,
    kidAge: number,
    childAge: string,
    specialNeeds: string [],
    otherSpecialNeed: string,
    additionalInfo: string
  } [];
  favourites: {
    id: string
    firstName: string,
    lastName: string,
    experience: number,
    location: string,
    description: string,
    rating: number,
    certificates: string[],
    avgRate: number,
    imageUrl: string
  } [];
    imageUrl: string;
  constructor(firstName , lastName, email, phoneNumber, notifications, city, ZIP, messages, kids,
              favourites) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.notifications = notifications;
    this.city = city;
    this.ZIP = ZIP;
    this.messages = messages;
    this.kids = kids;
    this.favourites = favourites;
  }

  toggleSpecialNeed(array: string[], str: string) {
    const index = array.indexOf(str);

    if (index === -1) {
      array.push(str);
    } else {
      array.splice(index, 1);
    }
  }

  addKid() {
    this.kids.push({idKid: '', additionalInfo: '', childAge: '', kidAge: 0, kidName: '', otherSpecialNeed: '', specialNeeds: []});
  }

  deleteChild( i) {
    this.kids.splice(i, 1);
  }

  deleteMessage(i) {
    this.messages.splice(i, 1);
  }

  deleteFavourite(i) {
    this.favourites.splice(i, 1);
  }
}

