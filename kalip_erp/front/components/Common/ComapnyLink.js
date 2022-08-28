import * as React from 'react';
import Link from 'next/link'
import Tooltip from '@mui/material/Tooltip';
export default function CompanyLink({order}){
    const company = order.company
    return (
        <Link href={`/admin/company/detail/${company.id}`} component="a">
            <Tooltip title={company.name} placement="top-start" style={{cursor: 'pointer', textDecoration: 'underline', color: '#006a91'}}>
              <span>{company.name.substring(0, 15)}...</span>
            </Tooltip>
          </Link>
    )
}