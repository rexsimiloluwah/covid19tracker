 // Formatting the date
 const formatDate = (date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = `0${d.getMonth()+1}`.slice(-2)
    const day = d.getDate()

    return `${year}-${month}-${day}`
  }

  export default formatDate