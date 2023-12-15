import { Canvas, PrimitiveProps, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styles from "./Hello.module.scss";
import * as THREE from "three";


function Suzanne(props:Partial<PrimitiveProps>) {
  const gltf = useLoader(GLTFLoader, "./assets/Suzanne.glb");
  const merged=Object.assign(
    Object.assign({},props),
    {
      object:gltf.scene.clone()
    }
  );
  merged.object.traverse((object3d)=>{
    if(object3d instanceof THREE.Mesh){
      object3d.castShadow=true;
    }
  })
  
  return (
    <primitive {...merged}/>
  );
}


export default function Hello(){
  const fallback=<span>Loading...</span>;
  return (<>
    <div className={styles["component"]}>
      <Suspense fallback={fallback}>
        <Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight intensity={1.0} position={[0, 0, 5]} />
          <Suzanne/>
        </Canvas>
      </Suspense>
    </div>
  </>);
}