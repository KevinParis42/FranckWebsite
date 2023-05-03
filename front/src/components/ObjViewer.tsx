
import { useEffect, useState } from "react";
import CanvasContainer from './CanvasContainer';
import DirectionnalLightContainer from './DirectionnalLightContainer';

const ObjViewer: React.FC<{ mtlFilePath: string, objFilePath: string }> = ({ mtlFilePath, objFilePath }) => {

    const [directionnalLightX, setDirectionnalLightX] = useState<number>(0)
    const [directionnalLightZ, setDirectionnalLightZ] = useState<number>(1)
    const [directionnalLightY, setDirectionnalLightY] = useState<number>(0)
    const [ambiantLightIntensity, setAmbiantLightIntensity] = useState(0.2)


    const changeAmbiantLightIntensity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmbiantLightIntensity(parseInt(e.target.value))
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ height: '40vh', width: '40vw', border: 'solid white' }}>
                    <CanvasContainer
                        mtlFilePath={mtlFilePath}
                        objFilePath={objFilePath}
                        directionnalLightX={directionnalLightX}
                        directionnalLightY={directionnalLightY}
                        directionnalLightZ={directionnalLightZ}
                        ambiantLightIntensity={ambiantLightIntensity}
                    />
                </div>
                <div id="control-container">
                    <DirectionnalLightContainer
                        setDirectionnalLightX={setDirectionnalLightX}
                        setDirectionnalLightY={setDirectionnalLightY}
                        setDirectionnalLightZ={setDirectionnalLightZ}
                        directionnalLightX={directionnalLightX}
                        directionnalLightY={directionnalLightY}
                        directionnalLightZ={directionnalLightZ}
                    />
                    <div id="ambiant-light-container">
                        <p>Ambiant Light</p>
                        <div>
                            <label>intensity</label>
                            <input type="number" step="0.1" max={1} min={-1} onChange={(e) => changeAmbiantLightIntensity(e)} value={ambiantLightIntensity} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ObjViewer
