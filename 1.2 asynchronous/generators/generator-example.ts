const fibonacci = (len: number, nums = [0, 1])=> {
    let num1 = nums[0],
        num2 = nums[1],
        next,
        cnt = 2

    while (cnt < len) {
        next = num1 + num2
        nums.push(next)
        num1 = num2
        num2 = next
        cnt++
    }
    return nums
}

const fiboGen = function*(len: number, nums = [0, 1]) {
    let num1 = nums[0],
        num2 = nums[1],
        next,
        cnt = 2

    while (cnt < len) {
        next = num1 + num2
        yield next
        num1 = num2
        num2 = next
        cnt++
        yield nums
    }
}

const fib = fiboGen(10);

console.log(fib.next());
