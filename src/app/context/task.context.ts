



import { Context, createContext } from 'react';
import {  ITaskContext } from './interface.context';




export const TaskContext: Context<ITaskContext> = createContext({
 
spaceAllMembers:[]

}) as unknown  as Context<ITaskContext>
