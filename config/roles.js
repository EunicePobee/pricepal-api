export const roles = [
    {
        role: 'admin',
        permissions: [
            'update_profile',
            'delete_profile',
            'read_users',
            'update_user',
            'create_article',
            'update_article',
        ]
    },
    {
        role: 'user',
        permissions: [
            'update_profile',
            'delete_profile',
        ]
    }
];