export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ISkill {
  id?: string;
  name: string;
  yearsOfExperience: number;
  seniorityLevel: number; // Adjust type based on your backend DTO
}

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date; // Consider using Date or Moment.js for handling dates
  email: string;
  address: IAddress;
  skills: ISkill[];
}
