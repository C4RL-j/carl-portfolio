import { ImageResponse } from "next/og";

export const alt = "Carl — a personal workshop for useful tools and experiments";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",background:"#090d14",color:"#edf0f7",display:"flex",flexDirection:"column",padding:70,fontFamily:"sans-serif",border:"1px solid #263448"}}>
      <div style={{display:"flex",alignItems:"center",gap:22}}><span style={{fontSize:43,color:"#7ca2ff",fontWeight:700}}>C/</span><span style={{fontSize:17,letterSpacing:5}}>CARL / PERSONAL WORKSHOP</span><span style={{marginLeft:"auto",fontSize:13,color:"#73c7a6"}}>● BUILDING SOMETHING</span></div>
      <div style={{display:"flex",flexDirection:"column",marginTop:67,fontSize:70,fontWeight:700,letterSpacing:-3,lineHeight:1.15}}><span>I build tools for the little</span><span>things that <span style={{color:"#7ca2ff"}}>annoy me.</span></span></div>
      <div style={{display:"flex",gap:20,marginTop:45,fontSize:20,color:"#a8b6cd"}}><span>Software builder</span><span style={{color:"#f0a26b"}}>/</span><span>Video editor</span><span style={{color:"#f0a26b"}}>/</span><span>PC tinkerer</span></div>
      <div style={{display:"flex",marginTop:"auto",paddingTop:27,borderTop:"1px solid #263448",fontSize:14,color:"#9baac1"}}>Small tools. Useful experiments. An unreasonable number of tiny revisions.</div>
    </div>, size,
  );
}
