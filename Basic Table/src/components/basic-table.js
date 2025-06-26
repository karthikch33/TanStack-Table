import React, { useState } from 'react'
import STUDENTS from '../student.json'
import { createTable, useTableInstance, getCoreRowModel } from '@tanstack/react-table'
// createTable is a factory function whenever you call it returns an object 

const table = createTable();
const defaultData = [...STUDENTS]

const defaultColumns = [
    table.createDataColumn('name',{
        id : 'name',
        header : 'Name'
    }),
    table.createDataColumn('email',{
        id : 'email',
        header : 'Email'
    }),
    table.createDataColumn('phone',{
        id : 'phone',
        header : 'Phone'
    }),
    table.createDataColumn('standard',{
        id : 'standard',
        header : 'Standard'
    }),
    table.createDataColumn('section',{
        id : 'section',
        header : 'Section'
    }),
    table.createDataColumn('age',{
        id : 'age',
        header : 'Age'
    }),
    table.createDataColumn('date_of_birth',{
        id : 'date_of_birth',
        header : 'Date Of Birth',
        cell : (props)=> new Date(props.getValue()).toDateString()
    }),
    table.createDataColumn('date_of_admission',{
        id : 'date_of_admission',
        header : 'Date Of Admission',
        cell : (props)=> new Date(props?.getValue())?.toDateString()
    }),
    table.createDataColumn((row)=> row.address.pincode,{
        id : 'pincode',
        header : 'PinCode',
    }),
    table.createDataColumn((row)=>`${row.address.street}, ${row.address.city}, ${row.address.state}`,{
        id : 'address',
        header : 'Full Address',
        cell : (props)=> <span>{props.getValue()} - <b>{props.row.original.address.pincode}</b></span>
    })
]


const BasicTable = () => {
    const [data,setData] = useState([...defaultData]);
    const [columns,setColumns] = useState([...defaultColumns]);

    const instance = useTableInstance(table,{
        data,
        columns,
        getCoreRowModel : getCoreRowModel() // compute the value and returns the new row model
    })  

    return (
        <div>
            <table border={1}>
                <thead>
                    {
                        instance?.getHeaderGroups()?.map((headerGroup)=>(
                            <tr id={headerGroup?.id}>
                                {
                                    headerGroup?.headers?.map((header)=>(
                                        <th id={header?.id}>
                                            {header?.isPlaceholder ? null : header?.renderHeader()}
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        instance?.getRowModel()?.rows?.map((row)=>(
                            <tr key={row?.id}>
                                {
                                    row?.getVisibleCells()?.map((cell)=>(
                                        <td id={cell.id}>
                                            {cell?.renderCell()}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default BasicTable