import AdminPageLayout from "@/components/AdminPageLayout"
import { Button, Card } from "antd"
import { useState } from "react"
import { Steps, useSteps } from "react-step-builder"
import styled from "styled-components"

const AdminPage: React.FC = () => {

    const { next, prev, jump } = useSteps()
    const [displayStep, setDisplayStep] = useState<boolean>(true)
    const [projectName, setProjectName] = useState('')
    const [objFile, setObjFile] = useState<HTMLInputElement["files"]>()
    const [imageFiles, setImageFiles] = useState<HTMLInputElement["files"]>()
    const [sucess, setSucess] = useState(false)

    const resetSteps = () => {
        setSucess(false)
        setDisplayStep(true)
        jump(0)
    }

    const sendFiles = async () => {
        if (!objFile || !projectName)
            return

        setDisplayStep(false)
        const form = new FormData()
        form.append("name", projectName.toLowerCase())
        form.append(`${projectName.toLocaleLowerCase()}Obj`, objFile[0])
        if (imageFiles)
            Array.from(imageFiles).forEach((file, index) => {
                form.append(`${projectName.toLocaleLowerCase()}Image${index}`, file)
            })

        const options = {
            method: 'POST',
            body: form
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, options)
        if (res.status === 200)
            setSucess(true)
    }

    return (
        <AdminPageLayout>
            <Card title='Upload new project' style={{ width: '30vw', margin: '2%' }}>
                {!sucess && <>
                    <Steps>
                        <StepDiv>
                            <h3><label htmlFor="name">Project Name</label></h3>
                            <input type="text" name="name" onChange={(e) => setProjectName(e.target.value)} />
                        </StepDiv>
                        <StepDiv>
                            <h3><label htmlFor="obj-file">Obj File</label></h3>
                            <input type="file" name="obj-file" onChange={(e) => setObjFile(e.target.files)} />
                        </StepDiv>
                        <StepDiv>
                            <h3><label htmlFor="project-images">Project Images</label></h3>
                            <input type="file" name="project-images" multiple onChange={(e) => setImageFiles(e.target.files)} />
                        </StepDiv>
                        <StepDiv>
                            <button onClick={() => sendFiles()}>send</button>
                        </StepDiv>
                    </Steps>
                    <br />
                    <StepControlDiv>
                        {displayStep &&
                            <>
                                <Button onClick={() => prev()}>Previous</Button>
                                <Button onClick={() => next()}>Next</Button>
                            </>
                        }
                    </StepControlDiv>
                </>}
                {sucess &&
                    <>
                        <h3>Sucess !</h3>
                        <button onClick={() => resetSteps()}>Upload another</button>
                    </>}
            </Card>

        </AdminPageLayout>
    )
}

const StepDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
`

const StepControlDiv = styled.div`
    display: flex;
    justify-content: center;
`

export default AdminPage
