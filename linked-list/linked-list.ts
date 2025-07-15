/** A double linked node */
class Node<T> {
  public next: Node<T> | null
  public prev: Node<T> | null
  public value: T

  constructor(value: T) {
    this.next = null
    this.prev = null
    this.value = value
  }
}
/** A double linked list */
export class LinkedList<T> {
  // Nodes that LinkedList wraps
  #head: Node<T> | null // first node of the list
  #tail: Node<T> | null // last node of the list

  #length: number // The length of the list in nodes

  constructor() {
    this.#head = null
    this.#tail = null
    this.#length = 0
  }

  /** Add an element to the end of the list */
  public push(element: T): void {
    // First node is tracked both by tail and head
    if (!this.#tail) {
      this.#head = new Node(element)
      this.#tail = this.#head

      this.#length++
    } else {
      // Take last tracked node in the list
      const lastTail = this.#tail

      // Link last node with new element's node, both ways
      lastTail.next = new Node(element)
      lastTail.next.prev = lastTail

      this.#length++

      // Track new tail of the linked list
      this.#tail = lastTail.next
    }
  }

  /** Delete an element from the end of the list and return it */
  public pop(): T {
    // Must throw an error when list is empty
    if (!this.#tail) { throw new Error('Linked list is empty!') }

    // Take last tracked node in the list
    const lastTail = this.#tail

    // When only one node remains
    if (!lastTail.prev) { 
      this.#head = null // delete it from
      this.#tail = null // both trackers

      this.#length--
  
      return lastTail.value 
    } else { 
      // delete next link from previous node
      lastTail.prev.next = null

      this.#length--

      // move tracked last node to previous node
      this.#tail = lastTail.prev

      return lastTail.value
    } 
  }

  /** Add an element to the start of the list */
  public shift(): T {
    // Must throw an error when list is empty
    if (!this.#head) { throw new Error('Linked list is empty!') }

    // Take first tracked node in the list
    const lastHead = this.#head

    // When only one node remains
    if (!lastHead.next) { 
      this.#head = null // delete it from
      this.#tail = null // both trackers

      this.#length--
  
      return lastHead.value 
    } else {
      // delete next link from previous node
      lastHead.next.prev = null

      this.#length--

      // move tracked last node to previous node
      this.#head = lastHead.next

      return lastHead.value
    } 
  }

  /** Delete an element from the start of the list and return it */
  public unshift(element: T): void {
     // First node is tracked both by head and tail
    if (!this.#head) {
      this.#head = new Node(element)
      this.#tail = this.#head

      this.#length++
    } else {
      // Take first tracked node in the list
      const lastHead = this.#head

      // Link first node with new element's node, both ways
      lastHead.prev = new Node(element)
      lastHead.prev.next = lastHead

      this.#length++

      // Track new head of the linked list
      this.#head = lastHead.prev
    }
  }

  /** Delete the first intance of a given element from the list */
  public delete(element: T): void {
    // No elements in list, fail
    if (!this.#head) {
      throw new Error('No elements in the list')
    }

    // Only one element on the list
    if (!this.#head.next) {
      // and is the given
      if (this.#head.value === element) {
        // delete it from both head and tails
        this.#head = null
        this.#tail = null

        this.#length--
      }

      return
    }

    // Head matches element
    if (this.#head.value === element) {
      this.#head.next.prev = null // delete head
      this.#head = this.#head.next // and track new one

      this.#length--

      return
    }

    // Tail matches element
    if (this.#tail!.value === element) {
      this.#tail!.prev!.next = null // delete tail
      this.#tail = this.#tail!.prev // and track new one

      this.#length--

      return
    }

    let node = this.#head.next

    // For all other elements in between head and tail
    while (node.prev && node.next) {
      if (node.value === element) { // when a match is found
        node.prev.next = node.next // connect prev node with next
        node.next.prev = node.prev // connect next node with prev

        this.#length--
        
        return
      }

      node = node.next
    }
    
    return // Match is not found
  }

  public count() {
    return this.#length
  }
}
