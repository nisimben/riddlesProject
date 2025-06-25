export default function measureTime(fn){
    const now = Date.now();
    fn();
    const end = Date.now();
    return end-now;
}