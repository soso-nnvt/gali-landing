"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_res: { value: new THREE.Vector2(1, 1) },
    };
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms,
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position,1.0); }`,
      fragmentShader: `
        precision mediump float; varying vec2 vUv; uniform float u_time; uniform vec2 u_mouse; uniform vec2 u_res;
        void main(){
          vec2 uv = vUv;
          float t = u_time * 0.15;
          float wave = sin((uv.x+uv.y)*3.0 + t)*0.5+0.5;
          vec2 c = vec2(0.5+0.18*sin(t), 0.5+0.18*cos(t*1.3));
          float blob = smoothstep(0.55,0.0, distance(uv,c));
          float md = distance(uv, u_mouse);
          float ripple = smoothstep(0.34,0.0,md) * (0.5+0.5*sin(md*16.0 - u_time*2.5));
          float mask = blob*0.55 + ripple*0.55;
          vec3 lime = vec3(0.075,0.922,0.4); vec3 onyx = vec3(0.102,0.102,0.102);
          vec3 col = mix(onyx, lime, wave);
          float alpha = mask * (0.09 + 0.09*wave);
          gl_FragColor = vec4(col, alpha);
        }`,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.u_res.value.set(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      uniforms.u_mouse.value.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      if (!reduced) raf = requestAnimationFrame(loop);
    };
    if (reduced) { uniforms.u_time.value = 1.0; renderer.render(scene, camera); }
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      quad.geometry.dispose(); material.dispose(); renderer.dispose();
    };
  }, []);
  return <canvas ref={ref} className={className} style={{ width: "100%", height: "100%", display: "block" }} aria-hidden />;
}
