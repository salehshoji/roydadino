// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: '',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'رویداد نگار',
      type: 'item',
      url: '/utils/util-typography',
      icon: icons.IconShadow,
      breadcrumbs: false,
    },
    
  ]
};

export default utilities;
