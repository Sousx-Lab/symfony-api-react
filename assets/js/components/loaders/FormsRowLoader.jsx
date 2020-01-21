import React from "react"
import ContentLoader from "react-content-loader" 

const FormsRowLoader = props => (
  <ContentLoader 
    height={200}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="-1" y="22" rx="4" ry="4" width="380" height="12" /> 
    <rect x="1" y="60" rx="4" ry="4" width="380" height="12" /> 
    <rect x="1" y="104" rx="4" ry="4" width="380" height="12" /> 
    <rect x="1" y="120" rx="7" ry="7" width="40" height="15" /> 
    <rect x="45" y="123" rx="7" ry="7" width="40" height="12" /> 
    <rect x="1" y="6" rx="7" ry="7" width="60" height="8" /> 
    <rect x="1" y="41" rx="7" ry="7" width="60" height="8" /> 
    <rect x="1" y="84" rx="7" ry="7" width="60" height="9" />
  </ContentLoader>
)


export default FormsRowLoader