import { Button, Card } from "antd"
import { useState } from "react"
import { Steps, useSteps } from "react-step-builder"
import styled from "styled-components"


const UploadCard: React.FC = () => {
    const { next, prev, jump } = useSteps()
    const [displayStep, setDisplayStep] = useState<boolean>(true)
    const [projectName, setProjectName] = useState('')
    const [objFile, setObjFile] = useState<HTMLInputElement["files"]>()
    const [mtlFile, setMtlFile] = useState<HTMLInputElement["files"]>()
    const [textureFiles, setTextureFiles] = useState<HTMLInputElement["files"]>()
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

        if (mtlFile)
            form.append(`${projectName.toLocaleLowerCase()}Mtl`, mtlFile[0])

        if (imageFiles)
            Array.from(imageFiles).forEach((file, index) => {
                form.append(`${projectName.toLocaleLowerCase()}Image${index}`, file)
            })

        if (textureFiles)
            Array.from(textureFiles).forEach((file, index) => {
                form.append(`${projectName.toLocaleLowerCase()}Textures${index}`, file)
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
        < Card title='Upload new project' style={{ width: '30vw' }
        }>
            {!sucess && <>
                <Steps>
                    {/* Project Name */}
                    <StepDiv>
                        <h3><label htmlFor="name">Project Name</label></h3>
                        <input type="text" name="name" onChange={(e) => setProjectName(e.target.value)} />
                    </StepDiv>
                    {/* Obj file */}
                    <StepDiv>
                        <h3><label htmlFor="obj-file">Obj File</label></h3>
                        <input type="file" accept=".obj" name="obj-file" onChange={(e) => setObjFile(e.target.files)} />
                    </StepDiv>
                    {/* MTL file */}
                    <StepDiv>
                        <h3><label htmlFor="mtl-file">MTL file</label></h3>
                        <input type="file" accept='.mtl' name="mtl-file" onChange={(e) => setMtlFile(e.target.files)} />
                    </StepDiv>
                    {/* Texture files */}
                    <StepDiv>
                        <h3><label htmlFor="texture-files">Textures files</label></h3>
                        <input type="file" accept=".jpg, .png" name="texture-files" multiple onChange={(e) => setTextureFiles(e.target.files)} />
                    </StepDiv>
                    {/* Project images */}
                    <StepDiv>
                        <h3><label htmlFor="project-images">Project Images</label></h3>
                        <input type="file" accept=".jpg, .png" name="project-images" multiple onChange={(e) => setImageFiles(e.target.files)} />
                    </StepDiv>
                    {/* send */}
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
            {
                sucess &&
                <>
                    <h3>Sucess !</h3>
                    <button onClick={() => resetSteps()}>Upload another</button>
                </>
            }
        </Card >
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

export default UploadCard
