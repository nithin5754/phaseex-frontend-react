

export const userData = [
  {
      id: 1,
      avatar: '/User1.png',
      messages: [
          {
              id: 1,
              avatar: '/User1.png',
              name: 'Jane Doe',
              url:'',
              message: 'Hey, Jakob',
          },
          {
              id: 2,
              avatar: '/LoggedInUser.jpg',
              name: 'Jakob Hoeg',
              url:'',
              message: 'Hey!',
          },
          {
              id : 3,
              avatar: '/User1.png',
              name: 'Jane Doe',
              url:'',
              message: 'How are you?',
          },
          {
              id: 4,
              avatar: '/LoggedInUser.jpg',
              name: 'Jakob Hoeg',
              url:'',
              message: 'I am good, you?',
          },
          {
              id: 5,
              avatar: '/User1.png',
              name: 'Jane Doe',
              url:'',
              message: 'I am good too!',
          },
          {
              id: 6,
              avatar: '/LoggedInUser.jpg',
              name: 'Jakob Hoeg',
              url:'',
              message: 'That is good to hear!'
          },
          {
              id: 7,
              avatar: '/User1.png',
              name: 'Jane Doe',
              url:'',
              message: 'How has your day been so far?',
          },
          {
              id: 8,
              avatar: '/LoggedInUser.jpg',
              name: 'Jakob Hoeg',
              url:'',
              message: 'It has been good. I went for a run this morning and then had a nice breakfast. How about you?',
          },
          {
              id: 9,
              avatar: '/User1.png',
              name: 'Jane Doe',
              url:'',
              message: 'I had a relaxing day. Just catching up on some reading.',
          }
      ],

  },
  {
      id: 2,
      avatar: '/User2.png',
      name: 'John Doe',
  },
  {
      id: 3,
      avatar: '/User3.png',
      name: 'Elizabeth Smith',
  },
  {
      id: 4,
      avatar: '/User4.png',
      name: 'John Smith',
  }
];

export type UserData = (typeof userData)[number];

export const loggedInUserData = {
  id: 5,
  avatar: '/LoggedInUser.jpg',
  name: 'Jakob Hoeg',
};

export type LoggedInUserData = (typeof loggedInUserData);

export interface Message {
  id: number;
  avatar: string;
  name: string;
  url:string
  message: string;
}

export interface User {
  id: number;
  avatar: string;
  messages: Message[];
  name: string;
}



export interface  GetAllGroupType {
    id:string
    title:string
    userId:string
   }








   export interface SendPromptQusType {
    groupId:string;
    questionType:"text"|"image";
    question:string
   }
  
  
  
  
  
   export interface  SendPromptAnsType {
    promptId:string
    groupId:string;
    question:string
    answer:string
    
   }


   export interface PromptType {
    id:string
    question: string;
    questionType:"text"|"image";
    answer: string | null;
  
  }
   export interface GetGptType{
    id:string;
    userId:string;
    group_title:string;
    promptArray:PromptType[]|[]
    
   }
  