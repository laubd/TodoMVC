class Storage {
  get (key, defaultValue) {
    try {
      const data = localStorage.getItem(key)
      if (data) return JSON.parse(data)
    } catch (err) {
      console.log(err)
    }
    return defaultValue
  }

  set (key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default new Storage()