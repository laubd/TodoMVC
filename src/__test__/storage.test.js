import Storage from '../storage/storage'

describe('storage.js', () => {
  test('should get default value', () => {
    const name = Storage.get('name', 'kate')
    expect(name).toBe('kate')
  })

  test('can set and get a primitive value', () => {
    const age = Storage.get('age')
    expect(age).toBe('')

    Storage.set('age', 18)
    const newAge = Storage.get('age')
    expect(newAge).toBe(18)
  })

  test('can set and get an object value', () => {
    const books = Storage.get('books')
    expect(books).toBe('')

    const data = [
      { name: 'Hello' }
    ]
    Storage.set('books', data)
    const newBooks = Storage.get('books')
    expect(newBooks).toEqual(data)
  })
})