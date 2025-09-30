"use client";

import React, { useEffect, useRef, useState } from 'react'
import './Sidebar.css'
import { getUserInfo } from 'services/userServices/userService';
import { UserInfo } from 'types/user';
import SidebarItem from '../sidebaritem/SidebarItem';
import Link from 'next/link';

const SidebarComponent = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getUserInfo();
      setUser(data);
    })();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const items = [
    { icon: "account_box", label: "My information", href: "/home" },
    { icon: "admin_panel_settings", label: "Admin", href: "/home", childrenItems: [
      { icon: "people", label: "Users", href: "/home" },
      { icon: "local_offer", label: "Roles", href: "/home" },
      { icon: "settings_applications", label: "Configuration", href: "/home" },
      { icon: "people_outline", label: "Clients", href: "/home" },
      { icon: "gavel", label: "Punishments", href: "/home" },
      { icon: "import_contacts", label: "Tasks", href: "/admin/task" },
      { icon: "date_range", label: "Leave types", href: "/home" },
      { icon: "apartment", label: "Branches", href: "/home" },
      { icon: "description", label: "Position", href: "/home" },
      { icon: "view_list", label: "Capability", href: "/home" },
      { icon: "settings_accessibility", label: "Capability setting", href: "/home" },
      { icon: "date_range", label: "Off day setting", href: "/home" },
      { icon: "access_time", label: "Overtime settings", href: "/home" },
      { icon: "miscellaneous_services", label: "Audit logs", href: "/home" },
      { icon: "update", label: "Backgound Job", href: "/home" },
    ] },
    { icon: "account_circle", label: "Personal timesheet", href: "/home", childrenItems: [
      { icon: "alarm", label: "My timesheet", href: "/home" },
      { icon: "event_busy", label: "My off/remote/onsite requests", href: "/home" },
      { icon: "groups", label: "Team working calendar", href: "/home" },
      { icon: "today", label: "My working time", href: "/home" },
    ] },
    { icon: "group_work", label: "Management", href: "/home", childrenItems: [
        { icon: "rule", label: "Manage off/remote/onsite requests", href: "/home" },
        { icon: "date_range", label: "Timesheet management", href: "/home" },
        { icon: "supervised_user_circle", label: "Timesheets monitoring", href: "/home" },
        { icon: "assessment", label: "Project management", href: "/home" },
        { icon: "rate_review", label: "Review Interns", href: "/home" },
        { icon: "event_note", label: "Retrospectives", href: "/home" },
        { icon: "access_time", label: "Manage employee working times", href: "/home" },
        { icon: "location_city", label: "Branch Manager", href: "/home" },
        { icon: "store", label: "Team building", href: "/home", childrenItems: [
          { icon: "supervisor_account", label: "Team building HR", href: "/home" },
          { icon: "supervisor_account", label: "PM request", href: "/home" },
          { icon: "speaker_notes", label: "Request history", href: "/home" },
          { icon: "done_all", label: "Team building project", href: "/home" },
        ] },
        { icon: "description", label: "Report", href: "/home", childrenItems: [
          { icon: "description", label: "Interns Info", href: "/home" },
          { icon: "work_outline", label: "Normal working", href: "/home" },
          { icon: "date_range", label: "Over time", href: "/home" },
          { icon: "wysiwyg", label: "Punishment", href: "/home" },
          { icon: "addchart", label: "Komu tracker", href: "/home" },
        ] },
        
    ] },
  ];

  return (
    <div className='sidebar'>
      <div className='user-info'>
        <div className='info'>
          <div className='info-image' title='Update Avatar'>
            <img src={user?.avatarFullPath} alt="User" />
          </div>
          <div className='profile-link'>
            <Link href="/home" className='my-profile-link'>
              <div className='name'>{user?.fullName}</div>
              <div className='email'>{user?.emailAddress}</div>
            </Link>
          </div>
        </div>
        <div className='btn-group' ref={menuRef}>
          <i className='material-icons' onClick={() => setOpen((prev) => !prev)}>keyboard_arrow_down</i>
          {open && (
            <ul className='logout-menu'>
              <li>
                <a onClick={logout}>
                  <i className='material-icons'>input</i>
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <ul className="sidebar-menu">
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
            childrenItems={item.childrenItems}
          />
        ))}
      </ul>
      <div className='sidebar-footer'>
        <div className='copyright'>
           © 2025 
           <a href="javascript:void(0);">Timesheet</a>
           . 
        </div>
        <div className='version'>
          <b>Version </b>
           4.3.0.0 [20252309] 
        </div>
      </div>
    </div>
  )
}

export default SidebarComponent