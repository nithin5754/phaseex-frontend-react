import { ReactNode, MouseEventHandler, Dispatch, SetStateAction } from "react";


export interface IModalBgProps {
  children?: ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onToggle?: Dispatch<SetStateAction<boolean>>;
  onTogglePassword?: Dispatch<SetStateAction<boolean>>;

}


export interface IInviteModalProps {
  permission?:boolean;
  onClose: () => void;
}