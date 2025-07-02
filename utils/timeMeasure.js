export default function timeMeasure(fn){
    const now = Date.now();
    fn();
    const end = Date.now();
    return end-now;
}