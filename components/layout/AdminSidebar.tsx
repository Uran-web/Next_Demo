'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const AdminSidebar = () => {
  const menuItems = [
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'fas fa-tachometer-alt',
    },
    {
      name: 'Rooms',
      url: '/admin/rooms',
      icon: 'fas fa-hotel',
    },
    {
      name: 'Bookings',
      url: '/admin/bookings',
      icon: 'fas fa-receipt',
    },
    {
      name: 'Users',
      url: '/admin/users',
      icon: 'fas fa-user',
    },
    {
      name: 'Reviews',
      url: '/admin/reviews',
      icon: 'fas fa-star',
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
            activeMenuItem.includes(menuItem.url) ? 'active' : ''
          }`}
          aria-current={
            activeMenuItem.includes(menuItem.url) ? 'true' : 'false'
          }
          onClick={() => handleMenuItemClick(menuItem.url)}
        >
          <i className={`${menuItem.icon} fa-fw pe-2`}></i>
          {menuItem.name}
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebar;
