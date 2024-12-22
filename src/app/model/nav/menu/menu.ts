import { PermissionName} from '../../../auth/model/permission-name';

export interface MenuItem {
	displayName?: string;
	iconName?: string;
	iconPath?: string;
	route?: string;
	permissions?: PermissionName[],
	children?: MenuItem[];
	active?: boolean;
	disabled?: boolean;
	divider?: boolean;
}

 export let navSidebarMenu: MenuItem[] = [
	 {
		 displayName: 'Starter Spring',
		 iconName: 'rocket',
		 route: 'starter-spring',
		 active: true
	 }
 ];
