

const loginTime = new Date().getTime();
export function isSessionExpired(time:number | undefined) {
  
  if(time){
    const expireTime = time * 60 * 1000;
     const expireSession = expireTime + loginTime;
    return expireSession > new Date().getTime()?false:true; 
  }
  }

