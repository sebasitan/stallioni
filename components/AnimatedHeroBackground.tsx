
import React, { useRef, useEffect } from 'react';

const AnimatedHeroBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        
        const setCanvasDimensions = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };

        class Particle {
            x: number;
            y: number;
            radius: number;
            color: string;
            vx: number;
            vy: number;
            canvasWidth: number;
            canvasHeight: number;

            constructor(canvasWidth: number, canvasHeight: number) {
                this.canvasWidth = canvasWidth;
                this.canvasHeight = canvasHeight;
                this.x = Math.random() * this.canvasWidth;
                this.y = Math.random() * this.canvasHeight;
                this.radius = Math.random() * 1.5 + 0.5;
                this.color = Math.random() > 0.1 ? 'rgba(209, 213, 219, 0.6)' : 'rgba(242, 101, 34, 0.8)';
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x - this.radius < 0 || this.x + this.radius > this.canvasWidth) this.vx *= -1;
                if (this.y - this.radius < 0 || this.y + this.radius > this.canvasHeight) this.vy *= -1;
            }
        }

        const createParticles = () => {
            particles = [];
            const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
            const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
            
            const particleDensity = 25000;
            const maxParticles = 200;
            let particleCount = Math.min(maxParticles, Math.floor((canvasWidth * canvasHeight) / particleDensity));
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvasWidth, canvasHeight));
            }
        };

        const connectParticles = () => {
            if (!ctx) return;
            const maxDistance = 100;
            const maxDistanceSq = maxDistance * maxDistance;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distanceSq = dx * dx + dy * dy;

                    if (distanceSq < maxDistanceSq) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(156, 163, 175, ${0.4 * (1 - Math.sqrt(distanceSq) / maxDistance)})`;
                        ctx.lineWidth = 0.4;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        };
        
        const animate = () => {
            if (!ctx || !canvas) return;
            const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
            const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            connectParticles();

            animationFrameId = requestAnimationFrame(animate);
        };

        const resizeHandler = () => {
            setCanvasDimensions();
            createParticles();
        };

        // A small delay to ensure parent dimensions are settled
        setTimeout(() => {
            resizeHandler();
            animate();
        }, 100);

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default AnimatedHeroBackground;

