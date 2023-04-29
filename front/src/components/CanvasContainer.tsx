import { Dispatch, SetStateAction, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";


type CanvasContainerProps = {
    mtlFilePath: string,
    objFilePath: string,
    setDisplayScene: Dispatch<SetStateAction<boolean>>,
    directionnalLightX: number,
    directionnalLightY: number,
    directionnalLightZ: number,
    ambiantLightIntensity: number
}

const CanvasContainer: React.FC<CanvasContainerProps> = (props) => {

    const Scene = () => {
        const materials = useLoader(MTLLoader, props.mtlFilePath);
        const obj = useLoader(OBJLoader, props.objFilePath, (loader) => {
            materials.preload();
            loader.setMaterials(materials);
        });

        if (obj)
            props.setDisplayScene(true)

        return <primitive object={obj} scale={0.4} />;
    }

    return (

        <Canvas camera={{ position: [0, 0, 40] }}>
            <Suspense fallback={null}>
                <Scene />
                <OrbitControls />
                <directionalLight
                    position={[props.directionnalLightX, props.directionnalLightZ, props.directionnalLightY]}
                    intensity={0.5}
                    castShadow={false}
                />
                <ambientLight intensity={props.ambiantLightIntensity} />
            </Suspense>
        </Canvas>
    )
}

export default CanvasContainer
