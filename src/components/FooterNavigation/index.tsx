import React from 'react';

import { IconType } from 'react-icons';
import {
  FaUser,
  FaUsers,
  FaCalendarCheck,
  FaExchangeAlt,
  FaPlusCircle,
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

import { useUserStore } from '@/contexts/UserContext';

interface NavItem {
  label: string;
  icon: IconType;
  path: string;
}

const FooterNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((store) => store.user);

  const navItems: NavItem[] = [
    { label: 'Hoy', icon: FaCalendarCheck, path: '/' },
    { label: 'Pacientes', icon: FaUsers, path: '/user/patient/list' },
    { label: 'Turnos', icon: FaCalendarCheck, path: '/availability' },
    {
      label: 'Perfil',
      icon: FaUser,
      path: `/user/doctor/details/${user?.id}`,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-xs">
      <div className="flex justify-around items-center pt-2">
        {navItems.slice(0, 2).map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center text-sm pb ${
              isActive(item.path) ? 'footer-navigation-icon' : 'text-gray-400'
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs pt-1">{item.label}</span>
          </button>
        ))}

        {/* Central Plus Button */}
        <button
          onClick={() => navigate('/shift/create')}
          className="flex flex-col items-center pb-4"
          style={{
            color: 'var(--heading-color)',
          }}
        >
          <FaPlusCircle size={50} />
        </button>

        {navItems.slice(2).map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center text-sm ${
              isActive(item.path) ? 'footer-navigation-icon' : 'text-gray-400'
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs pt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </footer>
  );
};

export default FooterNavigation;
