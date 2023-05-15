import { Spin } from 'antd'
import React, { Suspense, useEffect, useRef, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector';
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const CanvasContainer: React.FC = () => {

    const sceneRef = useRef<HTMLInputElement>(null)
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer>()
    const { width, height, ref: sizeref } = useResizeDetector();



    useMemo(() => {
        async function fetchGLTFData() {
            const response = await fetch('http://127.0.0.1:3500/project/sword')
            const data = await response.blob()
            return data
        }

        async function loadScene() {
            const gltfData = await fetchGLTFData()
            if (!sceneRef.current)
                return

            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(70, 2, 1, 100);
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            setRenderer(renderer)
            renderer.setSize(sceneRef.current.clientWidth, sceneRef.current.clientHeight)

            const controls = new OrbitControls(camera, renderer.domElement)
            controls.enableDamping = true

            const loader = new GLTFLoader();
            loader.parse(await gltfData.arrayBuffer(), '', (gltf) => {
                scene.add(gltf.scene);
            })

            const light = new THREE.SpotLight()
            light.position.set(5, 5, 5)
            scene.add(light)

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
        }

        loadScene()
    }, [])

    useEffect(() => {
        console.log(width, height)
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
