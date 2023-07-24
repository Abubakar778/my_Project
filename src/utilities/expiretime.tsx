

// const {userData} = useAppSelector(loginSelector);
export function isSessionExpired(time:number | undefined) {
  
  if(time){
    const loginTime =  time * 60 * 1000;
    if (loginTime) {
      const currentTime = new Date().getTime();
      // const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      return currentTime - loginTime > loginTime;
    }
    return true; // If loginTime is not set, consider the session as expired
  }
  }

