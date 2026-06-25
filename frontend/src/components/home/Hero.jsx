import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

const Hero = ({ onOpenQuote }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId;

    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
        vec2 uv = v_texCoord;
        
        // Flowing organic waves
        float wave1 = sin(uv.x * 2.0 + u_time * 0.4) * 0.08;
        float wave2 = sin(uv.x * 4.0 - u_time * 0.6) * 0.04;
        float combinedWave = wave1 + wave2;
        
        // Base canvas color
        vec3 color = vec3(0.95, 0.97, 0.99); 
        
        // Royal Blue waves (Primary)
        vec3 royalBlue = vec3(0.058, 0.235, 0.788); 
        float dist = abs(uv.y - (0.45 + combinedWave));
        float mask = smoothstep(0.2, 0.0, dist);
        
        color = mix(color, royalBlue, mask * 0.06); // Subtle background wave blend
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    const render = (t) => {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTime, t * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  const handleLearnMoreScroll = () => {
    const el = document.getElementById('highlights');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative w-full min-h-screen flex items-center pt-28 pb-20 px-4 md:px-8 overflow-hidden bg-cover bg-center border-b border-slate-200/80"
      style={{ 
        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3WMFCDpYszyBjpBz1AoHzcv4ig5jA-qBAEJvzUhAglBH54d7RC4fius9OaMemDQiZoPnveHJ3wvWUgSFmPDuqR5Pq6LBotMI0QsA2foxpPRFyx2ZIdAqBcyHdhsznU4qsDpaU-47cDkxltzeyLZ8oj49xeputY7W04aJRf9svJ1c1xd9nYdi4I6-ddeXgekEy4sEe54CItFx65DiDLambqJTJhOn-NTKhQnzUu0oMBPDP0YwkakFb8hPV3Sd67cqw1HQ9PRZCObk')" 
      }}
    >
      {/* WebGL Wave background canvas */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Modern High-Contrast Gradient Overlay for Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-white/80 to-white/10 md:to-transparent z-0" />

      {/* Floating 3D Abstract Orbs in background */}
      <div className="absolute top-24 left-[10%] w-72 h-72 rounded-full bg-blue-400/10 blur-3xl pointer-events-none float-slow z-0"></div>
      <div className="absolute bottom-16 right-[15%] w-96 h-96 rounded-full bg-yellow-300/10 blur-3xl pointer-events-none float-medium z-0"></div>

      <div className="relative max-w-7xl mx-auto z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Area */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Highlight badge */}
            <div className="inline-flex items-center gap-2 self-start bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-bold text-primary transition-all duration-300 hover:bg-primary/15">
              <Sparkles size={12} className="text-secondary-dark animate-spin" />
              <span>UK’s Premier SME Cost Consultancy</span>
            </div>

            <h1 className="font-montserrat text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral leading-[1.15]">
              Connecting Businesses to <span className="text-primary text-gradient bg-gradient-to-r from-primary to-[#2a54da]">Smarter Growth</span> Solutions
            </h1>
            
            <p className="font-montserrat text-xs sm:text-sm md:text-base text-slate-700 max-w-xl leading-relaxed font-semibold">
              Nitru Connect simplifies connection logistics and card billing. We audit statements, compare utility contracts, and secure financing structures so you can expand operations.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mt-2">
              <button 
                onClick={onOpenQuote}
                className="bg-primary hover:bg-primary-dark text-white font-montserrat text-xs font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(15,60,201,0.25)] active:scale-95 transition-all duration-300 shadow-[0_4px_15px_rgba(15,60,201,0.2)] cursor-pointer"
              >
                <span>Request Free Review</span>
                <ArrowRight size={14} className="text-secondary" />
              </button>
              <button 
                onClick={handleLearnMoreScroll}
                className="border border-slate-200 text-slate-700 hover:text-primary hover:border-primary/30 hover:bg-primary/5 font-montserrat text-xs font-bold px-8 py-4 rounded-full transition-all duration-300 active:scale-95 flex items-center gap-2 bg-white/80 backdrop-blur-sm cursor-pointer"
              >
                <span>Explore Services</span>
              </button>
            </div>
          </div>

          {/* Right Area: Floating widgets overlapping background image */}
          <div className="hidden lg:col-span-5 relative lg:flex justify-center h-[350px]">
            {/* Floating Micro-Card 1: Merchant terminal icon */}
            <div className="absolute bottom-12 left-6 glass-panel py-3 px-5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex items-center gap-2.5 border border-slate-200/80 bg-white/95 cursor-pointer hover:scale-105 transition-transform float-medium">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
              <span className="text-xs font-bold text-slate-700 font-montserrat">POS Settlement: Active</span>
            </div>

            {/* Floating Micro-Card 2: Funding Calculator indicator */}
            <div className="absolute top-12 right-6 glass-panel py-3 px-5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex items-center gap-3 border border-slate-200/80 bg-white/95 text-xs font-bold cursor-pointer hover:scale-105 transition-transform float-slow font-montserrat">
              <span className="text-secondary-dark text-sm">★</span>
              <span className="text-slate-700">Funding Limit: £250k</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
