function diff(oldList, newList) {
    const oldObj = makeArrToObj(oldList)
    const newObj = makeArrToObj(newList)

    const moves = []
    const simulationClone = []
    let i = 0
    // 构建newList 有的数组
    while (i < oldList.length) {
        const current = oldList[i]
        // 比用 includes 判断好
        if (!Object.prototype.hasOwnProperty.call(newObj, current)) {
            remove(i, current)
            // remove
        } else {
            // 旧值在 新的位置
            simulationClone.push(current)
        }
        i++
    }

    let j = i = 0
    while (i < newList.length) {
        const current = newList[i]
        const simulation = simulationClone[j]
        if (current === simulation) {
            j++
        } else {
            if (!Object.prototype.hasOwnProperty.call(oldObj, current)) {
                insert(i, current, newList[i - 1])
            } else {
                const nextCurrent = simulationClone[j + 1]
                if (nextCurrent === current) {
                    remove(i, simulation)
                    removeSimulate(j)
                    j++
                } else {
                    insert(i, current, newList[i - 1])
                }
            }
        }
        i++
    }

    console.log(simulationClone, j)
    let k = simulationClone.length - j
    while (j++ < simulationClone.length) {
        k--
        console.log(simulationClone, k + i)
        remove(k + i, simulationClone[k + i])
    }

    return moves

    function remove(index, id) {
        var move = { index: index, type: 'deleted', id }
        moves.push(move)
    }

    function insert(index, item, pre) {
        var move = { index: index, item, type: 'added', pre }
        moves.push(move)
    }

    function removeSimulate(index) {
        simulationClone.splice(index, 1)
    }

}

function makeArrToObj(arr) {
    const obj = {}
    arr.forEach((value, index) => {
        obj[value] = index
    })
    return obj
}

const oldArr = [999, 431, 2, 888, 324, 3, 7, 6, 2222]
const newArr = [1, 2, 9, 10, 11, 12, 13, 14, 157, 6, 2222, 223, 44]

console.log(diff(oldArr, newArr))