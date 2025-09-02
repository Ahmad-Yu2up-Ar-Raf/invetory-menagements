import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Filters {
    search?: string;
    
    status?: string[] | string;
    [key: string]: unknown;
}


export interface Auth {
    user: User;
    teams: Teams[];
    currentTeam: Teams | null
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}
export interface PaginatedData {
    data:  EventsSchema[];
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}


export interface Teams {
    id: number;
    name: string;
    plan? : string;
    logo?: LucideIcon
    owner_id: number
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}




export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface sidebarType {  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}



export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
