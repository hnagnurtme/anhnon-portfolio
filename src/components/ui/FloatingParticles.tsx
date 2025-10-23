import React, { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    alphaChange: number;
}

interface ShootingStar {
    x: number;
    y: number;
    length: number;
    speed: number;
    angle: number;
    alpha: number;
}

const StarCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>( null );

    useEffect( () => {
        const canvas = canvasRef.current;
        if ( !canvas ) return;
        const ctx = canvas.getContext( "2d" );
        if ( !ctx ) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const NUM_STARS = 200;
        const NUM_SHOOTING = 5;

        // Stars
        const stars: Star[] = [];
        for ( let i = 0; i < NUM_STARS; i++ ) {
            stars.push( {
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.5 + 0.5,
                alphaChange: Math.random() * 0.02 + 0.005,
            } );
        }

        // Shooting stars
        const shootingStars: ShootingStar[] = [];
        for ( let i = 0; i < NUM_SHOOTING; i++ ) {
            shootingStars.push( {
                x: Math.random() * width,
                y: Math.random() * height * 0.5,
                length: Math.random() * 150 + 100,
                speed: Math.random() * 10 + 6,
                angle: Math.random() * Math.PI / 6 - Math.PI / 12, // -15° → +15°
                alpha: 0,
            } );
        }
        const animate = (  ) => {
            if ( !ctx ) return;

            ctx.clearRect( 0, 0, width, height );

            // Draw stars
            stars.forEach( ( s ) => {
                s.alpha += s.alphaChange;
                if ( s.alpha > 1 || s.alpha < 0.3 ) s.alphaChange *= -1;

                ctx.beginPath();
                const gradient = ctx.createRadialGradient( s.x, s.y, 0, s.x, s.y, s.radius * 4 );
                gradient.addColorStop( 0, `rgba(255,255,255,${ s.alpha })` );
                gradient.addColorStop( 0.8, `rgba(200,200,255,0.1)` );
                gradient.addColorStop( 1, "rgba(0,0,0,0)" );
                ctx.fillStyle = gradient;
                ctx.arc( s.x, s.y, s.radius, 0, Math.PI * 2 );
                ctx.fill();
            } );

            // Draw shooting stars
            shootingStars.forEach( ( sh ) => {
                sh.x += Math.cos( sh.angle ) * sh.speed;
                sh.y += Math.sin( sh.angle ) * sh.speed;

                sh.alpha += 0.02;
                if ( sh.alpha > 1 ) sh.alpha = 1;

                ctx.beginPath();
                const grad = ctx.createLinearGradient( sh.x, sh.y, sh.x - Math.cos( sh.angle ) * sh.length, sh.y - Math.sin( sh.angle ) * sh.length );
                grad.addColorStop( 0, `rgba(255,255,255,${ sh.alpha })` );
                grad.addColorStop( 1, "rgba(255,255,255,0)" );
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.moveTo( sh.x, sh.y );
                ctx.lineTo( sh.x - Math.cos( sh.angle ) * sh.length, sh.y - Math.sin( sh.angle ) * sh.length );
                ctx.stroke();

                if ( sh.x > width + sh.length || sh.y > height + sh.length ) {
                    sh.x = Math.random() * width;
                    sh.y = Math.random() * height * 0.5;
                    sh.alpha = 0;
                    sh.length = Math.random() * 150 + 100;
                    sh.speed = Math.random() * 10 + 6;
                    sh.angle = Math.random() * Math.PI / 6 - Math.PI / 12;
                }
            } );

            requestAnimationFrame( animate );
        };

        requestAnimationFrame( animate );

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener( "resize", handleResize );

        return () => {
            window.removeEventListener( "resize", handleResize );
        };
    }, [] );

    return <canvas ref={ canvasRef } className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

export default StarCanvas;
