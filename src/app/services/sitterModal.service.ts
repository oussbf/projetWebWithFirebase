export class SitterModalService {
  id = '';
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  phoneNumber: string;
  city: string;
  ZIP: string;
  jobEducation: string;
  gender: string;
  numberOfChildrenHandling: string;
  childAge: string [];
  displacement: boolean;
  experienceYears: number;
  certificates: string [];
  aboutMe: string;
  notifications: {
    emailSub: string,
    jobRequest: boolean,
    reviewsReceived: boolean;
  };
  availability: boolean;
  availabilityDate: string;
  availabilityDuration: string;
  availabilityAdditionalInfo: string;
  availablityOpenForRegularJob: boolean;
  reviews: {
    idRev: string,
    firstNameRev: string,
    reviewDate: string,
    review: string,
    reviewText: string,
    imageURL: string
  } [];
  avgRate: number;
  starCounts: number [];
  jobs: {
    idJob: string,
    id: string,
    nameSender: string,
    phoneNumber: string,
    jobDate: string,
    jobLength: number,
    jobLocation: string,
    numChildren: number,
    openFRJ: boolean,
    jobStatus: boolean
  } [];
  imageUrl: string;

  constructor(firstName , lastName, email, phoneNumber, jobEducation, city, ZIP, age,
              numberOfChildrenHandling, childAge, displacement, experienceYears, certificates, aboutMe,
              notifications, gender,
              availability, availabilityDate, availabilityDuration, availabilityAdditionalInfo,
              reviews, avgRate, starCounts, availablityOpenForRegularJob, jobs) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.jobEducation = jobEducation;
    this.city = city;
    this.numberOfChildrenHandling = numberOfChildrenHandling;
    this.childAge = childAge;
    this.displacement = displacement;
    this.experienceYears = experienceYears;
    this.certificates = certificates;
    this.aboutMe = aboutMe;
    this.notifications = notifications;
    this.availability = availability;
    this.availabilityDate = availabilityDate;
    this.availabilityDuration = availabilityDuration;
    this.availabilityAdditionalInfo = availabilityAdditionalInfo;
    this.reviews = reviews;
    this.avgRate = avgRate;
    this.starCounts = starCounts;
    this.availablityOpenForRegularJob = availablityOpenForRegularJob;
    this.jobs = jobs;
    this.ZIP = ZIP;
  }


  toggleElementInArray(array: string[], str: string) {
    const index = array.indexOf(str);

    if (index === -1) {
      array.push(str);
    } else {
      array.splice(index, 1);
    }
  }

  deleteJob(i) {
    this.jobs.splice(i, 1);
  }

  acceptClick(i) {
    this.jobs[i].jobStatus = true;
  }

  rejectClick(i) {
    this.jobs[i].jobStatus   = true;
  }
}
