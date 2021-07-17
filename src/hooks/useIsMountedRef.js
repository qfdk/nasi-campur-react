const {useEffect, useRef} = require('react');

const useIsMountedRef = () => {
    const isMountedRef = useRef(null);
    useEffect(() => {
        isMountedRef.current = true;
        return () => isMountedRef.current = false;
    });
    return isMountedRef;
};

export default useIsMountedRef;