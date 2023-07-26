import { projectType } from '@/types';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import { Button, Checkbox, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { SetStateAction } from 'react';


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL


const AdminProjectTable: React.FC<{ projects: projectType[], setProjects: React.Dispatch<SetStateAction<projectType[]>> }> = ({ projects, setProjects }) => {



    const deleteProject = (deletedProject: projectType) => {
        fetch(`${BACKEND_URL}/project/${deletedProject.id}`, { method: 'DELETE' })
        setProjects(projects.filter((project: projectType) => project.id !== deletedProject.id))
    }

    const updatePublished = async (updateProject: projectType) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ isPublished: String(!updateProject.isPublished) })
        }
        fetch(`${BACKEND_URL}/project/${updateProject.id}`, options)
        console.log(projects.map(project => project.id === updateProject.id ? { ...updateProject, isPublished: !updateProject.isPublished } : project))
        setProjects(projects.map(project => project.id === updateProject.id ? { ...updateProject, isPublished: !updateProject.isPublished } : project))
    }


    const columns: ColumnsType<projectType> = [
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
            render: (value, project: projectType) => <Checkbox onClick={() => updatePublished(project)} checked={value} />,
            key: 'isPublished',
        },
        {
            render: (project: projectType) => <Button danger onClick={() => deleteProject(project)}><DeleteOutlined /></Button>,
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
