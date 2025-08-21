import { useEffect, useRef } from "react";

export default function BackgroundCanvas({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
    if (!gl) return;

    const vert = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const frag = `
      precision highp float;
      uniform vec2 u_res;
      uniform float u_time;

      // very light / desaturated palette for a premium lofi feel
      vec3 pal(float t){
        vec3 a = vec3(0.98, 0.985, 0.98); // near-white
        vec3 b = vec3(0.86, 0.93, 0.98);  // pale cool blue
        return mix(a, b, t);
      }

      // soft metaball contribution
      float field(vec2 p, vec2 c, float r){
        float d = length(p - c);
        return r*0.25 / (d + 0.001);
      }

      void main(){
        vec2 uv = (gl_FragCoord.xy / u_res.xy) * 2.0 - 1.0;
        uv.x *= u_res.x / u_res.y;

        float t = u_time * 0.45;

        vec2 c1 = vec2(sin(t*0.8)*0.55, cos(t*1.0)*0.38);
        vec2 c2 = vec2(cos(t*0.6)*0.45 + 0.22, sin(t*0.5)*0.45 - 0.12);
        vec2 c3 = vec2(sin(t*1.1)*0.28 - 0.32, cos(t*0.75)*0.34 + 0.22);

        float f = 0.0;
        f += field(uv, c1, 0.45);
        f += field(uv, c2, 0.42);
        f += field(uv, c3, 0.38);

        // push threshold so shapes are soft and subtle
        float v = smoothstep(0.6, 1.6, f);
        v *= 0.85; // globally reduce intensity

        // gentle vignette to give depth but keep very light
        float vignette = pow(1.0 - length(uv) * 0.85, 1.6) * 0.06;

        // tiny soft noise for texture
        float n = fract(sin(dot(uv.xy * (u_time + 12.345), vec2(12.9898,78.233))) * 43758.5453);
        float grain = (n - 0.5) * 0.01;

        vec3 color = pal(v) * (0.6 + v * 0.45) + vignette + grain;

        // very slight desaturation for lofi/premium
        float gray = dot(color, vec3(0.3,0.59,0.11));
        color = mix(color, vec3(gray), 0.06);

        // output with full alpha (we use CSS opacity on canvas)
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vS = compile(gl.VERTEX_SHADER, vert);
    const fS = compile(gl.FRAGMENT_SHADER, frag);
    const program = gl.createProgram();
    gl.attachShader(program, vS);
    gl.attachShader(program, fS);
    gl.bindAttribLocation(program, 0, "position");
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
    }

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    gl.useProgram(program);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const u_res = gl.getUniformLocation(program, "u_res");
    const u_time = gl.getUniformLocation(program, "u_time");

    let raf = null;
    let start = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    function render() {
      resize();
      const now = performance.now();
      const time = (now - start) / 1000;
      gl.uniform2f(u_res, canvas.width, canvas.height);
      gl.uniform1f(u_time, time);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      try {
        gl.deleteBuffer(quad);
        gl.deleteProgram(program);
        gl.deleteShader(vS);
        gl.deleteShader(fS);
      } catch (e) {}
    };
  }, []);

  // soft, low-contrast overlay that sits subtly above white background
  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 w-full h-full -z-10 ${className}`}
      aria-hidden="true"
      style={{
        display: "block",
        mixBlendMode: "multiply",
        opacity: 0.12, /* tweak between 0.08 - 0.18 for subtlety */
      }}
    />
  );
}