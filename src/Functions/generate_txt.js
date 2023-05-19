const generate_txt = (expenseArr, userDetails) => {

    const expenseMap = new Map()

    // CREATING MAP
    expenseArr.map((expense) => {
        if (expenseMap.has(expense.date)) {
            expenseMap.get(expense.date, [...expenseMap.get(expense.date), expense])
        }
        else {
            expenseMap.set(expense.date, [expense])
        }
    })

    const blobArray = []

    //ADDING USER DETAILS
    blobArray.push("\n\n\n")
    blobArray.push("TrackyFi ----- Expense Details")
    blobArray.push("\n\n\n")
    blobArray.push(`USER NAME :- ${userDetails.userName}\n`)
    blobArray.push(`USER MOBILE :- ${userDetails.userMobile}\n`)
    blobArray.push(`USER EMAIL :- ${userDetails.email}\n`)
    blobArray.push("\n\n\n\n\n\n")


    // ITERATE ON MAP AND CREATE ARRAY
    let dateCounter = 1
    let expenseCounter = 1
    for (let date of expenseMap) {
        blobArray.push("\n\n\n\n\n\n")
        blobArray.push(`(${dateCounter}) :: ${date[0]}`)
        dateCounter++
        blobArray.push("\n\n\n\n\n\n")
        date[1].map((expense) => {
            const expenseString = `<${expenseCounter}> ==> ${expense.name} -- $${expense.price} -- ${expense.type} -- ${expense.category} -- ${expense.date} -- ${expense.time}\n\n`
            blobArray.push(expenseString)
            expenseCounter++
        })
    }



    const blob = new Blob(blobArray, { type: "plain/text" })
    const file = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = (file)
    a.download = `${userDetails.userName}_transections.txt`
    a.click()

}

export default generate_txt