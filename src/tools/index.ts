 class Tools {
    //防抖函数定义
    debounce(fun: Function, delay: number) {
        let timer: any;
        return (...args: any) => {
            // var args = arguments;
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fun.apply(this, args);
            }, delay);
        }
    }
    //节流函数定义
    throttle(fun: Function, delay: number) {
        let timer: any;
        return (...args: any) => {
            // var args = arguments;
            if (!timer) {
                timer = setTimeout(() => {
                    fun.apply(this, args);
                    clearTimeout(timer);
                    timer = null;
                }, delay);
            }
        }
    }
}
export default Tools