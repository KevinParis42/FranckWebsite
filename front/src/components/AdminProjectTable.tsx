import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import { Button, Checkbox, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';


interface DataType {
    key: string;
    name: string;
    link: string;
    isPublished: boolean;
}

const AdminProjectTable: React.FC = () => {

    const [projects, setProjects] = useState([])

    const getProjects = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`)
        setProjects(await res.json())
    }

    const deleteProject = (deletedProject) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${deletedProject.id}`, { method: 'DELETE' })
        setProjects(projects.filter(project => project.id !== deletedProject.id))
    }

    useEffect(() => {
        getProjects()
        console.log(projects[0])
    }, [])

    const columns: ColumnsType<DataType> = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'link',
            dataIndex: 'name',
            render: (name: string) => <a href={`/gallery/${name}`} target="_blank" >View Page</a>,
            key: 'link',
        },
        {
            title: 'isPublished',
            dataIndex: 'isPublished',
            render: (value: boolean) => <Checkbox checked={value} />,
            key: 'isPublished',
        },
        {
            render: (project) => <Button danger onClick={() => deleteProject(project)}><DeleteOutlined /></Button>,
            key: 'delete'
        }
    ]

    return (
        (projects &&
            <Table columns={columns} dataSource={projects} size='small' />
        )
    )
}

export default AdminProjectTable
