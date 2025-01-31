import React, { useState, useEffect } from "react";

const LoaderComponent = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Detect mobile view
        };

        handleResize(); // Check on initial render
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
    }, []);

    return (
        <div id="loader" style={{overflow:"hidden"}}>
            {isMobile ? (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    id="bg-video"
                    style={{ objectFit: "cover", width: "100%", height: "100%",overflow:"hidden" }}
                >
                    <source src="/images/bg-mobile.mp4" type="video/mp4" />
                    <img src="/images/BG-mobile.png" alt="Mobile Background" />
                </video>
            ) : (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    id="bg-video"
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                >
                    <source src="/images/bg.mp4" type="video/mp4" />
                    <img src="/images/BG.png" alt="Desktop Background" />
                </video>
            )}
        </div>
    );
};

export default LoaderComponent;
