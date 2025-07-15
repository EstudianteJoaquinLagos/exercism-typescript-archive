type ValidationInfo = {
  isValid: boolean,
  errorMsg?: string,
  elements?: string[]
}

const operators = [
  'plus',
  'minus',
  'divided',
  'multiplied',
] as const
type Operator = typeof operators[number]

type Operation = {
  first: number,
  rest: Rest
}
type Rest = { getValue: FunctionOperator, rightOperand: number }[]
type FunctionOperator = (x: number, y: number) => number

/** Resolve a matemathical problem expressed in words */
export const answer = (problem: string): number => {
  /* Validate problem */
  const { isValid, ...validation } = getValidationInfo(problem)

  if (!isValid) { throw new Error(validation.errorMsg) }

  /* Parse operation elements */
  const elements = validation.elements!

  const operation = getOperation(elements)

  /* Resolve what is produced for the parse step */
  return getSolution(operation)
}

/** 
 * Asserts that the given problem is valid by reviewing
 * its elements.
 * Returns ValidationInfo containing errorMsg if a error is found,
 * or the operation elements otherwise
 */
function getValidationInfo(problem: string): ValidationInfo {
  /* Validate shape */
  const PREFIX = 'What is'
  const SUFFIX = '?'

  const isValidTextShape = 
    problem.startsWith(PREFIX) 
    && problem.endsWith(SUFFIX)

  if (!isValidTextShape) { 
    return { isValid: false, errorMsg: 'Unknown operation' }
  }

  /* Validate operation */
  // Remove both prefix and suffix from the problem
  const operation = problem.substring(
    PREFIX.length + 1,
    problem.length - SUFFIX.length
  )
  // Split the operation into its elements
  const elements = operation.split(' ')


  const iterator = elements.values()
  let element = iterator.next()

  // Must be at least one element
  if (element.done) { 
    return { isValid: false, errorMsg: 'Syntax error' }
  }

  // First element must be a number
  if (!isNumber(element.value)) {
    return { isValid: false, errorMsg: 'Syntax error' }
  }

  element = iterator.next()
  while (!element.done) {
    // After a number an operator is needed
    if (isOperator(element.value)) {
      const isCompoundOperator = 
        element.value === 'divided'
        || element.value === 'multiplied'

      element = iterator.next()

      // After a compound operator a 'by' is needed
      if (isCompoundOperator) {
        if (element.value !== 'by') {
          return { isValid: false, errorMsg: 'Syntax error' }
        }

        element = iterator.next()
      }

      // After any operator a number is needed
      if (element.done) {
        return { isValid: false, errorMsg: 'Syntax error' }
      }
      else if (!isNumber(element.value)) {
        return { isValid: false, errorMsg: 'Syntax error' }
      }
      
      element = iterator.next()
    } else {
      if (isNumber(element.value)) {
        return { isValid: false, errorMsg: 'Syntax error' }
      } else {
        return { isValid: false, errorMsg: 'Unknown operation' }
      }
    }
  }

  return { isValid: true, elements }
}

/** 
  * Parses the given operation elements and returns the operation 
  * in a format that getSolution() can work with
  */
function getOperation(elements: string[]): Operation {
  elements = elements.filter(element => element !== 'by')
  const first = Number(elements[0])
  const rest: Rest = []
  let tmp: FunctionOperator

  elements.forEach((element, i) => {
    if (i !== 0) {
      if (i % 2 === 0) { 
        rest.push({
          getValue: tmp,
          rightOperand: Number(element),
        }) 
      }
      else { 
        assert(isOperator(element))
        tmp = getOperator(element) 
      }
    }
  })

  return { first, rest }
}

function getSolution(operation: Operation): number {
  const { first, rest } = operation

  return rest.reduce((leftOperand, current) => {
    const { getValue, rightOperand } = current

    return getValue(leftOperand, rightOperand)
  }, first)
} 

function getOperator(operator: Operator ): FunctionOperator {
  switch (operator) {
    case 'plus':
      return (x: number, y: number) => x + y
    case 'minus':
      return (x: number, y: number) => x - y
    case 'divided':
      return (x: number, y: number) => x / y
    default:
      return (x: number, y: number) => x * y
  }
}

function assert(claim: any): asserts claim {
  if (!claim) throw new Error('Assertion error')
}

const isNumber = (element: any): element is number => {
  return !isNaN(element)
}

const isOperator = (element: any): element is Operator => {
  return operators.includes(element)
}
