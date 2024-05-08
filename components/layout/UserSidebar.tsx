'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const UserSidebar = () => {
  const menuItems = [
    {
      name: 'Update Profile',
      url: '/me/update',
      icon: 'fas fa-user',
    },
    {
      name: 'Upload Avatar',
      url: '/me/upload_avatar',
      icon: 'fas fa-user-circle',
    },
    {
      name: 'Update Password',
      url: '/me/update_password',
      icon: 'fas fa-lock',
    },
  ];

  const pathname = usePathname();

  const [activeMenuItem, setActiveMenuItem] = useState(pathname);

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="list-group mt-5 pl-4">
      {menuItems.map((menuItem, index) => (
        <Link
          key={index}
          href={menuItem.url}
          className={`fw-bold list-group-item list-group-item-action ${
            activeMenuItem === menuItem.url ? 'active' : ''
          }`}
          aria-current={activeMenuItem === menuItem.url ? 'true' : 'false'}
          onClick={() => handleMenuItemClick(menuItem.url)}
        >
          <i className={`${menuItem.icon} fa-fw pe-2`}></i>
          {menuItem.name}
        </Link>
      ))}
    </div>
  );
};

export default UserSidebar;
