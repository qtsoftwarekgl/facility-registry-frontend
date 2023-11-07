module.exports = [
  {
    key: 'create_user',
    name: 'Add New User',
    icon: 'person_add',
    link: '/create-user',
    roles: ['ADMIN']
  },
  {
    key: 'user_list',
    name: 'User List',
    icon: 'group',
    link: '/user-list',
    roles: ['ADMIN', 'VIEWER']

  },
  {
    key: 'health_facilities',
    name: 'Facility Registry',
    icon: 'local_pharmacy',
    link: '/facility-registry',
    roles: ['ADMIN', 'VIEWER']
  },
  {
    key: 'audit_logs',
    name: 'Audit Logs',
    icon: 'archive',
    link: '/audit_logs',
    roles: ['ADMIN']
  },
  {
    key: 'facilitytc',
    name: 'Facility T/C',
    icon: 'local_pharmacy',
    link: '/facilitytc',
    roles: ['ADMIN']
  },
  {
    key: 'settings',
    name: 'Settings',
    icon: 'settings',
    roles: ['ADMIN'],
    child: [
      {
        superParent: 'settings',
        key: 'service',
        name: 'Service',
        icon: 'medical_services',
        link: '/settings/services',
        roles: ['ADMIN']
      },
      {
        superParent: 'settings',
        key: 'package',
        name: 'Package',
        icon: 'inventory_2',
        link: '/settings/packages',
        roles: ['ADMIN']
      },
    ]
  }
];
