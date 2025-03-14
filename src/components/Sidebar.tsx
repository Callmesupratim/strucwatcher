
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar as ShadcnSidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  BarChart3, 
  BellRing, 
  Settings, 
  Building, 
  Wrench, 
  Waves,
  ShieldAlert
} from 'lucide-react';

const menuItems = [
  { title: 'Dashboard', path: '/', icon: LayoutDashboard },
  { title: 'Monitoring', path: '/monitoring', icon: BarChart3 },
  { title: 'Alerts', path: '/alerts', icon: BellRing },
  { title: 'Admin', path: '/admin', icon: ShieldAlert },
];

const secondaryItems = [
  { title: 'Structures', path: '/structures', icon: Building },
  { title: 'Sensors', path: '/sensors', icon: Waves },
  { title: 'Maintenance', path: '/maintenance', icon: Wrench },
  { title: 'Settings', path: '/settings', icon: Settings },
];

const AppSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <ShadcnSidebar>
      <SidebarContent>
        <div className="flex flex-col items-center py-6">
          <div className="bg-monitor-primary text-white p-2 rounded-lg mb-2">
            <Waves className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold">StrucWatch</h2>
          <p className="text-xs text-muted-foreground">Structural Monitoring</p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild data-active={isActive(item.path)}>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild data-active={isActive(item.path)}>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
};

export default AppSidebar;
