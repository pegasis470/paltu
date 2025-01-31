"use client";
import { Router } from "next/router";
import SideDrawer from "../app/components/SideDrawer";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      width:"100%",
      minHeight:"100%",
    }}>
      <SideDrawer />
      <div style={{display:"block",height:"100%",width:"100%"}}>
      <div style={{ 
        marginTop:isMobile? "20%":"10%",
        marginBottom:"10%",
        marginLeft: "0%",
        width:"100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        padding: isMobile ? "1rem" : 0,
        height:"50%"
      }}>
        <img 
          src="center.png" 
          style={{
            width: isMobile ? "90%" : "40%",
            height: "auto"
          }} 
          alt="Center" 
        />
      </div>
      <div style={{display:"flex",width:"100%"}}>
        <img src="/icon1.png" width="200" alt="" />
        <h1 style={{marginLeft:"2%",color:"#54b1b1",fontFamily:"MoreSugarThin"}}>Need help in getting <br /> community animals <br />adopted???</h1>
      </div>
      <div style={{ marginLeft: isMobile? "30%":"65%",textAlign:"right",display:"flex"}}>
        <h1 style={{marginRight:"2%",color:"#54b1b1",fontFamily:"MoreSugarThin"}}>No idea where <br /> you can adopt a <br /> pet from?</h1>
        <img src="/icon4.png" width="200" alt="" />
      </div>
      <div style={{display:"flex",width:"100%"}}>
        <img src="/icon2.png" width="150" alt="" />
        <h1 style={{marginLeft:"2%",color:"#54b1b1",fontFamily:"MoreSugarThin"}}>New Pet Parents, <br />struggling understand <br /> your pet needs?</h1>
      </div>
      <div style={{ marginLeft:isMobile? "30%":"65%",textAlign:"right",display:"flex"}}>
        <h1 style={{marginRight:"2%",color:"#54b1b1",fontFamily:"MoreSugarThin"}}>Don't worry, we're <br /> here to connect your <br /> loose ends!</h1>
        <img src="/icon3.png" width="200" alt="" />
      </div>
      <div style={{width:"100%",textAlign:"center"}}>
        <p style={{color:"#f69001",fontSize:"300%",fontWeight:"bolder",fontFamily:"LeagueSpartan"}}>
          MAKING <span style={{color:"#54b1b1"}}>P</span>ET <span style={{color:"#54b1b1"}}>P</span>ARENTING EASY
        </p>
      </div>
      </div>
        <div>
        <img style={{marginTop:"1%",marginLeft:isMobile? "-25%":"-10%",position:"fixed"}} width="200" src="/images/paws.png" alt="" />
        <p style={{marginTop:isMobile? '5.8%':"3.3%",marginLeft:isMobile? '-20%':"-8%",position:"fixed",fontFamily:"MoreSugar"}} >Namaste Hooman !!</p>
        </div>

    </div>
  );
}