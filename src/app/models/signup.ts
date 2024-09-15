export interface Signup {
  map(arg0: (element: any) => void): any;
  name: string;
  gender: 'male' | 'female';
  id:number;
  mobile: string;
  email: string;
  batch: string;
  address: {
    city: string;
    mandal: string;
    district: string;
    state: string;
    pincode: string;
  };
  education: {
    qualification: string;
    year: number;
    percentage: number;
  }[];
  company: {
    name: string;
    location: string;
    package: string;
    offerDate: string;
  };
  sourceType: 'Direct' | 'Refer';
  sourceFrom: string;
  referralName: string;
}
