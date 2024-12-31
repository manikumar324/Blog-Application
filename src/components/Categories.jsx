import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { categories } from '../data';
import { Link , useSearchParams} from 'react-router-dom';

const Categories = () => {

    const [ searchParams ] = useSearchParams();
    const category = searchParams.get('category')
  return (
    <>
        <Link to={`/home/create?category=${category || ""}`} ><Button className='!m-[20px] !text-white !w-[50%] md:!w-[85%] ' variant='contained'>Create Blog</Button></Link>
        <Table className='border border-solid border-gray-300 border-1 ml-5 md:ml-0'>
            <TableHead>
                <TableRow>
                    <TableCell  className="!font-semibold text-center md:text-left ">
                        <Link to="/home">
                        All Categories
                        </Link>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {categories.map(category=>(
                    <TableRow key={category.id}>
                    <TableCell className="!font-semibold text-center md:text-left">
                        <Link to={`/home?category=${category.type}`}>
                        {category.type}
                        </Link>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </>
  )
}

export default Categories;