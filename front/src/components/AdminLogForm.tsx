import { Button, Form, Input } from 'antd';
import React, { SetStateAction } from 'react';

const USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME
const PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD



const AdminLogForm: React.FC<{ setLogged: React.Dispatch<SetStateAction<boolean>> }> = ({ setLogged }) => {

    const onFinish = (values: any) => {
        if (values.username === USERNAME && values.password == PASSWORD) {
            setLogged(true)
        }
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AdminLogForm;
