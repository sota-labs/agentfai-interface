import React, { useEffect, useRef, useState } from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { IoIosLogOut } from 'react-icons/io';
import { AppButton } from '../AppButton';
import rf from '@/services/RequestFactory';
import { useAuthStore } from '@/libs/zustand/auth';
import { useRouter } from 'next/navigation';
import LabelComingSoon from './labelComingSoon';

const AccountMenu = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthStore();
  const router = useRouter();

  const onLogout = async () => {
    try {
      await rf.getRequest('AuthRequest').logout();
      logout();
      router.push('/');
    } catch (e: any) {
      console.error(e);
    }
  };

  const toggleModal = () => setModalOpen(!isModalOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const accountMenuItems = [
    { icon: RiAccountCircleFill, label: 'Account' },
    // { icon: AiOutlineTeam, label: 'Team' },
    // { icon: FaInbox, label: 'Inbox' },
    // { icon: CiGift, label: 'Gift' },
  ];
  return (
    <div className="mt-auto text-neutral-500 text-sm space-y-6 relative">
      <AppButton
        onClick={(e) => {
          e.stopPropagation();
          toggleModal();
        }}
        className={`${isModalOpen ? 'bg-[#a0faa0]/25' : ''} mt-2`}
      >
        Account
      </AppButton>
      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute bottom-full right-0 bg-[#1E1E1E] p-3 rounded-lg w-full shadow-lg border border-white-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-2">
            {accountMenuItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center p-1 rounded w-full text-white-1000 cursor-pointer hover:bg-white-100"
              >
                <Icon className="mr-2" />
                <div className="flex items-center gap-1">
                  {label}
                  <LabelComingSoon />
                </div>
              </div>
            ))}
            <div className=" border-b border-white-100"></div>

            <div
              onClick={onLogout}
              className="flex items-center p-1 rounded w-full text-white-1000 cursor-pointer hover:bg-white-100"
            >
              <IoIosLogOut className="mr-2" />
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
