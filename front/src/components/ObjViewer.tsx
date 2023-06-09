
import styled from 'styled-components';
import CanvasContainer from './CanvasContainer';

const ObjViewer: React.FC<{ projectName: string }> = ({ projectName }) => {

    return (
        <>
            <ParentDiv>
                <CanvasFrame>
                    <CanvasContainer projectName={projectName} />
                </CanvasFrame>
            </ParentDiv>
        </>
    )
}

const ParentDiv = styled.div`
    display: 'flex';
    flex-direction: 'column';
    align-items: center;
`

const CanvasFrame = styled.div`
    height: 60vh;
     width: 80vw;
    border: solid;
`

export default ObjViewer
