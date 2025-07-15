/** interp. a double linked node */
export class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null,
    public prev: ListNode<T> | null = null
  ){}
}

/** 
 * List conforming to the iterator and iterable protocols, including basic list 
 * operations built on top of a double linked list architecture
 */
export class List<T> {
  #head: ListNode<T> | null
  #tail: ListNode<T> | null
  #length: number

  get head(): T | undefined {
    return this.#head?.value
  }

  get tail(): T | undefined {
    return this.#tail?.value
  }

  public length(): number {
    return this.#length
  }

  constructor() {
    this.#head = null
    this.#tail = null
    this.#length = 0
  }

  /** Produces a new List containing all the items passed to create() */
  public static create<T>(...values: T[]): List<T> {
    return new List<T>().push(...values)
  }

  /** Pushes all items of a given List into this List */
  public append(list: List<T>): List<T> {
    list.forEach((item) => this.push(item))

    return this
  }

  /** 
   * Pushes all items of a given List<T> into this List
   * Additionally, accepts a List of List<T>, in such case flattens the list
   * and pushes all items into this List
   */
  public concat(list: List<List<T> | T>): List<T> {
    if (this.isNestedList(list)) {
      list.forEach((item) => this.append(item))
    } 
    else if (this.isList(list)) { 
      this.append(list) 
    }

    return this
  }

  /** Returns a new List of all items for which a given predicate is true */
  public filter(predicate: (item: T) => boolean): List<T> {
    const list = List.create<T>()

    this.forEach((item) => {
      if (predicate(item)) {
        list.push(item)
      }
    })
    
    return list
  }

  /** 
   * Returns a new List of the results of applying a given function
   * on all items 
   */
  public map<Result>(func: (item: T) => Result): List<Result> {
    const list = List.create<Result>()

    this.forEach((item) => {
      list.push(func(item))
    })

    return list
  }


  /** Returns a new List with all original items reversed */
  public reverse(): List<T> {
    let pointer = this.#tail
    const list = List.create<T>()

    // Iterates form tail to every previous item, ends in head (including it)
    while (pointer) {
      list.push(pointer.value)
      pointer = pointer.prev
    }

    return list
  }

  /** 
   * Reduces a List from the left into one value given a callback
   * that takes an accumulator and item parameters, and an initial value
   */
  public foldl<Acc>(
    callback: (acc: Acc, item: T) => Acc, 
    initialValue: Acc
  ): Acc {
    let acc = initialValue

    this.forEach((item) => {
      acc = callback(acc, item)
    })

    return acc
  }

  /** 
   * Reduces a List from the right into one value given a callback
   * that takes an accumulator and item parameters, and an initial value
   */
  public foldr<Acc>(
    callback: (acc: Acc, item: T) => Acc, 
    initialValue: Acc
  ): Acc {
    const reversedList = this.reverse()

    return reversedList.foldl(callback, initialValue)
  }

  /** Adds a new item to the end of the List */
  public push(...values: T[]): List<T> {
    for (const value of values) {
      // Adds the first item
      if (!this.#tail) {
        this.#length++

        // List ignores ListNode linking as there is only one ListNode
        this.#head = new ListNode(value)
        this.#tail = this.#head

        continue
      } 
      // Adds the second item
      else if (!this.#tail.prev) {
        this.#length++

        // Overwrite tail and put in place ListNode linking
        this.#tail = new ListNode(value)
        this.#tail.prev = this.#head
        this.#head!.next = this.#tail

        continue
      }
      // Adds any other item
      else {
        this.#length++

        // Adds new item to the end of the old tail and relinks
        const oldTail = this.#tail

        oldTail.next = new ListNode(value)
        this.#tail = oldTail.next
        this.#tail.prev = oldTail

        continue
      }
    }

    return this
  }

  /** Returns the last item of the List and deletes it */
  public pop(): T {
    // Must be at least one item in the list
    if (this.#tail === null) { throw new Error('List is empty') }
    // Must set head and tail to null for the last item
    else if (this.#tail.prev === null) {
      this.#length--

      const oldTail = this.#tail
      this.#tail = null
      this.#head = null

      return oldTail.value
    } // Must set head and tail properly for any other item
    else {
      this.#length--

      const oldTail = this.#tail
      this.#tail = this.#tail.prev
      this.#tail.next = null

      return oldTail.value
    }
  }

  /* Iterates this List, executing a callback for each item on it */
  public forEach(callback: (item: T) => void): void {
    for (const item of this) {
      callback(item)
    }
  }

  /** Makes List an IteratorIterable object */
  public [Symbol.iterator](): Iterator<T> {
    let pointer = this.#head

    return {
      next: (): IteratorResult<T> => {
        if (pointer === null) { 
          return { done: true, value: undefined } 
        } else { 
          const value = pointer.value
          pointer = pointer.next

          return { done: false, value } 
        }
      }
    }
  }

  private isNestedList(claim: unknown): claim is List<List<T>> {
    return this.isList(claim) && this.isList(claim.head)
  }

  private isList(claim: unknown): claim is List<T> {
    return claim instanceof List
  }
}
