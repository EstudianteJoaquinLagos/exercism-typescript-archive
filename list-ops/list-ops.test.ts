import { describe, it, expect, xit } from '@jest/globals'
import { List } from './list-ops.ts'
import type { MatcherFunction } from 'expect'

type JestUtils = {
  utils: {
    printReceived(object: unknown): string
  }
}

const toHaveValues: MatcherFunction<unknown[]> = function (
  this: JestUtils,
  received: unknown,
  ...expected: unknown[]
) {
  if (typeof received !== 'object' || received === null) {
    return {
      pass: false,
      message: () =>
        `Expected ${this.utils.printReceived(received)} to be a non-null object`,
    }
  }

  if (!('forEach' in received) || typeof received.forEach !== 'function') {
    return {
      pass: false,
      message: (): string => `Implement .forEach(callback) on your list`,
    }
  }

  const values: unknown[] = []
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  received.forEach((item: unknown) => {
    values.push(item)
  })

  const pass = JSON.stringify(values) === JSON.stringify(expected)
  return {
    pass,
    message: (): string =>
      pass
        ? ''
        : `Expected to see the following values: ${JSON.stringify(
            expected
          )}, actual: ${JSON.stringify(values)}`,
  }
}

expect.extend({
  toHaveValues,
})

declare module 'expect' {
  interface AsymmetricMatchers {
    toHaveValues(...expected: unknown[]): void
  }
  interface Matchers<R> {
    toHaveValues(...expected: unknown[]): R
  }
}

describe('additional: list is iterable', () => {
  it('empty list returns consumed iterator', () => {
    const iterator = new List()[Symbol.iterator]()
    
    expect(iterator.next()).toEqual({ value: undefined, done: true } )
  })

  it('produces iterators for each value in the list', () => {
    const list = List.create(1, 2)

    const iterator = list[Symbol.iterator]()
    const firstValue = iterator.next()
    const secondValue = iterator.next()

    expect(firstValue).toEqual({ done: false, value: 1 })
    expect(secondValue).toEqual({ done: false, value: 2 })
  })

  it('produces consumed iterator after reaching tail', () => {
    const list = List.create(1)

    const iterator = list[Symbol.iterator]()
    const firstValue = iterator.next()
    const empty = iterator.next()

    expect(firstValue).toEqual({ done: false, value: 1 })
    expect(empty).toEqual({ done: true, value: undefined })
  })
})

describe('additional: forEach()', () => {
  it('iterates the list', () => {
    const list = List.create(0, 1, 2)
    let i = 0

    list.forEach(element => expect(element).toEqual(i++))

    expect(i).toEqual(3)
  })

  it('ignores empty list', () => {
    const list = new List()
    let i = 0

    list.forEach(() => i++)

    expect(i).toEqual(0)
  })
})

describe('additional: pop()', () => {
  it('throws if list is empty', () => {
    expect(() => List.create().pop()).toThrow()
  })

  it('empties list if list has one element left', () => {
    const list = List.create('testing...')

    const result = list.pop()
    
    expect(result).toEqual('testing...')
    expect(list.tail).toEqual(undefined)
    expect(list.head).toEqual(undefined)
  })

  it('returns the last element', () => {
    const list = List.create(1, 2)

    const result = list.pop()
    
    expect(result).toEqual(2)
  })
})

describe('additional: list length', () => {
  it('an empty list has length 0', () => {
    const list = new List()

    expect(list.length()).toEqual(0)
  })

  it('length increases when pushing', () => {
    const list = new List().push(1).push(3).push(5)

    expect(list.length()).toEqual(3)
  })

  it('length decreases when poping', () => {
    const list = List.create(1, 2)

    list.pop()

    expect(list.length()).toEqual(1)
  })
})


describe('additional: push()', () => {
  it('add element to empty list', () => {
    const list = new List().push(1)

    expect(list.head).toEqual(1)
    expect(list.tail).toEqual(1)
  })

  it('add element after the first element', () => {
    const list = List.create().push(2).push(3)

    expect(list.head).toEqual(2)
    expect(list.tail).toEqual(3)
  })

  it('add element to non-empty list', () => {
    const list = List.create().push(2).push(3).push(4)
    const reversedListValues = [4, 3, 2]

    list.forEach((element) => expect(element).toEqual(reversedListValues.pop()))
   })

  it('add multiple elements', () => {
    const list = new List().push(2, 3, 4)

    const reversedListValues = [4, 3, 2]

    list.forEach((element) => expect(element).toEqual(reversedListValues.pop()))
  })
})

describe('additional: static create()', () => {
  it('makes an empty list', () => {
    const list = List.create()

    expect(list.head).toEqual(undefined)
    expect(list.tail).toEqual(undefined)
  })

  it('makes a one element list', () => {
    const list = List.create(1)

    expect(list.head).toEqual(1)
    expect(list.tail).toEqual(1)
  })

  it('makes a multiple elements list', () => {
    const list = List.create(2, 3, 4)

    const reversedListValues = [4, 3, 2]

    list.forEach((element) => expect(element).toEqual(reversedListValues.pop()))
  })
})

describe('append entries to a list and return the new list', () => {
  it('empty lists', () => {
    const list1 = List.create()
    const list2 = List.create()
    expect(list1.append(list2)).toEqual(List.create())
  })

  it('list to empty list', () => {
    const list1 = List.create<number>()
    const list2 = List.create(1, 2, 3, 4)
    expect(list1.append(list2)).toEqual(list2)
  })

  it('empty list to list', () => {
    const list1 = List.create(1, 2, 3, 4)
    const list2 = List.create<number>()
    expect(list1.append(list2)).toEqual(list1)
  })

  it('non-empty lists', () => {
    const list1 = List.create(1, 2)
    const list2 = List.create(2, 3, 4, 5)
    expect(list1.append(list2)).toHaveValues(1, 2, 2, 3, 4, 5)
  })
})

describe('concat lists and lists of lists into new list', () => {
  it('empty list', () => {
    const list1 = List.create()
    const list2 = List.create<ReturnType<typeof List.create>>()
    expect(list1.concat(list2)).toHaveValues()
  })

  it('list of lists', () => {
    const list1 = List.create(1, 2)
    const list2 = List.create(3)
    const list3 = List.create<number>()
    const list4 = List.create(4, 5, 6)
    const listOfLists = List.create(list2, list3, list4)
    expect(list1.concat(listOfLists)).toHaveValues(1, 2, 3, 4, 5, 6)
  })
})

describe('filter list returning only values that satisfy the filter function', () => {
  it('empty list', () => {
    const list1 = List.create<number>()
    expect(list1.filter((el) => el % 2 === 1)).toHaveValues()
  })

  it('non empty list', () => {
    const list1 = List.create(1, 2, 3, 5)
    expect(list1.filter((el) => el % 2 === 1)).toHaveValues(1, 3, 5)
  })
})

describe('returns the length of a list', () => {
  it('empty list', () => {
    const list1 = List.create()
    expect(list1.length()).toEqual(0)
  })

  it('non-empty list', () => {
    const list1 = List.create(1, 2, 3, 4)
    expect(list1.length()).toEqual(4)
  })
})

describe('returns a list of elements whose values equal the list value transformed by the mapping function', () => {
  it('empty list', () => {
    const list1 = List.create<number>()
    expect(list1.map((el) => ++el)).toHaveValues()
  })

  it('non-empty list', () => {
    const list1 = List.create(1, 3, 5, 7)
    expect(list1.map((el) => ++el)).toHaveValues(2, 4, 6, 8)
  })
})

describe('folds (reduces) the given list from the left with a function', () => {
  it('empty list', () => {
    const list1 = List.create<number>()
    expect(list1.foldl((acc, el) => el * acc, 2)).toEqual(2)
  })

  it('direction independent function applied to non-empty list', () => {
    const list1 = List.create(1, 2, 3, 4)
    expect(list1.foldl((acc, el) => acc + el, 5)).toEqual(15)
  })

  it('direction dependent function applied to non-empty list', () => {
    const list1 = List.create(1, 2, 3, 4)
    expect(list1.foldl((acc, el) => el / acc, 24)).toEqual(64)
  })
})

describe('folds (reduces) the given list from the right with a function', () => {
  it('empty list', () => {
    const list1 = List.create<number>()
    expect(list1.foldr((acc, el) => el * acc, 2)).toEqual(2)
  })

  it('direction independent function applied to non-empty list', () => {
    const list1 = List.create(1, 2, 3, 4)
    expect(list1.foldr((acc, el) => acc + el, 5)).toEqual(15)
  })

  it('direction dependent function applied to non-empty list', () => {
    const list1 = List.create(1, 2, 3, 4)
    expect(list1.foldr((acc, el) => el / acc, 24)).toEqual(9)
  })
})

describe('reverse the elements of a list', () => {
  it('empty list', () => {
    const list1 = List.create()
    expect(list1.reverse()).toHaveValues()
  })

  it('non-empty list', () => {
    const list1 = List.create(1, 3, 5, 7)
    expect(list1.reverse()).toHaveValues(7, 5, 3, 1)
  })

  it('list of lists is not flattened', () => {
    const list1 = List.create([1, 2], [3], [], [4, 5, 6])
    expect(list1.reverse()).toHaveValues([4, 5, 6], [], [3], [1, 2])
  })
})
