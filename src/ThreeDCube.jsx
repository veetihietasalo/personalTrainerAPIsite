import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDCube = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;

        // Scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        // Without WebGL this throws and would blank the whole page, so skip the cube
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ alpha: true });
        } catch (error) {
            return;
        }
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        // Cube with increased size
        const geometry = new THREE.BoxGeometry(2, 2, 2); // Width, height, and depth of the cube
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        // Animation
        let frame;
        const animate = function () {
            frame = requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            cancelAnimationFrame(frame);
            currentMount.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ width: '400px', height: '400px' }} />;
};

export default ThreeDCube;
