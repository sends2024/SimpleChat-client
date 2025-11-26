export function useDebounce(fn: (...args: any[]) => any, delay = 300) {
    let timer: null | ReturnType<typeof setTimeout> = null
    return function (...args: any[]) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

export function useThrottle(fn: (...args: any[]) => any, delay = 300) {
    let lastTime = 0
    return (...args: any[]) => {
        const now = Date.now()
        if (now - lastTime >= delay) {
            lastTime = now
            fn(...args)
        }
        return
    }
}
export function useDebounceInOneArray<T>(fn: (args: T[]) => any, delay = 300) {
    let timer: ReturnType<typeof setTimeout> | null = null
    let array: T[] = []

    return function (args: T | T[]) {
        if (Array.isArray(args)) array.push(...args)
        else array.push(args)

        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            /* 传拷贝值 */
            fn(array.slice())
            array.length = 0
        }, delay)
    }
}
