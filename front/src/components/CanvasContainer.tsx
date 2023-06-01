import { Spin } from 'antd'
import React, { Suspense, useEffect, useRef, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector';
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const CanvasContainer: React.FC<{ projectName: string }> = ({ projectName }) => {

    const sceneRef = useRef<HTMLInputElement>(null)
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer>()
    const { width, height, ref: sizeref } = useResizeDetector();



    useMemo(() => {
        async function fetchGLTFData() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectName}/file`)
            const data = await response.blob()
            return await data.arrayBuffer()
        }

        async function loadScene() {
            try {
                if (!sceneRef.current)
                    return
                const gltfData = await fetchGLTFData()
                const scene = new THREE.Scene()
                const camera = new THREE.PerspectiveCamera(70, 2, 1, 100);
                const renderer = new THREE.WebGLRenderer({ antialias: true });
                setRenderer(renderer)
                renderer.setSize(sceneRef.current.clientWidth, sceneRef.current.clientHeight)

                const controls = new OrbitControls(camera, renderer.domElement)
                controls.enableDamping = true

                const loader = new GLTFLoader();
                loader.parse(gltfData, '', (gltf) => {
                    scene.add(gltf.scene);
                })

                const spotlight = new THREE.SpotLight()
                spotlight.position.set(15, 15, 15)
                scene.add(spotlight)

                const ambiantLight = new THREE.DirectionalLight('white', 3)
                ambiantLight.position.set(1, 1, 1)
                scene.add(ambiantLight)

                camera.position.z = 2;

                sceneRef.current.appendChild(renderer.domElement)

                function animate() {
                    requestAnimationFrame(animate)
                    controls.update()
                    render()
                }

                function render() {
                    renderer.render(scene, camera)
                }
                animate()
            } catch (e) {
                console.error(e)
            }
        }

        loadScene()
    }, [sceneRef.current])

    useEffect(() => {
        if (!sceneRef.current)
            return
        renderer?.setSize(sceneRef.current.clientWidth, sceneRef.current.clientHeight)
    }, [width, height])

    return (
        <Suspense fallback={<Spin />}>
            <div ref={sizeref} style={{ width: '100%', height: '100%', display: 'block' }}>
                <div ref={sceneRef} id='canvas-container' style={{ width: '100%', height: '100%', display: 'block' }}></div>
            </div>
        </Suspense>
    )
}


export default CanvasContainer
