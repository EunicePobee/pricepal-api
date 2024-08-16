export const roles = [
    {
        role: 'admin',
        permissions: [
            'post_category',
            'get_categories',
            'get_category',
            'update_category',
            'delete_category',
            'post_company',
            'get_companies',
            'get_company',
            'update_company',
            'delete_company',
            'post_product',
            'get_products',
            'get_product',
            'update_product',
            'delete_product',
        ]
    },
    {
        role: 'user',
        permissions: [
            'get_categories',
            'get_category',
            'get_companies',
            'get_company',
            'get_products',
            'get_product'
        ]
    }
];