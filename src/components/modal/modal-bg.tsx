



import { IModalBgProps } from '@/types/modal.interface';
import { FC, ReactElement } from 'react';


const ModalBg: FC<IModalBgProps> = ({ children }): ReactElement => {
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 h-full w-full z-50 overflow-hidden ">
      <div className="absolute left-0 top-0 right-0 bottom-0 bg-black/[.85] ">{children}</div>
    </div>
  );
};
export default ModalBg;