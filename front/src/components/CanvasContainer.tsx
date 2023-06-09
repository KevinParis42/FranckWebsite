import { Spin } from 'antd'
import React, { useEffect, useRef, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector';
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import styled from 'styled-components'


const CanvasContainer: React.FC<{ projectName: string }> = ({ projectName }) => {

    const sceneRef = useRef<HTMLInputElement>(null)
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer>()
    const [cameraState, setCameraState] = useState<THREE.PerspectiveCamera>()
    const { width, height, ref: sizeref } = useResizeDetector();
    const [loaded, setLoaded] = useState(false)


    async function loadScene() {
        if (!sceneRef.current)
            return
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera();
        setCameraState(camera)
        camera.position.x = -10
        camera.position.z = 10
        camera.position.y = 5
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        setRenderer(renderer)
        renderer.setSize(sceneRef.current.clientWidth, sceneRef.current.clientHeight)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        const mtlLoader = new MTLLoader()
        mtlLoader.load(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cardboard.mtl`,
            (materials) => {
                materials.preload()
                const loader = new OBJLoader()
                loader.setMaterials(materials)
                loader.load(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cardboard.obj`,
                    (object) => {
                        scene.add(object)
                    }, (xhr) => {
                        console.log(xhr.loaded, xhr.total)
                        if (xhr.loaded === xhr.total)
                            setLoaded(true)
                    }, error => {
                        console.log(error)
                    }
                )
            }, (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            }, error => {
                console.log(error)
            }
        )

        const spotlight = new THREE.SpotLight()
        spotlight.position.set(15, 15, 15)
        scene.add(spotlight)

        const ambiantLight = new THREE.AmbientLight('white', 1)
        scene.add(ambiantLight)

        renderer.setClearColor(0xffffff, 0.3);


        camera.position.z = 2;

        sceneRef.current.appendChild(renderer.domElement)
        animate()

        function animate() {
            requestAnimationFrame(animate)
            controls.update()
            render()
        }

        function render() {
            renderer.render(scene, camera)
        }
    }


    useMemo(() => {
        loadScene()
    }, [sceneRef.current])

    useEffect(() => {
        if (!sceneRef.current || !cameraState || !width || !height)
            return
        cameraState.aspect = width / height
        cameraState.updateProjectionMatrix()
        renderer?.setSize(sceneRef.current.clientWidth, sceneRef.current.clientHeight)
    }, [width, height])

    return (
        <>
            {!loaded && <SpinnerDiv><Spin /></SpinnerDiv>}
            <div ref={sizeref} style={{ width: '100%', height: '100%', display: loaded ? 'block' : 'none' }}>
                <div ref={sceneRef} id='canvas-container' style={{ width: '100%', height: '100%', display: 'block' }}></div>
            </div>
        </>
    )
}

const SpinnerDiv = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`


export default CanvasContainer
