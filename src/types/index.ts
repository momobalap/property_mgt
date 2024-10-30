export interface SidebarItem {
  id: string;
  name: string;
  icon: string;
  permission: string;
  subItems?: SidebarItem[];
}

export interface User {
  id: number;
  email: string;
  user_type: string;
  role: string;
  user_name: string;
  permissions: string[];
}