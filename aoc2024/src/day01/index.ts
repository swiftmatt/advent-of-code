import run from "aocrunner";

function parseInput(rawInput: string) {
    const leftList: number[] = [];
    const rightList: number[] = [];

    const lines = rawInput
        .trim()
        .split('\n');

    for (const line of lines) {
        const tuple = line
            .trim()
            .split(' ')
            .filter(item => item !== '');
        const [ leftItem, rightItem ] = tuple;
        leftList.push(Number(leftItem));
        rightList.push(Number(rightItem));
    }

    return {
        leftList,
        rightList,
    }
}

function part1(rawInput: string) {
    const { leftList, rightList } = parseInput(rawInput);

    if (leftList.length !== rightList.length) {
        throw new Error('Lists are not of the same length.');
    }

    const leftListSorted = leftList.sort();
    const rightListSorted = rightList.sort();

    let totalDistance = 0;
    for (let ix = 0; ix < leftListSorted.length; ix++) {
        const distance = Math.abs(leftListSorted[ix] - rightListSorted[ix]);
        totalDistance += distance;
    }

    return totalDistance;
}

function part2(rawInput: string) {
    const { leftList, rightList } = parseInput(rawInput);

    if (leftList.length !== rightList.length) {
        throw new Error('Lists are not of the same length.');
    }

    const leftListNumberEntriesInit: [number, number][] = leftList.map(number => [number, 0]);
    const numberOccuranceCountMap = new Map(leftListNumberEntriesInit);

    for (const number of rightList) {
        const count = numberOccuranceCountMap.get(number);

        if (count === undefined) {
            numberOccuranceCountMap.set(number, 0);
            continue;
        }

        numberOccuranceCountMap.set(number, count + 1);
    }

    return [
        ...numberOccuranceCountMap.entries()
    ].reduce((similarityScore, [number, count]) => {
        similarityScore += number * count;
        return similarityScore;
    }, 0);
}

run({
    part1: {
        tests: [
            // {
            //   input: ``,
            //   expected: "",
            // },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            // {
            //   input: ``,
            //   expected: "",
            // },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    // onlyTests: true,
})
