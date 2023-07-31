const generate_txt = (expenseArr, userDetails) => {
    const blobArray = []

    //ADDING USER DETAILS
    blobArray.push(["TrackyFi ----- Expense Details"])
    blobArray.push(["\n"])
    blobArray.push(["\n"])
    blobArray.push(["\n"])
    blobArray.push([["USER NAME"], [userDetails.userName]])
    blobArray.push(["\n"])
    blobArray.push([["USER MOBILE"], [userDetails.userMobile]])
    blobArray.push(["\n"])
    blobArray.push([["USER EMAIL"], [userDetails.email]])
    blobArray.push(["\n\n\n\n\n\n"])



    blobArray.push([[`Serial Number`], ["Name"], ["Price"], ["Type"], ["Category"], ["Date"], ["Time"], ['\n']])
    let expenseCounter = 1
    expenseArr.map((expense) => {
        const expenseString = [[expenseCounter], [expense.name], [expense.price], [expense.type], [expense.category], [expense.date], [expense.time], ['\n']]
        blobArray.push(expenseString)
        expenseCounter++
    })



    const blob = new Blob(blobArray)
    const file = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = (file)
    a.download = `${userDetails.userName}_transections.csv`
    a.click()

}

export default generate_txt